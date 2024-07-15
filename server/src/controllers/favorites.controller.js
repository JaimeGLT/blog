const { User, Task } = require('../../db');

const addFavorite = async (req, res) => {

    const { id } = req.params;
    const userId = req.user.id;

    try {
        const taskFound = await Task.findByPk(id);
        if(!taskFound) return res.status(404).send({ msg: 'Tarea no encontrada' });

        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const favoriteAlready = await userFound.hasFavoriteTask(taskFound);
        if(favoriteAlready) return res.status(200).send({ msg: 'Esta tarea ya ah sido añadida como favorita' });

        await userFound.addFavoriteTask(taskFound);

        return res.status(200).send(taskFound);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

};

const getFavorites = async (req, res) => {

    const userId = req.user.id;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuarion no encontrado' });

        const tasks = await userFound.getFavoriteTasks();
        if(!tasks.length) return res.status(200).send({ msg: 'Aún no se han añadido tareas a favoritos' });

        return res.status(200).send(tasks);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

}

const getFavorite = async (req, res) => {

    const { id } = req.params;
    const userId = req.user.id;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const getTask = await userFound.getFavoriteTasks({
            where: { id }
        }); 

        if(!getTask.length) return res.status(404).send({ msg: 'La tarea no fue encontrada' });

        return res.status(200).send(getTask);

    } catch (error) {
        return res.status(404).send({ msg: error.message });
    }

}

const deleteFavorite = async (req, res) => {

    const { id } = req.params;
    const userId = req.user.id;

    try {
        const userFound = await User.findByPk(userId);
        if(!userFound) return res.status(404).send({ msg: 'Usuario no encontrado' });

        const taskFound = await userFound.getFavoriteTasks({
            where: {
                id
            }
        })
        if(!taskFound.length) return res.status(404).send({ msg: 'La tarea no fue encontrada' });

        await userFound.removeFavoriteTask(taskFound);

        return res.status(200).send({ msg: 'Tarea eliminada de favoritos correctamente' });

    } catch (error) {
        return res.status(404).send({ msg: error.message })
    }

    

};

module.exports = {
    addFavorite,
    getFavorites,
    getFavorite,
    deleteFavorite
}