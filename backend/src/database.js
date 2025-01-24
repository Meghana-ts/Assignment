const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('MySQL Connected'))
  .catch((err) => console.error('MySQL Connection Error:', err));

module.exports = sequelize;
