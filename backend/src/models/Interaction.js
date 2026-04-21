import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Interaction = sequelize.define('Interaction', {
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
  type_interaction_id: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'interaction',
  timestamps: true
});

export default Interaction;