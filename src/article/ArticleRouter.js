const router = require('express').Router();
const pagination = require('../shared/pagination');
const Article = require('./Article');

router.get('/articles', pagination, async (req, res) => {
  const { page, size } = req.pagination;

  const articles = await Article.findAndCountAll({
    limit: size,
    offset: page * size
  });
  res.send({
    totalPage: Math.ceil(articles.count / size),
    content: articles.rows
  });
});

module.exports = router;