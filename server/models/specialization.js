'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    static associate(models) {
      // ✅ CORRECT: Specialization belongs to Major (not Faculty)
      Specialization.belongsTo(models.Major, { foreignKey: 'major_id' });
      
      // ❌ REMOVED: belongsTo Faculty (was incorrect)
      // ❌ REMOVED: hasMany Major (was backwards)
    }
  }
  
  Specialization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    major_id: {  // ✅ CHANGED from faculty_id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Majors',
        key: 'id'
      }
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Specialization',
  });
  
  return Specialization;
};
