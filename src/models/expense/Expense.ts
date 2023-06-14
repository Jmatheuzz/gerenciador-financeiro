import { CreateExpense, IExpense, UpdateExpense, Expense } from './IExpense'
import { PostgreSQL } from '@/config/connection'

class ExpenseModel implements IExpense {
  public async create (expense: CreateExpense): Promise<Expense> {
    const dateCreate = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const query = expense.paidAt ? `INSERT INTO expenses (name, value, deadline, paid_at, user_id, created_at, updated_at) VALUES ('${expense.name}', ${expense.value}, '${expense.deadline}', '${expense.paidAt}', ${expense.userId}, '${dateCreate}' , '${dateUpdate}') RETURNING *` : `INSERT INTO expenses (name, value, deadline, user_id, created_at, updated_at) VALUES ('${expense.name}', ${expense.value}, '${expense.deadline}', ${expense.userId}, '${dateCreate}' , '${dateUpdate}') RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async update (expense: UpdateExpense): Promise<Expense> {
    const dateUpdate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

    const expenseSelect = (await PostgreSQL.execute(`SELECT * FROM expenses WHERE id = ${expense.id}`)).rows[0] as Expense

    const expenseData = {
      name: expense.name || expenseSelect.name,
      value: expense.value || expenseSelect.value,
      paidAt: expense.paidAt || expenseSelect.paidAt,
      deadline: expense.deadline || `${new Date(expenseSelect.deadline).getFullYear()}-${new Date(expenseSelect.deadline).getMonth()+1}-${new Date(expenseSelect.deadline).getDate()} ${new Date(expenseSelect.deadline).getHours()}:${new Date(expenseSelect.deadline).getMinutes()}:${new Date(expenseSelect.deadline).getSeconds()}`,
    }

    const query = `UPDATE expenses SET name = '${expenseData.name}', value = ${expenseData.value}, deadline = '${expenseData.deadline}', paid_at = '${expense.paidAt}', updated_at = '${dateUpdate}' WHERE id = ${expense.id} RETURNING *`
    const result = await PostgreSQL.execute(query)
    return result.rows[0]
  }

  public async get (): Promise<Expense[]> {
    const query = 'SELECT * FROM expenses ORDER BY id ASC'
    const result = await PostgreSQL.execute(query)
    return result.rows
  }

  public async getByUser (idUser: number, where?: string): Promise<Expense[]> {
    const query = where ? `SELECT * FROM expenses WHERE user_id = ${idUser} AND ${where}` : `SELECT * FROM expenses WHERE user_id = ${idUser}`
    const result = await PostgreSQL.execute(query)
    return result.rows.map((expense: any) => ({
      id: expense.id,
      name: expense.name,
      value: expense.value,
      deadline: expense.deadline,
      paidAt: expense.paid_at
    }))
  }

  public async show (id: number): Promise<Expense> {
    const query = `SELECT * FROM expenses WHERE id = ${id}`
    const {rows} = await PostgreSQL.execute(query)
    return {
      id: rows[0].id,
      name: rows[0].name,
      value: rows[0].value,
      deadline: rows[0].deadline,
      paidAt: rows[0].paid_at
    }
  }

  public async delete (id: number): Promise<void> {
    const query = `DELETE FROM expenses WHERE id = ${id}`
    await PostgreSQL.execute(query)
  }
}

export const expenseModel = new ExpenseModel()
