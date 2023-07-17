import express from "express";
import {
  PromotionEnum,
  PromotionType,
  queryDeletePromotionDELETE,
  queryPromotionByIdGET,
  queryPatchPromotionPATCH,
} from "../../models/education/promotion-model";
import * as config from "../../config.json";
import sql from "mssql";
import isId from "../../models/integer-model";

const newPromotionPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const anneePromotion = new Date(body.anneePromotion)
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const sqlQueryData: PromotionType = {
      libellePromotion: body.libellePromotion,
      anneePromotion,
      domainePromotion: body.domainePromotion,
      specialitePromotion: body.specialitePromotion,
      diplomePromotion: body.diplomePromotion,
      niveauEtude: body.niveauEtude,
      idEcole: body.idEcole,
    };
    sql
      .connect(config)
      .then((pool) => {
        const query = `
            INSERT INTO ${PromotionEnum.NOM_TABLE} 
            (   ${PromotionEnum.LIBELLE}, 
                ${PromotionEnum.ANNEE}, 
                ${PromotionEnum.DOMAINE}, 
                ${PromotionEnum.SPECIALITE_PROMOTION}, 
                ${PromotionEnum.DIPLOME}, 
                ${PromotionEnum.NIVEAU_ETUDE}, 
                ${PromotionEnum.FK_ECOLE})
            VALUES 
            ('${sqlQueryData.libellePromotion}', 
            '${sqlQueryData.anneePromotion}', 
            '${sqlQueryData.domainePromotion}', 
            '${sqlQueryData.specialitePromotion}',
            '${sqlQueryData.diplomePromotion}',
            '${sqlQueryData.niveauEtude}',
            '${sqlQueryData.idEcole}')
            `;
        return pool.request().query(query);
      })
      .then(() => {
        response.status(201).send("Campus Successfully created");
      });
  } catch (error) {
    response.status(400);
  }
};

const getPromotionByIdGET = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const params = request.params;
    const idPromotion = Number(params.idPromotion);
    if (!isId([idPromotion])) {
      throw new Error("Bad Request");
    }
    sql
      .connect(config)
      .then((pool) => {
        const query = queryPromotionByIdGET(idPromotion);
        return pool
          .request()
          .query(query)
          .then((result) => {
            if (result) {
              return response.status(200).send(result.recordset);
            } else {
              return response.status(405).send("Unacceptable operation.");
            }
          }).catch((error) => {
            console.log();
            
            return response.status(405).send("Unacceptable operation.");
          });
      })
      .catch((error) => { 
        console.log(error.message);
        return response.status(400).send("Bad Request");
      });
  } catch (error) {
    return response.status(400).send("Bad Request");
  }
};

export { newPromotionPOST };
