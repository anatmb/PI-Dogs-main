const { DataTypes, Sequelize  } = require('sequelize');
const path = require('path');


module.exports = (sequelize) => {
  sequelize.define('temperaments', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, { timestamps: false });
    
};