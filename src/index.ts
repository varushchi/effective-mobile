import express, { Request, Response } from 'express'
import { userRouter } from './routes/user-routes'

const app = express()
const port = 3000

app.use(express.json())

app.use('/api', userRouter)

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running')
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
