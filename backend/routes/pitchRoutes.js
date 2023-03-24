import express from "express";
import {
  createPlayer,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/playerController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
// authentication added to all Pitch routes
router.use(requireAuth);

//Get all players
router.route("/").get(getPlayers);

//GET specific player
router.get("/:id", getSinglePlayer);

//POST a pitch
router.post("/", createPlayer);

//Update a pitch
router.patch("/:id", updatePlayer);

//Delete a pitch
router.delete("/:id", deletePlayer);

export default router;
