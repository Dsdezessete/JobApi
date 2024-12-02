const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Job = sequelize.define("Job", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stats: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, 
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
});

module.exports = Job;
