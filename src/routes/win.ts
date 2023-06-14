import { winController } from '@/controllers/Win'
import { Router } from 'express'
import { authenticateMiddleware } from '@/middlewares/authenticate'

const router = Router()

router.get('/edit/:id', authenticateMiddleware, winController.getUpdate)
router.get('/create/', authenticateMiddleware, winController.getInsert)
router.post('/create/', authenticateMiddleware, winController.insert)
router.post('/edit/:id', authenticateMiddleware, winController.update)
router.get('/delete/:id', authenticateMiddleware, winController.delete)

export const winRoutes = router
