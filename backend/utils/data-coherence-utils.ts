import { StudentPresence } from '../models/education/presence-model';

export const isPresenceDataCoherent = (studentPresence: StudentPresence) => {
  const isAbsentPossibleValue =
    !!studentPresence.isAbsent &&
    !studentPresence.isLate &&
    !studentPresence.hasSigned;
  const isLatePossibleValue =
    !studentPresence.isAbsent &&
    !!studentPresence.isLate &&
    !!studentPresence.hasSigned;
  const isPresentPossibleValue =
    !studentPresence.isAbsent &&
    !studentPresence.isLate &&
    !!studentPresence.hasSigned;
  if (isAbsentPossibleValue || isLatePossibleValue || isPresentPossibleValue) {
    return true;
  } else {
    return false;
  }
};
