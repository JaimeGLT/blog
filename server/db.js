const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = process.env;
const userModel = require('./src/models/User.model');
const taskModel = require('./src/models/Task.model');

const database = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false });

userModel(database);
taskModel(database);

const { User, Task } = database.models;
console.log(database.models);

User.hasMany(Task, { foreignKey: 'userId' })
Task.belongsTo(User, { foreignKey: 'userId' })

User.belongsToMany(Task, { through: 'Favorite', foreignKey: 'userId', timestamps: false });
Task.belongsToMany(User, { through: 'Favorite', foreignKey: 'taskId', timestamps: false})

module.exports = {
    database,
    ...database.models
};