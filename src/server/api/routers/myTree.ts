import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const myTreeRouter = createTRPCRouter({
    hasTree: protectedProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            const q = await ctx.db.tree.findUnique({
                where: { creatorId: input },
            });

            return q !== undefined && q !== null;
        }),
});
