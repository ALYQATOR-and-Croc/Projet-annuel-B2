import bcrypt from 'bcryptjs';
import validationResult from 'express-validator';
import { LoginBody } from '../models/login';
import * as config from '../config.json';
import sql from 'mssql';
import secretPass from '../CONFIG-FILES/secret-password.json';
import * as jwt from 'jsonwebtoken';
import express from 'express';

// TODO : create admin right check
const ADMIN_RIGHTS = 'admin';

// Temporary
const etudiant = {
  id_etudiant: 1,
  email_etudiant: 'luigi@emargis.fr',
  mot_de_passe_etudiant: 'azerty',
};

const login = (request: express.Request, response: express.Response) => {
  const loginBody: LoginBody = request!.body;
  const loginAlias: string = loginBody.login;
  const loginPassword: string = loginBody.password;
  const result = { recordset: [etudiant] };

  // CANNOT CONNECT TO SQL SERVER
  // sql
  //   .connect(config)
  //   .then((pool) => {
  //     //   return pool.request().query('SELECT FROM Etudiant WHERE email_etudiant = ${loginAlias}}');
  //     return { recordset: [etudiant] };
  //   })
  //   .then((result) => {
  //     if (result.recordset[0].mot_de_passe_etudiant === loginPassword) {
  //       const payload = {
  //         sub: loginAlias,
  //         id: result.recordset[0].id_etudiant,
  //         role: ADMIN_RIGHTS,
  //       };
  //       const claims = {
  //         expiresIn: '2h',
  //         audience: ADMIN_RIGHTS,
  //       };
  //       const token = jwt.sign(payload, secretPass.passwordToken, claims);
  //       response
  //         .status(200)
  //         .json({
  //           token: () => token,
  //           userId: result.recordset[0].id_etudiant.toString(),
  //         });
  //     } else {
  //       response.status(401).send("User doesn't exist.");
  //     }
  //   });
  if (result.recordset[0].mot_de_passe_etudiant === loginPassword) {
    const payload = {
      sub: loginAlias,
      id: result.recordset[0].id_etudiant,
      role: ADMIN_RIGHTS,
    };
    const options = {
      expiresIn: '1h',
      audience: [ADMIN_RIGHTS, result.recordset[0].id_etudiant.toString()],
    };
    const token: string = jwt.sign(payload, secretPass.passwordToken, options);
    response.status(200).json({
      token: token,
      userId: result.recordset[0].id_etudiant.toString(),
    });
    1111;
  } else {
    response.status(401).send("User doesn't exist.");
  }
};

export = login;
