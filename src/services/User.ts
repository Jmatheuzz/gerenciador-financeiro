import { User } from '@/models/user/IUser'
import { userModel } from '@/models/user/User'

class UserService {
  public async insert (user: User): Promise<User> {
    return await userModel.create(user)
  }
}

export const userService = new UserService()
