import { authenticateMiddleware } from '@/middlewares/authenticate'
import { expenseModel } from '@/models/expense/Expense'
import { winModel } from '@/models/win/Win'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', authenticateMiddleware, async (req: Request, res: Response) => {
  const dateNow = new Date()
  const monthNow = dateNow.getMonth()
  const yearNow = dateNow.getFullYear()
  const dayNow = dateNow.getDate()
  const dateStart = new Date(yearNow, monthNow, dayNow)
  const dateFinished = new Date(yearNow, monthNow, dayNow, 23, 59, 59)


  const dateStartFormat = `${dateStart.getFullYear()}-${dateStart.getMonth()+1}-${dateStart.getDate()}`
  const dateFinishedFormat = `${dateFinished.getFullYear()}-${dateFinished.getMonth()+1}-${dateFinished.getDate()} ${dateFinished.getHours()}:${dateFinished.getMinutes()}:${dateFinished.getSeconds()}`

  const whereExpense = `(deadline BETWEEN '${dateStartFormat}' AND '${dateFinishedFormat}')`
  const whereWin = `(received_at BETWEEN '${dateStartFormat}' AND '${dateFinishedFormat}')`

  const expenses = await expenseModel.getByUser(req.user!.id, whereExpense)
  const wins = await winModel.getByUser(req.user!.id, whereWin)

  const expensesValue = expenses.map(expense => expense.value)

  const expenseTotal = expensesValue.reduce((acumulator: number, current: number) => acumulator + current, 0).toFixed(2)

  const winsValue = wins.map(expense => expense.value)

  const winTotal = winsValue.reduce((acumulator: number, current: number) => acumulator + current, 0).toFixed(2)

  res.render('home', {expenses, wins, expenseTotal, winTotal})
})

export const home = router