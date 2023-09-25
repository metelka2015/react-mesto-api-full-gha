require('dotenv').config();

const {
    DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
     PORT=3000,
     JWT_SECRET = 'fallback-secret',
     NODE_ENV } = process.env;

module.exports = { DB_URL, PORT, JWT_SECRET, NODE_ENV };