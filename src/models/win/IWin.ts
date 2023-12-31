export type Win = {
  id: string
  name: string
  value: number
  receivedAt: string
  userId?: number
  createdAt?: string
  updatedAt?: string
}
export type CreateWin = Omit<Win, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateWin = Omit<Win, 'createdAt' | 'updatedAt' | 'userId'>

export interface IWin {
  create: (win: CreateWin) => Promise<Win>
  update: (win: UpdateWin) => Promise<Win>
  get: () => Promise<Win[]>
  show: (id: number) => Promise<Win>
  delete: (id: number) => Promise<void>
}
