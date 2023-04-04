import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    power: {
      type: Number,
    },
    position: {
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
      team: {
        type: String,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Find the "players" collection in database and connect it to playerSchema
export default mongoose.model("players", playerSchema);
