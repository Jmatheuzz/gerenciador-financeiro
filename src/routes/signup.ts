import { userController } from '@/controllers/User'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', 
(req: Request, res: Response) => {
  res.render('signup')
}
);

router.post('/', userController.insert)

export const signup = router