'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      })
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    only_me: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'post',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Post',
  });
  return Post;
};