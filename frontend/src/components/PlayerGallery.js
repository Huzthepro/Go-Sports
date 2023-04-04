import { useState } from "react";
import Player from "./Player";
import Fetcher from "../helpers/Fetcher";

const PlayerGallery = ({ players, refreshPlayers }) => {
  const [error, setError] = useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const playerId = e.dataTransfer.getData("text/plain");
    const player = players.find((p) => p._id === playerId);
    if (!player) {
      return;
    }
    const updatedPlayer = {
      ...player,
      position: {
        team: "no-team",
      },
    };
    const apiCon = new Fetcher();
    apiCon
      .patch("pitch/" + updatedPlayer._id, updatedPlayer)
      .then(() => {
        refreshPlayers();
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <div className="players" onDragOver={handleDragOver} onDrop={handleDrop}>
      {error && <div className="error">{error}</div>}
      {players &&
        players.map((mappedPlayer) => {
          if (
            mappedPlayer.position.team &&
            mappedPlayer.position.team === "no-team"
          ) {
            return (
              <Player key={mappedPlayer._id} mappedPlayer={mappedPlayer} />
            );
          } else {
            return null;
          }
        })}
    </div>
  );
};

export default PlayerGallery;
