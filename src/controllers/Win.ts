import { winModel } from '@/models/win/Win'
import { Win } from '@/models/win/IWin'
import { winService } from '@/services/Win'
import { Request, Response } from 'express'

class WinController {
  public async insert (req: Request, res: Response): Promise<void> {
    await winService.insert(req.body, req.user!.id)
    res.redirect('/home')
  }

  public async update (req: Request, res: Response): Promise<void> {
    req.body.id = req.params.id
    await winService.update(req.body, req.user!.id)
    res.redirect('report')
  }

  public async get (req: Request, res: Response): Promise<void> {
    const result = await winService.get()
    res.send({ result })
  }

  public async getUpdate (req: Request, res: Response): Promise<void> {
    const win = await winService.show(parseInt(req.params.id))

    res.render('form_win', {win})
  }

  public async getInsert (req: Request, res: Response): Promise<void> {
    res.render('form_win', {win: {}})
  }

  public async getByUser (req: Request, res: Response): Promise<void> {

    const result = await winService.getByUser(parseInt(req.params.idUser))
    res.send({ result })
  }

  public async show (req: Request, res: Response): Promise<void> {
    const result = await winService.show(parseInt(req.params.id))
    res.send({ result })
  }

  public async delete (req: Request, res: Response): Promise<void> {
    const result = await winService.delete(parseInt(req.params.id))
    res.redirect('/report')
  }
}

export const winController = new WinController()
