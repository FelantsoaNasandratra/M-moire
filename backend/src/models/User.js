import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom_complet: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'utilisateur',
  timestamps: true
});

export default User;