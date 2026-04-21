import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Reservation = sequelize.define('Reservation', {
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
  quantite: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  prix_total: {
    type: DataTypes.DECIMAL(10, 2)
  },
  statut_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'reservation',
  timestamps: true
});

export default Reservation;