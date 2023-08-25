const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const url_database = `mongodb+srv://${user}:${password}@cluster0.1eud56w.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url_database, ({ useNewUrlParser : true }));

mongoose.connection.on('connected', () => {
    console.log('tudo certo')
})

mongoose.connection.on('error', (error) => {
    console.log('deu erro', error)
})

module.exports = mongoose.connection;