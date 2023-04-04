import express from "express";
import {
  createPlayer,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
  swapPositions,
} from "../controllers/playerController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();
// authentication added to all Pitch routes
router.use(requireAuth);

//Swap Positions
console.log("here");
router.patch("/swap-positions", swapPositions);

//Get all players
router.route("/").get(getPlayers);

//POST a pitch
router.post("/", createPlayer);

//GET specific player
router.get("/:id", getSinglePlayer);

//Update a pitch
router.patch("/:id", updatePlayer);

//Delete a pitch
router.delete("/:id", deletePlayer);

export default router;
