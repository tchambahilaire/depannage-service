const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Intervention = sequelize.define('Intervention', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  driverId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mechanicId: DataTypes.UUID,
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'en_route', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  panneType: DataTypes.STRING,
  pickupLocation: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  },
  estimatedPrice: DataTypes.FLOAT
}, {
  timestamps: true
});

module.exports = Intervention;
