import sql from 'mssql';

import * as config from '../config.json';
import express from 'express';

export const sqlServerTest = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  sql
    .connect(config)
    .then((pool) => {
      next();
    })
    .catch((error: any) => {
      res.status(504).json({ message: 'Gateway Timeout' });
    });
};
