import express from 'express';
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 4000;
import { Promise, connect } from 'mongoose';
import { DB } from './DB.js';
import postRoute from './post.route';

Promise = global.Promise;
connect(DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/posts', postRoute);

app.listen(PORT, () => {
  console.log('Server is running on Port:',PORT);
});