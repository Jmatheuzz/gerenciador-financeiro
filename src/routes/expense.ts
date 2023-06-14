import { expenseController } from '@/controllers/Expense'
import { Request, Response, Router } from 'express'
import { authenticateMiddleware } from '@/middlewares/authenticate'
import { expenseModel } from '@/models/expense/Expense'

const router = Router()

router.get('/create', authenticateMiddleware, expenseController.getInsert)
router.get('/:id',authenticateMiddleware, expenseController.show)
router.post('/create',authenticateMiddleware, expenseController.insert)
router.get('/edit/:id',authenticateMiddleware, expenseController.getUpdate)
router.post('/edit/:id',authenticateMiddleware, expenseController.update)
router.get('/delete/:id',authenticateMiddleware, expenseController.delete)

export const expenseRoutes = router