import express from 'express';

// faire un validateur sur les requêtes POST !!!
const isId = (idToTest: number[]): boolean => {
  idToTest.forEach((element) => {
    if (!Number.isInteger(element)) {
      return false;
    }
  });
  return true;
};

export = isId;
