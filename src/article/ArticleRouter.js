const router = require('express').Router();
const pagination = require('../shared/pagination');
const Article = require('./Article');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../user/User');

router.get('/articles', pagination, async (req, res) => {
  const { page, size } = req.pagination;

  const articles = await Article.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: ['id', 'content'],
    include: [
      {
        model: User,
        as: "user",
        attributes: ['id', 'username', 'email']
      }
    ]
  });
  res.send({
    totalPage: Math.ceil(articles.count / size),
    content: articles.rows
  });
});

router.post('/articles', async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.substring(7);
  const result = jwt.verify(token, config.get('secret-key'));
  const article = req.body;
  article.userId = result.id;
  await Article.create(article);
  res.send({ message: 'Success' });
});

module.exports = router;