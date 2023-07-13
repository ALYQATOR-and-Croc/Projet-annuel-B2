import { updatePresencesPUT } from '../../controllers/education/presence-controller';
import isAuthenticated from '../../middleware/is-auth';
import { isAdmin } from '../../middleware/roles-middleware';
import express from 'express';

const router = express.Router();

router.put('/course/presences/', isAuthenticated, isAdmin, updatePresencesPUT);

// router.put('/course/presence/', isAuthenticated, isAdmin, updatePresencePUT);

// router.get('/course/presence/:idcourse/', isAuthenticated, isAdmin, coursePresenceGET);

// router.get('/course/presence/:idcourse/student/:idstudent', isAuthenticated, isAdmin, studentCoursePresenceGET);

// router.get('/course/presence/classe/:idclasse', isAuthenticated, isAdmin, classePrescenceGET);

export = router;
