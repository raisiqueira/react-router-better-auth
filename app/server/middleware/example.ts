import { createMiddleware } from 'hono/factory'
import { logger } from '~/lib/logger'

export function exampleMiddleware() {
  return createMiddleware(async (c, next) => {
    logger.info(`accept-language ${c.req.header('accept-language')}`)
    return next()
  })
}
