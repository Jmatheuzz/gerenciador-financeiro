import { CreateUser, IUser, UpdateUser, User } from './IUser'
import { PostgreSQL } from '@/config/connection'
import { hash } from '@/utils/bcrypt'

export class UserModel implements IUser {
  public async create (user: CreateUser): Promise<User> {
    const passwordHash = await hash.generate(user.password)
    const dateCreate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const query = `INSERT INTO users (name, email, password, created_at, updated_at) VALUES ('${user.name}', '${user.email}', '${passwordHash}','${dateCreate}' , '${dateUpdate}') RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async update (user: UpdateUser): Promise<User> {
    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const userSelect = (await PostgreSQL.execute(`SELECT * FROM users WHERE id = ${user.id}`)).rows[0] as User

    const passwordHash = user.password ? await hash.generate(user.password) : userSelect.password

    const userData = {
      name: user.name || userSelect.name,
      email: user.email || userSelect.email,
      password: passwordHash
    }

    const query = `UPDATE users SET name = '${userData.name}', email = '${userData.email}', password = '${userData.password}', updated_at = '${dateUpdate}' WHERE id = ${user.id} RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async get (): Promise<User[]> {
    const query = 'SELECT * FROM users ORDER BY id ASC'
    const result = await PostgreSQL.execute(query)
    return result.rows
  }

  public async getByEmail (email: string): Promise<User> {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async show (id: number): Promise<User> {
    const query = `SELECT * FROM users WHERE id = ${id}`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async delete (id: number): Promise<void> {
    const query = `DELETE FROM users WHERE id = ${id}`
    await PostgreSQL.execute(query)
  }
}
export const userModel = new UserModel()
