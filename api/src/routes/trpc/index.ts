import * as trpc from '@trpc/server';
import authRoutes from './auth';

const appRouter = trpc
    .router()
    .query('apiVersion', {
        resolve() {
            return '0.0.1';
        },
    })
    .merge('auth.', authRoutes);

export default appRouter;
