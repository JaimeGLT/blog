const { User, Task } = require('../../db');

const createTask = async (req, res) => {

    const { id } = req.user;
    const { title, description, genres } = req.body;

    if(!id) return res.status(400).send({ msg: 'Usuario no encontrado' });
    if(!title) return res.status(404).send({ msg: 'El título es obligatorio' });
    if(!description) return res.status(404).send({ msg: 'La descripción es obligatoria' });
    if(!genres) return res.status(404).send({ msg: 'Es obligatorio que tenga 1 genero' })

    const genresAllowed = ['Tecnología', 'Salud y Bienestar', 'Viajes', 'Negocios y Finanzas','Cocina y Receta', 'Varios'];

    try {
        const userFound = await User.findByPk(id);
        if(!userFound) return res.status(400).send({ msg: 'Usuario no encontrado' });

        if(!genresAllowed.includes(genres)) return res.status(400).send({ msg: 'Ese género no existe' });
        
        const newTask = await Task.create({
            title,
            description,
            genres,
            userId: id
        });

        return res.status(200).send(newTask); 

    } catch (error) {
        return res.status(400).send({ msg: error.message});
    }
};

const getTasksByUser = async (req, res) => {

    const { id } = req.user;

    try {
        const userFound = await User.findByPk(id);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const findTasks = await Task.findAll({
             where: { userId: userFound.id },
             include: {
                model: User,
                attributes: { exclude: ['password', 'token'] }
             } 
        });
        if(!findTasks.length) return res.status(404).send({ msg: 'No hay tareas creadas aún' });

        return res.status(200).send(findTasks);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const getTaskById = async (req, res) => {

    const userId = req.user.id;
    const { id } = req.params;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const getTask = await Task.findOne(
        { 
            where: {
                userId, 
                id
            },
            include: {
                model: User,
                attributes: { exclude: ['password', 'token'] }
            } 
        });
        if(!getTask) return res.status(404).send({ msg: 'Tarea no encontrada' });

        return res.status(200).send(getTask);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const getAllTasks = async (req, res) => {

    try {
        const allTasks = await Task.findAll();
        if(!allTasks.length) return res.status(200).send({ msg: 'Todavia no se han creado publicaciones' });

        return res.status(200).send(allTasks);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }
};

const getPublicTaskById = async (req, res) => {

    const { id } = req.params;

    try {
        const getTaskById = await Task.findByPk(id);
        if(!getTaskById) return res.status(400).send({ msg: 'Tarea no encontrada' });

        return res.status(200).send(getTaskById);

    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }

};

const putTasks = async (req, res) => {

    const userId = req.user.id;
    const { title, description, genres } = req.body;
    const { id } = req.params;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const taskFound = await Task.findOne({
            where: {
                id,
                userId
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'token']
                }
            }
        });
        if(!taskFound) return res.status(404).send({ msg: 'Tarea no encontrada' });

        const genresPermited = ['Tecnologia', 'Salud y Bienestar', 'Viajes', 'Negocios y Finanzas','Cocina y Receta', 'Varios'];

        if(genres && !genresPermited.includes(genres)) return res.status(404).send({ msg: 'El género ingresado no corresponde a ninguno existente' })

        taskFound.title = title ? title : taskFound.title;
        taskFound.description = description ? description : taskFound.description;
        taskFound.genres = genres ? genres : taskFound.genres;
        await taskFound.save();

        return res.status(200).send(taskFound);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const deleteTask = async (req, res) => {

    const userId = req.user.id;
    const { id } = req.params;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const taskFound = await Task.findOne({
            where: {
                id,
                userId
            }
        });
        if(!taskFound) return res.status(404).send({ msg: 'Tarea no encontrada' });

        await taskFound.destroy();

        return res.status(200).send({ msg: 'La tarea se ha eliminado correctamente' });

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};


module.exports = {
    createTask,
    getTasksByUser,
    getAllTasks,
    getPublicTaskById,
    getTaskById,
    putTasks,
    deleteTask
}