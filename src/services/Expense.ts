import { expenseModel } from '@/models/expense/Expense'
import { Expense } from '@/models/expense/IExpense'

class ExpenseService {
  public async insert (expense: Expense, userId: number): Promise<void> {
    const expenseForm = expense
    const deadline = `${new Date(expenseForm.deadline).getFullYear()}-${new Date(expenseForm.deadline).getMonth() +1}-${new Date(expenseForm.deadline).getDate()} ${new Date(expenseForm.deadline).getHours()}:${new Date(expenseForm.deadline).getMinutes()}:${new Date(expenseForm.deadline).getSeconds()}`

    expenseForm.deadline = deadline
    expenseForm.value = parseInt(String(expenseForm.value))
    expenseForm.userId = userId
    await expenseModel.create(expenseForm)
    
  }

  public async update (expense: Expense, userId: number): Promise<void> {
    const expenseForm = expense

    const deadline = `${new Date(expenseForm.deadline).getFullYear()}-${new Date(expenseForm.deadline).getMonth() +1}-${new Date(expenseForm.deadline).getDate()} ${new Date(expenseForm.deadline).getHours()}:${new Date(expenseForm.deadline).getMinutes()}:${new Date(expenseForm.deadline).getSeconds()}`

    expenseForm.deadline = deadline
    expenseForm.value = parseInt(String(expenseForm.value))
    expenseForm.userId = userId
    await expenseModel.update(expenseForm)
  }

  public async get (): Promise<Expense[]> {
    const result = await expenseModel.get()
    return result
  }

  public async getByUser (userIdid: number): Promise<Expense[]> {
    return await expenseModel.getByUser(userIdid)
  }

  public async delete (id: number): Promise<void> {
    await expenseModel.delete(id)
  }

  public async show (id: number): Promise<Expense> {
    return await expenseModel.show(id)
  }
}

export const expenseService = new ExpenseService()
