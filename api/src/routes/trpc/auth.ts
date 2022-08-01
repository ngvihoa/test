import * as trpc from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { z } from 'zod';
import { signInResolver } from '../../controller/auth';
const authRoutes = trpc.router<any, OpenApiMeta>().mutation('signIn', {
    input: z.object({
        username: z.string(),
        password: z.string(),
    }),
    output: z.object({ token: z.string() }),
    async resolve(req) {
        return signInResolver({ ...req.input });
    },
    meta: {
        openapi: {
            enabled: true,
            method: 'POST',
            path: '/auth/signin',
            tag: 'Authentication',
        },
    },
});

export default authRoutes;
