import { userController } from '@/controllers/User'
import { Request, Response, Router } from 'express'
import passport from 'passport';

const router = Router()

router.get('/login',
(req: Request, res: Response) => {
  res.render('login')
});

router.post('/login', 
passport.authenticate('local', { failureRedirect: '/' }),
(req: Request, res: Response) => {
  res.redirect('/home')
});

router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
export const auth = router