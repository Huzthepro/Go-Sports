import playerCollection from "../models/playerModel.js";
import mongoose from "mongoose";

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Get All Players  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/
// Method: GET
const getPlayers = async (req, res) => {
  const user_id = req.user._id;
  const allPlayers = await playerCollection
    .find({ user_id })
    .sort({ createdAt: -1 });
  res.status(200).json(allPlayers);
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Get Single Player  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/:id
// Method: GET
const getSinglePlayer = async (req, res) => {
  const { id } = req.params;

  //Quick check if the entered Id is in valid form
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id is not valid type" });
  }
  const player = await playerCollection.findById(id);
  if (!player) {
    return res.status(404).json({ error: "No such player" });
  }
  res.status(200).json(pitch);
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Create a Player  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/
// Method: POST
const createPlayer = async (req, res) => {
  const { name, power, number } = req.body;

  //Empty field control
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  // if (!power) {
  //   emptyFields.push("power");
  // }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // Adding player to Database
  try {
    const user_id = req.user._id;
    const player = await playerCollection.create({
      name,
      power,
      number,
      position: {
        team: "no-team",
      },

      user_id,
    });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Update a Player  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/:id
// Method: PATCH
const updatePlayer = async (req, res) => {
  const { id } = req.params;

  //Quick check if the entered Id is in valid form
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id is not valid type" });
  }

  const player = await playerCollection.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!player) {
    return res.status(404).json({ error: "No such player" });
  }
  res.status(200).json(player);
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Delete a Player  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/:id
// Method: DELETE
const deletePlayer = async (req, res) => {
  const { id } = req.params;
  //Quick check if the entered Id is in valid form
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id is not valid type" });
  }
  const player = await playerCollection.findOneAndDelete({ _id: id });

  if (!player) {
    return res.status(404).json({ error: "No such player" });
  }
  res.status(200).json(player);
};

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Swap Player  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
// Route= api/pitch/swap-positions
// Method: Pitch
const swapPositions = async (req, res) => {
  const { players } = req.body;
  console.log(players);
  try {
    const updatedPositions = players.map((player) => ({
      _id: player._id,
      position: player.position,
    }));

    const updatedPlayers = await Promise.all(
      updatedPositions.map(({ _id, position }) =>
        playerCollection.findByIdAndUpdate(_id, { position }, { new: true })
      )
    );

    res.json({ updatedPlayers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  getPlayers,
  getSinglePlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
  swapPositions,
};
