import {body} from 'express-validator'

export const registerValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min : 5}).withMessage('Password must contain at least one letter and one digit'),
    body('fullName').isLength({min : 3}).withMessage('Full name must be at least 3 characters long'),
    body('avatarUrl').optional().isURL().withMessage('Invalid avatar URL')
]