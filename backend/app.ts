// import tokenGenerator from './controllers/token-generator-dev';

import * as config from "./config.json";
import express from "express";
import bodyParser from "body-parser";
import auth from "./routes/auth/auth-route";
import roles from "./routes/users/roles-route";
import campus from "./routes/infrastructure/campus-route";
import school from "./routes/infrastructure/school-route";
import studClass from "./routes/education/student-class-route";
import promotion from "./routes/education/promotion-routes";
import room from "./routes/infrastructure/room-route";
import matiere from "./routes/education/matiere-route";
import course from "./routes/education/course-route";
import presence from "./routes/education/presence-route";
import cors from "cors";
import { sqlServerTest } from "./middleware/slq-test-middleware";
const app = express();
const portHost = config.HOST;
const API_URL = config.API;

app.use(bodyParser.json());

///// 1
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", API_URL); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   }
// );

///// 2
app.use(cors());

app.use(sqlServerTest);
// app.use(tokenGenerator);
app.use(auth);
app.use(roles);
app.use(campus);
app.use(school);
app.use(studClass);
app.use(promotion);
app.use(room);
app.use(matiere);
app.use(course);
app.use(presence);

app.get("/", (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.listen(portHost);
