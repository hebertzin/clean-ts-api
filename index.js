const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
const db = require('./database');
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes)

db.on('conected', () => {
    console.log('successfully connected')
})
db.on('error', (error) => {
    console.log(`error connecting ${error}`)
});

const port = process.env.port;

app.listen(port, () => {
    console.log(`sever is running on port ${ port }`);
})