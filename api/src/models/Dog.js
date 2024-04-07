const { DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // el que crea un  numero aleatorio
      defaultValue: DataTypes.UUIDV4,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raza: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.JSON,
    },
    peso: {
      type: DataTypes.JSON,
    },
    anosDeVida: {
      type: DataTypes.STRING,
    },
    created:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, { timestamps: false });
};

