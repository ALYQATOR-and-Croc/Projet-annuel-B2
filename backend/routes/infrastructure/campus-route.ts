import express from "express";
import isAuthenticated from "../../middleware/is-auth";
import { isAdmin, isEducationManager } from "../../middleware/roles-middleware";
import {} from "../../controllers/users/roles-controller";
import {
  getCampusGET,
  newCampusPOST,
  patchCampusPATCH,
} from "../../controllers/infrastructure/campus-controller";

const router = express.Router();

router.post("/campus/new/", isAuthenticated, isEducationManager, newCampusPOST);
router.get("/campus/", isAuthenticated, isEducationManager, getCampusGET);

router.patch(
  "/campus/:idCampus/",
  isAuthenticated,
  isEducationManager,
  patchCampusPATCH
);
export = router;
