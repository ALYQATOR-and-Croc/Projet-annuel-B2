import express from 'express';
import {
  PromotionEnum,
  PromotionPOST,
} from '../../models/education/promotion-model';
import * as config from '../../config.json';
import sql from 'mssql';

const newPromotionPOST = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = request.body;
    const anneePromotion = new Date(body.anneePromotion)
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);
    const sqlQueryData: PromotionPOST = {
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
        response.status(201).send('Campus Successfully created');
      });
  } catch (error) {
    response.status(400);
  }
};

export { newPromotionPOST };
