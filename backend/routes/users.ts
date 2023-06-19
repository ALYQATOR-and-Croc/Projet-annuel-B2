import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


export class UsersRouter {
  parameters : null = null;
  constructor(parameters : null = null){
    this.parameters = parameters
  }
  public getRouter(){
    return router
  }
}
module.exports = router;
