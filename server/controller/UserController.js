import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User.js'

export const loginController = async (req, res) => {
    try {
        const user = await UserModel.findOne({email : req.body.email});
        if (!user) {
            return res.status(404).json({error: 'Incorrect login or password'});
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);
        
        if (!isValidPassword) {
            return res.status(404).json({error: 'Incorrect login or password'});
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn: '30d'});
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};

export const registerController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array().map(error => error.msg));
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash
        });

        const user = await doc.save();
        
        const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn: '30d'});
        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
};

export const meController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Invalid access' });
    }
};