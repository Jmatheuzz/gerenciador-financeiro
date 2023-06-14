import { userService } from '@/services/User'
import { Request, Response } from 'express'

class UserController {
  public async insert (req: Request, res: Response): Promise<void> {
    const user = await userService.insert(req.body)
    res.redirect('/auth/login')
  }
}

export const userController = new UserController()
