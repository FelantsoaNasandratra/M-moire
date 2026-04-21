import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  icone: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'categorie',
  timestamps: false
});

export default Categorie;