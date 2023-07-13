export const booleanToSqlBit = (boolToConvert: boolean): number => {
  if (boolToConvert) {
    return 1;
  } else {
    return 0;
  }
};
export const sqlBitToBoolean = (sqlBitToConvert: number): boolean => {
  if (sqlBitToConvert === 1) {
    return true;
  } else {
    return false;
  }
};
