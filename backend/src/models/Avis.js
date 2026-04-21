import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Avis = sequelize.define('Avis', {
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
  note: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 }
  },
  commentaire: {
    type: DataTypes.TEXT
  },
  dateAvis: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'avis',
  timestamps: true
});

export default Avis;