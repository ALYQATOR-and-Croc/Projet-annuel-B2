import express from "express";
import {isAuthenticated} from "../../middleware/is-auth";
import { isAdmin, isEducationManager } from "../../middleware/roles-middleware";
import {} from "../../controllers/users/roles-controller";
import {
  newRoomPOST,
  getRoomsGET,
  getRoomsByCampusGET,
  patchRoomPATCH,
  deleteRoomDELETE
} from "../../controllers/infrastructure/room-controller";

const router = express.Router();

router.post("/room/new/", isAuthenticated, isEducationManager, newRoomPOST);

router.get("/rooms/", isAuthenticated, isEducationManager, getRoomsGET);

router.patch(
  "/room/:idRoom/",
  isAuthenticated,
  isEducationManager,
  patchRoomPATCH
);

router.get(
  "/rooms/campus/:idCampus/",
  isAuthenticated,
  isEducationManager,
  getRoomsByCampusGET
);

router.delete(
  "/room/:idRoom/",
  isAuthenticated,
  isEducationManager,
  deleteRoomDELETE
);

export = router;
