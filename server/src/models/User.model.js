const { DataTypes } = require('sequelize');

module.exports = database => {

    database.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rango: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        token: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    })

};