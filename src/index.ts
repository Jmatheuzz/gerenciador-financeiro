import './config/module-alias'
import express, { NextFunction, Request, Response } from 'express'
import { expenseRoutes, auth, signup, home, winRoutes, report } from './routes'
import passport from "passport";
import passportLocal from "passport-local";
import path from 'path'
import {hash} from '@/utils/bcrypt'
import { userModel } from './models/user/User';
import session from 'express-session'

const app = express()




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static(path.join(__dirname, 'public/')));

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false 
}));

app.use(passport.initialize())
app.use(passport.session())

declare global {
  namespace Express {
    interface User {
      id: number
    }
}}

passport.serializeUser((req: Request, user: Express.User, done: Function) => {
  done(null, user)
})

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user)
})

passport.use(new passportLocal.Strategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
  const user = await userModel.getByEmail(email)
  if (await hash.compare(password,  user.password)){
    return done(null, user)
  }
  return done(null, false)
}))


app.get('/', (req: Request, res: Response) => {
  res.render('index')
})

app.use('/expense', expenseRoutes)
app.use('/auth', auth)
app.use('/signup', signup)
app.use('/home', home)
app.use('/report', report)
app.use('/win', winRoutes)


app.listen(5000, () => console.log('server running'))
