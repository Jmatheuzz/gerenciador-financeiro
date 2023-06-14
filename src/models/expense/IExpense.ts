export type Expense = {
  id: string
  name: string
  value: number
  deadline: string
  paidAt: string | null
  userId?: number
  createdAt?: string
  updatedAt?: string
}
export type CreateExpense = Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateExpense = Omit<Expense, 'createdAt' | 'updatedAt' | 'userId'>

export interface IExpense {
  create: (Expense: CreateExpense) => Promise<Expense>
  update: (Expense: UpdateExpense) => Promise<Expense>
  get: () => Promise<Expense[]>
  show: (id: number) => Promise<Expense>
  delete: (id: number) => Promise<void>
}
