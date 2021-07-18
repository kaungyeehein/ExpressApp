const express = require('express');
const limitter = require('express-rate-limit');
const UserRouter = require('./user/UserRouter');
const ArticleRouter = require('./article/ArticleRouter');
const FileRouter = require('./file/FileRouter');
const ErrorHandler = require('./error/ErrorHandler');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next.use(Backend).use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

const app = express();

app.use(limitter({
  windowMs: 5000,
  max: 5,
  message: {
    code: 429,
    message: 'Too many request.'
  }
}));

app.use(middleware.handle(i18next));
app.use(express.json());
app.use(express.static('./static'));

app.use(UserRouter);
app.use(ArticleRouter);
app.use(FileRouter);

app.use(ErrorHandler);

module.exports = app;