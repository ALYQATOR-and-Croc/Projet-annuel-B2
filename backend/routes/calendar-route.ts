import express from 'express';
import isAuthenticated from '../middleware/is-auth';
import calendarGET from '../controllers/calendar-controller';

const router = express.Router();

router.get(
  '/calendar/user/:userId/timerange/:timerange/startdate/:startDate/enddate/:endDate',
  isAuthenticated,
  calendarGET
);

export = router;
