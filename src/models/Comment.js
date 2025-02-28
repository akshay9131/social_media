'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      })

      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        sourceKey: 'id'
      })
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'comment',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Comment',
  });
  return Comment;
};