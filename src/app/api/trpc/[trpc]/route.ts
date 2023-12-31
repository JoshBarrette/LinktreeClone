import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Session, getServerSession } from "next-auth";
import { type NextRequest } from "next/server";

import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { authOptions } from "../../auth/[...nextauth]/route";

const createContext = async (req: NextRequest, session: Session | null) => {
    return createTRPCContext({
        req,
        session
    });
};

const handler = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createContext(req, session),
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                              error.message
                          }`
                      );
                  }
                : undefined,
    });
};

export { handler as GET, handler as POST };
