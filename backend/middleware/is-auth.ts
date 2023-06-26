import * as jwt from 'jsonwebtoken';
import express, { response } from 'express';
import * as secretPass from '../CONFIG-FILES/secret-password.json';

const isAuthenticated = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const authHeader = request.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    response.status(401).send(error);
    throw error;
  }
  const token = authHeader.replace('Bearer ', '');
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secretPass.passwordToken);
  } catch (error) {
    response.status(401).send('Not authenticated.');
    throw error;
  }
  next();
};

export = isAuthenticated;
