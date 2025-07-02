import { Scalar } from '@scalar/hono-api-reference'
import { Hono } from 'hono'
import { openAPISpecs } from 'hono-openapi'
import { createHonoServer } from 'react-router-hono-server/node'
import { auth } from '~/lib/auth'
import { logger } from '~/lib/logger'
import { mergeOpenApiSchemas } from '~/lib/openapi-merge'
import { exampleMiddleware } from './middleware/example'
import { authRouter } from './routes/auth'
import { healthRouter } from './routes/health'
import { protectedRouter } from './routes/protected'

logger.info('loading server')

const app = new Hono().basePath('/api')
app.use('*', exampleMiddleware())

const appRouter = app
  .route('/auth', authRouter)
  .route('/health', healthRouter)
  .route('/protected', protectedRouter)

app.get(
  '/app-openapi',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: `Demo API`,
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:5173',
          description: 'API server',
        },
      ],
    },
  }),
)
app.get('/openapi', async (c) => {
  const authSchema = await auth.api.generateOpenAPISchema()
  const appSchemaReq = await app.request('/api/app-openapi')
  const appSchema = await appSchemaReq.json()
  const mergedSchema = mergeOpenApiSchemas({
    appSchema,
    authSchema: authSchema as any,
  })
  return c.json(mergedSchema)
})
app.get('/docs', Scalar({
  theme: 'saturn',
  url: '/api/openapi',
}))

// eslint-disable-next-line antfu/no-top-level-await
const server = await createHonoServer({
  configure: (app) => {
    app.route('/', appRouter)
  },
})

export default server

export type AppRouter = typeof appRouter
