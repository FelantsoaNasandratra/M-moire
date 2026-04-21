import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Preference = sequelize.define('Preference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  utilisateur_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  categorie_id: {
    type: DataTypes.UUID
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  }
}, {
  tableName: 'preference',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false
});

export default Preference;