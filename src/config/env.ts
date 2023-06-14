import 'dotenv/config'

export const env = {
  apiPort: parseInt(process.env.API_PORT!),
  dbPort: parseInt(process.env.DB_PORT!),
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbName: process.env.DB_NAME!,
  apiDev: process.env.API_DEV!
}
