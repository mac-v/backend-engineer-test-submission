export default {
  migrationPattern: './migrations/**',
  driver: process.env.DB_DRIVER ?? 'pg',
  host: process.env.DB_HOST ?? 'db',
  port: process.env.DB_PORT ?? 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
}
