'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    token: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'User',
  });
  return User;
};