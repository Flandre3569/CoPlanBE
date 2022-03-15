const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const privateKeyPath = path.resolve(__dirname, '../keys/private.key');
const publicKeyPath = path.resolve(__dirname, '../keys/public.key');
const PRIVATE_KEY = fs.readFileSync(privateKeyPath);
const PUBLIC_KEY = fs.readFileSync(publicKeyPath);

dotenv.config();

const {
  SERVER_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env

module.exports = {
  SERVER_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PRIVATE_KEY,
  PUBLIC_KEY
};