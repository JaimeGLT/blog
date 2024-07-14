const { DataTypes } = require('sequelize');

module.exports = database => {

    database.define('Task', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        datePublication: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        genres: {
            type: DataTypes.ENUM,
            values: ['Tecnología', 'Salud y Bienestar', 'Viajes', 'Negocios y Finanzas','Cocina y Receta', 'Varios'],
            defaultValue: 'Varios',
            allowNull: false
        }
    }, 
    {
        timestamps: false
    })

};