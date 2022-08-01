import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import { decodeAndVerifyToken } from '../utils/token';
import { TRPCError } from '@trpc/server';

const createContext = async ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    async function getUserFromHeader() {
        if (req.headers.authorization) {
            try {
                const user = await decodeAndVerifyToken(
                    req.headers.authorization.split(' ')[1],
                );
                console.log(user);
                return user;
            } catch (err) {
                throw new TRPCError({ code: 'UNAUTHORIZED', cause: err });
            }
        }
        return null;
    }
    const user = await getUserFromHeader();
    return { userId: user?.userId || null };
}; // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

export { createContext };
