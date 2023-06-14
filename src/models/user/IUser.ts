export type User = {
  id: number
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}
export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateUser = Omit<User, 'createdAt' | 'updatedAt'>

export interface IUser {
  create: (user: CreateUser) => Promise<User>
  update: (user: UpdateUser) => Promise<User>
  get: () => Promise<User[]>
  show: (id: number) => Promise<User>
  delete: (id: number) => Promise<void>
  getByEmail: (email: string) => Promise<User>
}
