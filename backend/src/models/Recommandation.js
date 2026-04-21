import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Recommandation = sequelize.define('Recommandation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  utilisateur_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  evenement_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  algorithme: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'recommandation',
  timestamps: true
});

export default Recommandation;