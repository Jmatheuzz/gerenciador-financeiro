import { expenseModel } from '@/models/expense/Expense'
import { Expense } from '@/models/expense/IExpense'
import { expenseService } from '@/services/Expense'
import { Request, Response } from 'express'

class ExpenseController {
  public async insert (req: Request, res: Response): Promise<void> {
    await expenseService.insert(req.body, req.user!.id)
    res.redirect('/home')
  }

  public async update (req: Request, res: Response): Promise<void> {
    req.body.id = req.params.id
    await expenseService.update(req.body, req.user!.id)
    res.redirect('/report')
  }

  public async get (req: Request, res: Response): Promise<void> {
    const result = await expenseService.get()
    res.send({ result })
  }

  public async getUpdate (req: Request, res: Response): Promise<void> {
    const expense = await expenseService.show(parseInt(req.params.id))

    res.render('form_expense', {expense})
  }

  public async getInsert (req: Request, res: Response): Promise<void> {
    res.render('form_expense', {expense: {}})
  }

  public async getByUser (req: Request, res: Response): Promise<void> {

    const result = await expenseService.getByUser(parseInt(req.params.idUser))
    res.send({ result })
  }

  public async show (req: Request, res: Response): Promise<void> {
    const result = await expenseService.show(parseInt(req.params.id))
    res.send({ result })
  }

  public async delete (req: Request, res: Response): Promise<void> {
    const result = await expenseService.delete(parseInt(req.params.id))
    res.redirect('/report')
  }
}

export const expenseController = new ExpenseController()
