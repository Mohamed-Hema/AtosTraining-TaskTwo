const { DataTypes } = require('sequelize');
const db = require('../db/examsDB');
const ExamDefinition = require('./examDefinition');

const ExamInstance = db.define('ExamInstance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  examDefinitionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ExamDefinition,
      key: 'id',
    },
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completionTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  generatedLink: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  takenBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'absent',
  },
}, {
  tableName: 'ExamInstance',
});

module.exports = ExamInstance;
