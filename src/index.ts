import express from 'express';
const app = express();

// import bodyParser from 'body-parser';

import routes from './routes';

import db  from './database/index';

import { config }  from 'dotenv';

config();
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(routes)

db.on('conected', () => {
    console.log('successfully connected')
})
db.on('error', ( error : any ) => {
    console.log(`error connecting ${error}`)
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`sever is running on port ${ port }`);
})