import path from 'node:path'
import fastifyAutoload from '@fastify/autoload'
import type { FastifyInstance } from 'fastify'

export default async function serviceApp (fastify: FastifyInstance) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dir, 'plugins/external'),
    options: {}
  })

  fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dir, 'plugins/app')
  })

  fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dir, 'routes')

  })

  console.log(path.join(import.meta.dir, 'routes'))

  fastify.setErrorHandler((err, request, reply) => {
    fastify.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params
        }
      },
      'Unhandled error occurred'
    )

    reply.code(err.statusCode ?? 500)

    let message = 'Internal Server Error'
    if (err.statusCode && err.statusCode < 500) {
      message = err.message
    }

    return { message }
  })

  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit({
        max: 3,
        timeWindow: 500
      })
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params
          }
        },
        'Resource not found'
      )

      reply.code(404)

      return { message: 'Not Found' }
    })
}
