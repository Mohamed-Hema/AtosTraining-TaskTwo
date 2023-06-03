const { DataTypes } = require('sequelize');
const sequelize = require('../db/examsDB');

const ExamDefinition = sequelize.define('ExamDefinition', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passingScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.5,
  },
}, {
  tableName: 'ExamDefinition',
});

module.exports = ExamDefinition;
