import express from 'express';
import { lost } from './test.js';
import postRoute from './post.route.js';
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
const port = 4000;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/posts', postRoute);

// Create HTTP server
/* const server = createServer((req, res) => {
   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'text/plain'});
   // Send the response body "Hello World"
   res.end('Hello World\n');
}); */
// Defined store route
app.all('/', (req, res) => {
  res.send('Hello World!');
});

app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...');
  res.send('secret!');
  next(); // pass control to the next handler
});

// Prints a log once the server starts listening
app.listen(port, () => {
  console.log('The area of a square with a width of 4 is ' + lost.area(4));
  console.log(`Example app listening on port ${port}!`);
});

/* setTimeout(function() {
  console.log('Second');
}, 3000);
console.log('First'); */

/* server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); */
