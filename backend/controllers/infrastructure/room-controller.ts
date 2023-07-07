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

export { newRoomPOST };
