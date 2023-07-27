import { Router } from 'express'
import { profile } from '../../controllers/user.controllers'
import { TokenValidation } from '../../middleware/verifyToken'

const router = Router()

router.get('/profile', TokenValidation, profile)

export default router