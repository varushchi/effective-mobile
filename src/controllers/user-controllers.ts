import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'
import { PrismaClientKnownRequestError } from '../generated/prisma/runtime/library'
import { signupSchema, loginSchema } from '../schemas/user-schema'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const signupUser = async (req: Request, res: Response) => {
  const parseBody = signupSchema.safeParse(req.body)
  if (!parseBody.success) {
    return res.send(400).json({ error: parseBody.error.message })
  }

  const { name, email, password, role } = parseBody.data
  const hashPass = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
        role: role || 'USER'
      }
    })
    return res.status(201).json({ id: user.id, email: user.email, role: user.role })
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Email already exists' })
      }
    }
    return res.status(500).json({ error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const parseBody = loginSchema.safeParse(req.body)
  if (!parseBody.success) {
    return res.send(400).json({ error: parseBody.error.message })
  }
  const { email, password } = parseBody.data
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' })
    }
    const isValidPass = bcrypt.compare(password, user.password)
    if (!isValidPass) {
      return res.status(401).json({ error: 'Invalid password' })
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    return res.json({ token })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
export const blockUser = async (req: Request, res: Response) => {
  const idToBlock = parseInt(req.params.id, 10)
  if (isNaN(idToBlock)) {
    return res.status(400).json({ error: 'Invalid user id' })
  }

  const reqUser = req.user
  if (!reqUser) return res.status(401).json({ error: 'Not authenticated' })

  if (reqUser.userId !== idToBlock && reqUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: idToBlock } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const updatedUser = await prisma.user.update({
      where: { id: idToBlock },
      data: { isActive: false }
    })

    return res.status(200).json({
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  const reqUser = req.user
  if (!reqUser) return res.status(401).json({ error: 'Not authenticated' })
  if (reqUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' })
  }
  try {
    const users = await prisma.user.findMany()
    if (!users) {
      return res.status(404).json({ error: 'Users not found' })
    }
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const idToFind = parseInt(req.params.id, 10)
  if (isNaN(idToFind)) {
    return res.status(400).json({ error: 'Invalid user id' })
  }
  const reqUser = req.user
  if (!reqUser) return res.status(401).json({ error: 'Not authenticated' })
  if (reqUser.userId !== idToFind && reqUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' })
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: idToFind } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

