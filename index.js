const app = require('./src/app');
const sequelize = require('./src/config/database');
const UserService = require('./src/user/UserService');
const Article = require('./src/article/Article');

if (process.env.NODE_ENV === 'production') {
  sequelize.sync();
} else {
  sequelize.sync({ force: true }).then(async () => {
    for (let i = 1; i <= 5; i++) {
      const user = {
        username: `user${i}`,
        email: `user${i}@mail.com`,
        password: 'P@ssword'
      };
      await UserService.create(user);

      const article = {
        content: `article content ${i}`
      };
      await Article.create(article);
    }
  });
}

app.listen(3000, () => {
  console.log('app is running in mode: ', process.env.NODE_ENV);
});