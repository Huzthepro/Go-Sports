import footballPitchImage from "../assets/footballPitch.png";
import Fetcher from "../helpers/Fetcher";
import Player from "./Player";
import { useState } from "react";

const PlayField = ({ players, refreshPlayers }) => {
  const [error, setError] = useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, team) => {
    e.preventDefault();

    let color = "";
    if (team === "blue-team") {
      color = "blue";
    } else {
      color = "red";
    }
    console.log(color);
    const playerId = e.dataTransfer.getData("text/plain");
    const player = players.find((p) => p._id === playerId);
    if (!player) {
      return;
    }
    console.log(team);

    const pitch = e.target.getBoundingClientRect();
    const droppedPlayer = e.target.closest(".grid-item");
    if (!droppedPlayer || droppedPlayer === e.target) {
      // The dropped item is not on another player, so update the position of the dropped item
      if (!e.target.classList.contains(team)) {
        return;
      }

      // Get the width of the left-team div and calculate the playerWidth as 30% of that
      const leftTeamDiv = document.querySelector(`.${team}`);
      // Check if the drop occurred in the 'left-team' div
      if (!leftTeamDiv.contains(e.target)) {
        return;
      }
      console.log("baska player ustunde degil");
      function checkRange(val, min, max) {
        if (val <= min) {
          return min;
        }
        if (val >= max) {
          return max;
        }
        return val;
      }
      const x = checkRange(
        ((e.clientX - pitch.left - pitch.width / 8) / pitch.width) * 100,
        0,
        78
      );
      const y = checkRange(
        ((e.clientY - pitch.top - pitch.width / 9) / pitch.height) * 100,
        4,
        78
      );
      const updatedPlayer = {
        ...player,
        position: {
          team: color,
          x: x,
          y: y,
        },
      };
      console.log("x: " + x + "\n\nY: " + y);

      console.log(updatedPlayer);
      const apiCon = new Fetcher();
      apiCon
        .patch("pitch/" + updatedPlayer._id, updatedPlayer)
        .then(() => {
          refreshPlayers();
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    } else {
      console.log("\n\nbaska player ustunde!!!!");
      // The dropped item is on another player, so swap their positions
      const droppedPlayerId = droppedPlayer.getAttribute("id");
      console.log(droppedPlayerId);
      const droppedPlayerIndex = players.findIndex(
        (p) => p._id === droppedPlayerId
      );
      const updatedPlayer = {
        ...player,
        position: {
          team: player.position.team,
          x: players[droppedPlayerIndex].position.x,
          y: players[droppedPlayerIndex].position.y,
        },
      };
      const updatedDroppedPlayer = {
        ...players[droppedPlayerIndex],
        position: {
          team: players[droppedPlayerIndex].position.team,
          x: player.position.x,
          y: player.position.y,
        },
      };
      const updatedPlayers = [...players];
      updatedPlayers[droppedPlayerIndex] = updatedPlayer;
      updatedPlayers[players.findIndex((p) => p._id === playerId)] =
        updatedDroppedPlayer;
      console.log(updatedPlayers);
      const apiCon = new Fetcher();
      apiCon
        .patch("pitch/swap-positions", { players: updatedPlayers })
        .then(() => {
          refreshPlayers();
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };

  return (
    <div className="pitch">
      {error && <div className="error">{error}</div>}
      <div className="teams">
        <div
          className="blue-team"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "blue-team")}
        >
          {players &&
            players.map((mappedPlayer) => {
              if (
                mappedPlayer.position &&
                mappedPlayer.position.team === "blue"
              ) {
                return (
                  <Player
                    key={mappedPlayer._id}
                    mappedPlayer={mappedPlayer}
                    team={"blue-team"}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
        <div
          className="red-team"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, "red-team")}
        >
          {players &&
            players.map((mappedPlayer) => {
              if (
                mappedPlayer.position &&
                mappedPlayer.position.team === "red"
              ) {
                return (
                  <Player
                    key={mappedPlayer._id}
                    mappedPlayer={mappedPlayer}
                    team={"red-team"}
                  />
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
      <img src={footballPitchImage} alt="football pitch"></img>
    </div>
  );
};

export default PlayField;
