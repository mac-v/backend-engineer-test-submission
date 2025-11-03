import Fastify from 'fastify'
import fp from 'fastify-plugin'

import serviceApp from './app.ts'

const app = Fastify({
  logger: { level: process.env.LOG_LEVEL ?? 'silent' }
})

async function init () {
  app.register(fp(serviceApp))

  await app.ready()

  try {
    await app.listen({ port: Number(process.env.APP_PORT) ?? 3000, host: '0.0.0.0' })
    console.log('Server started...')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

init()
