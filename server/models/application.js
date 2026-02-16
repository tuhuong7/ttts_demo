'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      Application.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
      Application.belongsTo(models.Major, { foreignKey: 'major_id' });
      Application.belongsTo(models.AdmissionMethod, { foreignKey: 'method_id' });
      Application.hasMany(models.ApplicationDocument, { foreignKey: 'application_id' });
    }
  }
  Application.init({
    candidate_id: DataTypes.INTEGER,
    major_id: DataTypes.INTEGER,
    method_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('Pending', 'Processing', 'Approved', 'Rejected', 'SupplementNeeded'),
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
