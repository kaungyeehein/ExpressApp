# ExpressApp

NodeJS

## (1) Initial

    mkdir ExpressApp
    cd ExpressApp

    npm init -y
    npm i express #4.17.1

## (2) Install module

    npm i body-parser #1.19.0
    npm i express-validator #6.12.0
    npm i jsonwebtoken #8.5.1
    npm i bcrypt #5.0.1
    npm i i18next #20.3.2
    npm i i18next-fs-backend #1.1.1
    npm i i18next-http-middleware #3.1.4
    npm i config #3.3.6
    npm i express-rate-limit #5.3.0

### MongoDB

    npm i mongojs #3.1.0

### RDBMS

    npm i sequelize #6.6.5
    npm i sqlite3 #5.0.2

## (3) Development module
    
    npm i -D eslint #7.29.0
    npm i -D nodemon #2.0.10
    npm i -D cross-env #7.0.3

## (4) Run

    node index.js #run normal
    npm start #run with nodemon
    npm run start:pro #run with cross-env

## (5) Update
    
    npm -v #7.19.1
    sudo npm i -g npm

    node -v #v14.17.3
    sudo npm i -g n

## (6) Deploy on Heroku

    heroku create
    git remote -v
    heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false
    git push heroku master
    heroku logs --tail