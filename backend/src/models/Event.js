import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Evenement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  categorie_id: {
    type: DataTypes.UUID
  },
  type_evenement_id: {
    type: DataTypes.INTEGER
  },
  statut_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  lieu: {
    type: DataTypes.STRING
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_fin: {
    type: DataTypes.DATE
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  capacite: {
    type: DataTypes.INTEGER
  },
  places_disponibles: {
    type: DataTypes.INTEGER
  },
  organisateur_id: {
    type: DataTypes.UUID
  },
  image_url: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'evenement',
  timestamps: true
});

export default Event;