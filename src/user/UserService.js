const pagination = require('../shared/pagination');
const User = require('./User');
const UserNotFoundException = require('./UserNotFoundException');
const bcrypt = require('bcrypt');

const create = async (user) => {
  const { username, email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
};

const getUsers = async (pagination) => {
  const { page, size } = pagination;
  const users = await User.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: ['id', 'username', 'email']
  });
  return {
    totalPage: Math.ceil(users.count / size),
    content: users.rows
  };
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: { id: id },
    attributes: ['id', 'username', 'email']
  });
  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
};

const updateUser = async (id, body) => {
  const user = await User.findOne({ where: { id: id } });
  user.username = body.username;
  await user.save();
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id: id } });
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};

module.exports = {
  create,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  findByEmail
};