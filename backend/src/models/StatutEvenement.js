import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StatutEvenement = sequelize.define('StatutEvenement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'statutevenement',
  timestamps: false
});

export default StatutEvenement;