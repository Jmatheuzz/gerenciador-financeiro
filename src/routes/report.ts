import { authenticateMiddleware } from '@/middlewares/authenticate'
import { expenseModel } from '@/models/expense/Expense'
import { winModel } from '@/models/win/Win'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', authenticateMiddleware, async (req: Request, res: Response) => {
  const dateNow = new Date()
  const monthNowExpense = dateNow.getMonth()
  const yearNowExpense = dateNow.getFullYear()
  const dateStartExpense = new Date(yearNowExpense, monthNowExpense, 1)
  const dateFinishedExpense = new Date(yearNowExpense, monthNowExpense+1, 0, 23, 59, 59)


  const dateStartExpenseUCT = `${dateStartExpense.getUTCFullYear()}-${dateStartExpense.getUTCMonth()+1}-${dateStartExpense.getUTCDate()}`
  const dateFinishedExpenseUTC = `${dateFinishedExpense.getUTCFullYear()}-${dateFinishedExpense.getUTCMonth()+1}-${dateFinishedExpense.getUTCDate()} ${dateFinishedExpense.getUTCHours()}:${dateFinishedExpense.getUTCMinutes()}:${dateFinishedExpense.getUTCSeconds()}`

  const monthNowWin = dateNow.getMonth()
  const yearNowWin = dateNow.getFullYear()
  const dateStartWin = new Date(yearNowWin, monthNowWin, 1)
  const dateFinishedWin = new Date(yearNowWin, monthNowWin+1, 0, 23, 59, 59)


  const dateStartWinUCT = `${dateStartWin.getUTCFullYear()}-${dateStartWin.getUTCMonth()+1}-${dateStartWin.getUTCDate()}`
  const dateFinishedWinUTC = `${dateFinishedWin.getUTCFullYear()}-${dateFinishedWin.getUTCMonth()+1}-${dateFinishedWin.getUTCDate()} ${dateFinishedWin.getUTCHours()}:${dateFinishedWin.getUTCMinutes()}:${dateFinishedWin.getUTCSeconds()}`

  const whereExpense = `(deadline BETWEEN '${req.query.expenseStart || dateStartExpenseUCT}' AND '${req.query.expenseFinished || dateFinishedExpenseUTC}') ORDER BY deadline ASC`
  const whereWin = `(received_at BETWEEN '${req.query.winStart || dateStartWinUCT}' AND '${req.query.winFinished || dateFinishedWinUTC}') ORDER BY received_at DESC`

  const expenses = await expenseModel.getByUser(req.user!.id, whereExpense)
  const wins = await winModel.getByUser(req.user!.id, whereWin)

  const expensesValue = expenses.map(expense => expense.value)

  const expenseTotal = expensesValue.reduce((acumulator: number, current: number) => acumulator + current, 0).toFixed(2)

  const winsValue = wins.map(expense => expense.value)

  const winTotal = winsValue.reduce((acumulator: number, current: number) => acumulator + current, 0).toFixed(2)

  res.render('report', {expenses, wins, expenseTotal, winTotal})
})

export const report = router