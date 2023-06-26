import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import login from './routes/login';
const app = express();
const localhost = 5000;

app.use(bodyParser.json());
app.use(login);

app.get('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.listen(localhost);
