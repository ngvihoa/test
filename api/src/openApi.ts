import { generateOpenApiDocument } from 'trpc-openapi';

import appRouter from './routes/trpc';

/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'tRPC OpenAPI',
    version: '1.0.0',
    baseUrl: '/api',
});
