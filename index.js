require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
const db = require('./database');
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(routes)

const port =process.env.port;

db.on('conected', () => {
    console.log('successfully connected')
})
db.on('error', (error) => {
    console.log('there was an error connecting', error)
});

app.listen(port, () => {
    console.log('tudo ok')
})