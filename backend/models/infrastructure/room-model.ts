export enum RoomEnum {
  NOM_TABLE = 'Salle',
  PK = 'id_salle',
  LIBELLE = 'libelle_salle',
  FLOOR = 'etage',
  EQUIPEMENT = 'equipement_salle',
  CAPACITE = 'capacite_salle',
  FK_CAMPUS = 'id_campus',
}

export interface RoomPOST {
  libelleRoom: string;
  floor: number;
  roomCapacity: number;
  roomEquipment?: string;
  idCampus: number;
}
