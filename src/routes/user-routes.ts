import express from 'express'
import { blockUser, getAllUsers, getUser, loginUser, signupUser } from '../controllers/user-controllers'
import { auth } from '../middleware/user-middleware'

export const userRouter = express.Router()

userRouter.post('/signup', signupUser)

userRouter.post('/login', loginUser)

userRouter.get('/users/:id', auth, getUser)

userRouter.get('/users', auth, getAllUsers)

userRouter.put('/users/block/:id', auth, blockUser)
