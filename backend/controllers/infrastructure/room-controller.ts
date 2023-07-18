import express from "express";
import {
  CampusEnum,
  CampusPOST,
} from "../../models/infrastructure/campus-model";
import * as config from "../../config.json";
import sql from "mssql";
import { RoomEnum, RoomPOST } from "../../models/infrastructure/room-model";
import isId from "../../models/integer-model";

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
        response.status(201).send("Room Successfully created");
      });
  } catch (error) {
    response.status(400).send("Bad request");
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
      })
      .catch((error) => {
        response.status(405).send("Unacceptable operation.");
      })
      .then((result) => {
        if (result) {
          response.status(200).send(result.recordset);
        } else {
          throw new Error("Unacceptable operation.");
        }
      })
      .catch((error) => {
        console.log(error.message);
        response.status(405).send("Unacceptable operation.");
      });
  } catch (error) {
    return response.status(400).send("Bad request");
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
    console.log(params);
    sql.connect(config).then((pool) => {
      const query = `
            SELECT
            ${RoomEnum.NOM_TABLE}.${RoomEnum.PK} AS id_salle,
            ${RoomEnum.NOM_TABLE}.${RoomEnum.LIBELLE} AS libelle_classe,
            ${RoomEnum.NOM_TABLE}.${RoomEnum.FLOOR} AS etage,
            ${RoomEnum.NOM_TABLE}.${RoomEnum.CAPACITE} AS capacite_salle,
            ${CampusEnum.NOM_TABLE}.${CampusEnum.PK} AS id_campus,
            ${CampusEnum.NOM_TABLE}.${CampusEnum.LIBELLE} AS libelle_campus,
            ${CampusEnum.NOM_TABLE}.${CampusEnum.ADRESSE} AS adresse_campus,
            ${CampusEnum.NOM_TABLE}.${CampusEnum.CODEPOSTAL} AS codepostal_campus

            FROM ${RoomEnum.NOM_TABLE} 
            LEFT JOIN ${CampusEnum.NOM_TABLE} ON ${RoomEnum.NOM_TABLE}.${RoomEnum.FK_CAMPUS} = ${CampusEnum.NOM_TABLE}.${CampusEnum.PK}
            WHERE ${RoomEnum.NOM_TABLE}.${RoomEnum.FK_CAMPUS} = ${idCampus} AND ${RoomEnum.NOM_TABLE}.${RoomEnum.PK} != 10
            `;
      pool
        .request()
        .query(query)
        .then((result) => {
          if (result) {
            return response.status(200).send(result.recordset);
          } else {
            throw new Error("Bad request");
          }
        })
        .catch((error) => {
          console.log(error.message);
          return response.status(400).send("Bad request");
        });
    });
  } catch (error) {
    return response.status(400).send("Bad request");
  }
};

const patchRoomPATCH = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const params = request.params;
    const idRoom = Number(params.idRoom);
    if (!isId([idRoom])) {
      throw new Error("Bad Request");
    }
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
            UPDATE ${RoomEnum.NOM_TABLE}
            SET ${RoomEnum.LIBELLE} = '${sqlQueryData.libelleRoom}', ${RoomEnum.FLOOR} = ${sqlQueryData.floor}, ${RoomEnum.CAPACITE} = ${sqlQueryData.roomCapacity}, ${RoomEnum.FK_CAMPUS} = ${sqlQueryData.idCampus}
            WHERE ${RoomEnum.PK} = ${idRoom}
            `;
        return pool
          .request()
          .query(query)
          .then(() => {
            return response.status(200).send("Room Successfully updated");
          });
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(400).send("Bad request");
      });
  } catch (error) {
    return response.status(400).send("Bad request");
  }
};

const deleteRoomDELETE = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const idRoom = Number(params.idRoom);
    if (!isId([idRoom])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            DELETE FROM ${RoomEnum.NOM_TABLE}
            WHERE ${RoomEnum.PK} = ${idRoom}
            `;
        return pool
          .request()
          .query(query)
          .then(() => {
            return response.status(200).send("Room Successfully deleted");
          })
          .catch((error) => {
            console.log(error.message);
            return response.status(405).send("Unacceptable operation.");
          });
      })
      .catch((error) => {
        console.log(error.message);
        return response.status(405).send("Unacceptable operation.");
      });
  } catch (error) {
    return response.status(400).send("Bad request");
  }
};

export {
  newRoomPOST,
  getRoomsGET,
  getRoomsByCampusGET,
  patchRoomPATCH,
  deleteRoomDELETE,
};
