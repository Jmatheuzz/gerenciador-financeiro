import { winModel } from '@/models/win/Win'
import { Win } from '@/models/win/IWin'

class WinService {
  public async insert (win: Win, userId: number): Promise<void> {
    const winForm = win
    const receivedAt = `${new Date(winForm.receivedAt).getFullYear()}-${new Date(winForm.receivedAt).getMonth() +1}-${new Date(winForm.receivedAt).getDate()} ${new Date(winForm.receivedAt).getHours()}:${new Date(winForm.receivedAt).getMinutes()}:${new Date(winForm.receivedAt).getSeconds()}`

    winForm.receivedAt = receivedAt
    winForm.value = parseInt(String(winForm.value))
    winForm.userId = userId
    await winModel.create(winForm)
    
  }

  public async update (win: Win, userId: number): Promise<void> {
    const winForm = win
    const receivedAt = `${new Date(winForm.receivedAt).getFullYear()}-${new Date(winForm.receivedAt).getMonth() +1}-${new Date(winForm.receivedAt).getDate()} ${new Date(winForm.receivedAt).getHours()}:${new Date(winForm.receivedAt).getMinutes()}:${new Date(winForm.receivedAt).getSeconds()}`

    winForm.receivedAt = receivedAt
    winForm.value = parseInt(String(winForm.value))
    winForm.userId = userId
    await winModel.update(winForm)
  }

  public async get (): Promise<Win[]> {
    const result = await winModel.get()
    return result
  }

  public async getByUser (userId: number): Promise<Win[]> {
    return await winModel.getByUser(userId)
  }

  public async delete (id: number): Promise<void> {
    await winModel.delete(id)
  }

  public async show (id: number): Promise<Win> {
    return await winModel.show(id)
  }
}

export const winService = new WinService()
