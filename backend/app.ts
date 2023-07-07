import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import login from './routes/login';
const app = express();
const localhost = 5000;
const API_URL = 'http://localhost:3000'


app.use(bodyParser.json());
app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", API_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(login);

app.get('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.listen(localhost);
