require('dotenv').config();

const {
    DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
     PORT=3000,
     JWT_SECRET = '3d67637ff740fcd8a45e587b23485802318e643a76e40cd44062fff7159fe32c',
     NODE_ENV } = process.env;

module.exports = { DB_URL, PORT, JWT_SECRET, NODE_ENV };