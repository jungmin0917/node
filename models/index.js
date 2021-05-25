const Sequelize = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

const env = process.env.node_env || 'development';

const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;