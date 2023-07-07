import express from 'express';
import isId from '../models/integer-model';
import { CalendarGET } from '../models/calendar-model';
import sql from 'mssql';

const calendarGET = (request: express.Request, response: express.Response) => {
  const calendarBody = request.body;
  if (isId([calendarBody.userId])) {
    const userId: number = calendarBody.userId;
    const calendar: CalendarGET = {
      userId,
      timeRange: calendarBody.timeRange,
      startDate: calendarBody.startDate,
      endDate: calendarBody.endDate,
    };
  }
};

export = calendarGET;
