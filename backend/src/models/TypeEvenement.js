import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TypeEvenement = sequelize.define('TypeEvenement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'typeevenement',
  timestamps: false
});

export default TypeEvenement;