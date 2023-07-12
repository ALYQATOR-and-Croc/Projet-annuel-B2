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
      response.status(401).send('Error unauthorized');
    }
    const token = authHeader!.replace('Bearer ', '');
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretPass.passwordToken);
      next();
    } catch (error: any) {
      response.status(401).send('Error unauthorized');
    }
  } catch (error) {
    response.status(401).send('Error unauthorized');
  }
};

const isCourseManager = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = request.get('Authorization');
    const token = authHeader!.replace('Bearer ', '');
    const decodedToken: any = jwt.verify(token, secretPass.passwordToken);
    if (
      decodedToken.aud !== 'admin' ||
      decodedToken.aud !== 'respPedago' ||
      decodedToken.aud !== 'attProm' ||
      decodedToken.aud !== 'repro'
    ) {
      throw new Error('Not authorized');
    }
    next();
  } catch (error) {
    console.log(error);
    response.status(401).send(error);
  }
};

export = isAuthenticated;
