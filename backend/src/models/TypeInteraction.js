import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TypeInteraction = sequelize.define('TypeInteraction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  poids: {
    type: DataTypes.DECIMAL(3, 1),
    defaultValue: 1.0
  }
}, {
  tableName: 'typeinteraction',
  timestamps: false
});

export default TypeInteraction;