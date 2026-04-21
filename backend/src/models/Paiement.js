import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Paiement = sequelize.define('Paiement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  reservation_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  methode: {
    type: DataTypes.STRING(50)
  },
  statut: {
    type: DataTypes.STRING(50),
    defaultValue: 'en_attente'
  }
}, {
  tableName: 'paiement',
  timestamps: true
});

export default Paiement;