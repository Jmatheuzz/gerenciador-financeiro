import { Client } from 'pg'

export class PostgreSQL {
  private constructor () {}

  private static client: Client | null = null

  private static getClient (): void {
    if (PostgreSQL.client === null) {
      PostgreSQL.client = new Client('postgres://jm:jm@localhost:8888/projeto-2')
    }
  }

  private static async closeClient (): Promise<void> {
    if (PostgreSQL.client !== null) {
      await PostgreSQL.client.end()
      PostgreSQL.client = null
    }
  }

  public static async execute (query: string): Promise<any> {
    PostgreSQL.getClient()
    await PostgreSQL.client!.connect()
    const result = await PostgreSQL.client!.query(query)
    await PostgreSQL.closeClient()
    return result
  }
}
