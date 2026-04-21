import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StatutReservation = sequelize.define('StatutReservation', {
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
  tableName: 'statutreservation',
  timestamps: false
});

export default StatutReservation;