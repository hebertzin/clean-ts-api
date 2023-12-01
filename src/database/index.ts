import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const user = process.env.USER_DATABASE;
const password = process.env.PASSWORD_DATABASE;

const url_database = `mongodb+srv://${user}:${password}@cluster0.1eud56w.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url_database);

mongoose.connection.on('connected', () => {
  console.log('conected to database');
});

mongoose.connection.on('error', (error) => {
  console.log(`some error ocurred, ${ error } `);
});

export default mongoose.connection;
