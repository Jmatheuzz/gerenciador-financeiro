import { CreateWin, IWin, UpdateWin, Win } from './IWin'
import { PostgreSQL } from '@/config/connection'
import { hash } from '@/utils/bcrypt'

class WinModel implements IWin {
  public async create (win: CreateWin): Promise<Win> {
    const dateCreate = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const query = `INSERT INTO wins (name, value, received_at, user_id, created_at, updated_at) VALUES ('${win.name}', ${win.value}, '${win.receivedAt}', ${win.userId}, '${dateCreate}' , '${dateUpdate}') RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async update (win: UpdateWin): Promise<Win> {
    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const winSelect = (await PostgreSQL.execute(`SELECT * FROM wins WHERE id = ${win.id}`)).rows[0] as Win

    const winData = {
      name: win.name || winSelect.name,
      value: win.value || winSelect.value,
      receivedAt: win.receivedAt || `${new Date(winSelect.receivedAt).getFullYear()}-${new Date(winSelect.receivedAt).getMonth()+1}-${new Date(winSelect.receivedAt).getDate()} ${new Date(winSelect.receivedAt).getHours()}:${new Date(winSelect.receivedAt).getMinutes()}:${new Date(winSelect.receivedAt).getSeconds()}`,
    }

    const query = `UPDATE wins SET name = '${winData.name}', value = ${winData.value}, received_at = '${winData.receivedAt}', updated_at = '${dateUpdate}' WHERE id = ${win.id} RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async get (): Promise<Win[]> {
    const query = 'SELECT * FROM wins ORDER BY id ASC'
    const result = await PostgreSQL.execute(query)
    return result.rows.map((win: any) => ({
      id: win.id,
      name: win.name,
      value: win.value,
      receivedAt: win.received_at
    }))
  }

  public async getByUser (idUser: number, where?: string): Promise<Win[]> {
    const query = where ? `SELECT * FROM wins WHERE user_id = ${idUser} AND ${where}` : `SELECT * FROM wins WHERE user_id = ${idUser}`
    const result = await PostgreSQL.execute(query)
    return result.rows.map((win: any) => ({
      id: win.id,
      name: win.name,
      value: win.value,
      receivedAt: win.received_at
    }))
  }

  public async show (id: number): Promise<Win> {
    const query = `SELECT * FROM wins WHERE id = ${id}`
    const {rows} = await PostgreSQL.execute(query)
    return {
      id: rows[0].id,
      name: rows[0].name,
      value: rows[0].value,
      receivedAt: rows[0].received_at
    }  }

  public async delete (id: number): Promise<void> {
    const query = `DELETE FROM wins WHERE id = ${id}`
    await PostgreSQL.execute(query)
  }
}

export const winModel = new WinModel()
