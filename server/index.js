import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import {
  loginController,
  registerController,
  meController,
} from "./controller/UserController.js";
import {
  createProjectController,
  getProjectsController,
  deleteProjectsController,
  updateProjectController,
  getProjectController,
} from "./controller/ProjectController.js";
import {
  createTaskController,
  getTaskController,
  getSubTasksController,
  deleteTaskController,
  updateTaskController,
  createSubTaskController,
} from "./controller/TaskController.js";

const PATH = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.PASSWORD,
);

mongoose
  .connect(PATH)
  .then(() => console.log("Db ok"))
  .catch((err) => console.log("Db error", err));

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4444;

app.post("/auth/login", loginController);
app.post("/auth/register", registerValidation, registerController);
app.get("/auth/me", checkAuth, meController);

app.post("/projects", checkAuth, createProjectController);
app.get("/projects", checkAuth, getProjectsController);

app.get("/project/:id", getProjectController);
app.delete("/project/:id", deleteProjectsController);
app.patch("/project/:id", updateProjectController);

app.post("/projects/:id/tasks", checkAuth, createTaskController);
app.get("/projects/:id/tasks", checkAuth, getTaskController);
app.delete("/projects/tasks/:id", deleteTaskController);
app.patch("/projects/tasks/:id", updateTaskController);

app.get(
  "/projects/:projectId/tasks/:parentTaskId/subtasks",
  checkAuth,
  getSubTasksController,
);
app.post(
  "/projects/:projectId/tasks/:parentTaskId/subtasks",
  checkAuth,
  createSubTaskController,
);
app.delete("/projects/tasks/subtasks/:id", checkAuth, deleteTaskController);
app.patch("/projects/tasks/subtasks/:id", checkAuth, updateTaskController);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});
