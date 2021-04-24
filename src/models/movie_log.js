'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MOVIE_LOG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MOVIE_LOG.init({
    endpoint: DataTypes.STRING,
    parameters: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'MOVIE_LOG',
  });
  return MOVIE_LOG;
};