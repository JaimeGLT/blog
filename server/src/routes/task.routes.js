const taskRouter = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const {
    createTask,
    getTasksByUser,
    getAllTasks,
    getPublicTaskById,
    getTaskById
} = require('../controllers/task.controller');

// Rutas publicas
taskRouter.get('/public-tasks', getAllTasks);
taskRouter.get('/public-task/:id', getPublicTaskById);

// Rutas protegidas
taskRouter.post('/task', verifyToken, createTask);
taskRouter.get('/tasks', verifyToken, getTasksByUser);
taskRouter.get('/task/:id', verifyToken, getTaskById)


module.exports = taskRouter;