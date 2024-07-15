const taskRouter = require('express').Router();
const { createTaskSchema } = require('../schemas/task.schema');
const schema = require('../middlewares/schema');
const verifyToken = require('../middlewares/verifyToken');
const {
    createTask,
    getTasksByUser,
    getAllTasks,
    getPublicTaskById,
    getTaskById,
    putTasks,
    deleteTask
} = require('../controllers/task.controller');

// Rutas publicas
taskRouter.get('/public-tasks', getAllTasks);
taskRouter.get('/public-task/:id', getPublicTaskById);

// Rutas protegidas
taskRouter.post('/task', verifyToken, schema(createTaskSchema), createTask);
taskRouter.get('/tasks', verifyToken, getTasksByUser);
taskRouter.get('/task/:id', verifyToken, getTaskById)
taskRouter.put('/task/:id', verifyToken, putTasks);
taskRouter.delete('/task/:id', verifyToken, deleteTask);


module.exports = taskRouter;