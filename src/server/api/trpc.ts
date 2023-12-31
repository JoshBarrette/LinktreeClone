import { TRPCError, initTRPC } from "@trpc/server";
import { Session } from "next-auth";
import { NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";

export const createInnerTRPCContext = (opts: {
    headers: Headers;
    session: Session | null;
}) => {
    return {
        headers: opts.headers,
        session: opts.session,
        db,
    };
};

export const createTRPCContext = (opts: {
    req: NextRequest;
    session: Session | null;
}) => {
    return createInnerTRPCContext({
        headers: opts.req.headers,
        session: opts.session,
    });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

const isAuthorized = t.middleware(({ next, ctx }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            session: ctx.session,
        },
    });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthorized);
