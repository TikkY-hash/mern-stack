import { body } from "express-validator";

export const createProjectValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").optional().notEmpty().withMessage("Description is required"),
];

export const updateProjectValidation = [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
];