import express from 'express';
import {
  CampusEnum,
  CampusPOST,
} from '../../models/infrastructure/campus-model';
import * as config from '../../config.json';
import sql from 'mssql';
import { RoomEnum, RoomPOST } from '../../models/infrastructure/room-model';

const newRoomPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const sqlQueryData: RoomPOST = {
      libelleRoom: body.libelleRoom,
      floor: body.floor,
      roomCapacity: body.roomCapacity,
      idCampus: body.idCampus,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            INSERT INTO ${RoomEnum.NOM_TABLE} (${RoomEnum.LIBELLE},${RoomEnum.FLOOR}, ${RoomEnum.CAPACITE}, ${RoomEnum.FK_CAMPUS})
            VALUES 
            ('${sqlQueryData.libelleRoom}', ${sqlQueryData.floor}, ${sqlQueryData.roomCapacity},${sqlQueryData.idCampus})
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send('Promotion Successfully created');
      });
  } catch (error) {
    response.status(400).send('Bad request');
  }
};

const getRoomsGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    sql

      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${RoomEnum.NOM_TABLE}
            WHERE ${RoomEnum.PK} != 10
            `;
        return pool.request().query(query);
      }).catch
      ((error) => {
        response.status(405).send('Unacceptable operation.');
      })
      .then((result) => {
        if (result) {
          response.status(200).send(result.recordset);
        } else {
          throw new Error('Unacceptable operation.');
        }
      }).catch
      ((error) => {
        response.status(405).send('Unacceptable operation.');
      });
  } catch (error) {
    return response.status(400).send('Bad request');
  }
};

const getRoomsByCampusGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const idCampus: number = Number(params.idCampus);
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            SELECT * FROM ${RoomEnum.NOM_TABLE}
            WHERE ${RoomEnum.FK_CAMPUS} = ${idCampus} AND ${RoomEnum.PK} != 10
            `;    
        return pool.request().query(query);
      }).catch
      ((error) => {
        response.status(400).send('Bad request');
      })
      .then((result) => {
        if (result) {
          response.status(200).send(result.recordset);
        } else {
          throw new Error('Bad request');
        }
      }).catch
      ((error) => {
        response.status(400).send('Bad request');
      });
  } catch (error) {
    return response.status(400).send('Bad request');
  }
};


export { newRoomPOST, getRoomsGET };
