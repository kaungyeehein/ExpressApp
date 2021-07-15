const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Article extends Model { }

Article.init({
  content: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'article'
});

module.exports = Article;