const express = require('express');

const UserRouter = require('./user/UserRouter');
const ArticleRouter = require('./article/ArticleRouter');
const ErrorHandler = require('./error/ErrorHandler');

const app = express();

app.use(express.json());

app.use(UserRouter);
app.use(ArticleRouter);

app.use(ErrorHandler);

module.exports = app;