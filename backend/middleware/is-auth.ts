import * as jwt from 'jsonwebtoken';
import express from 'express';
import * as secretPass from '../CONFIG-FILES/secret-password.json';

const isAuthenticated = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
      throw new Error('Not authenticated.');
    }
    const token = authHeader!.replace('Bearer ', '');
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretPass.passwordToken);
      next();
    } catch (error: any) {
      response.status(401).send(error?.name);
    }
  } catch (error) {
    response.status(401).send('Error unauthorized');
  }
};

export = isAuthenticated;
