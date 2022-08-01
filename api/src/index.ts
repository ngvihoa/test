import express from 'express';
import dotenv from 'dotenv';
import appRouter from './routes/trpc';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './contexts/trpcContext';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openApi';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

// Api Routes
app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({ router: appRouter, createContext }),
);
app.use(
    '/api',
    createOpenApiExpressMiddleware({ router: appRouter, createContext }),
);

// Documentation routes
app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(port, () => {
    console.log(`api listening at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter;
