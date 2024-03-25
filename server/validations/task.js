import { body } from "express-validator";

export const createTaskValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("pos").notEmpty().withMessage("Position is required"),
];

export const createSubTaskValidation = [
    body("title").notEmpty().withMessage("Title is required"),
];