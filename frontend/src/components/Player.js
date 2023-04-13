import blueTeam from "../assets/blueTeam.png";
import redTeam from "../assets/redTeam.png";
import carry from "../assets/football2.png";

import PlayerCard from "./PlayerCard";
import { useState } from "react";

const Player = ({ mappedPlayer, team }) => {
  const [playerCard, setPlayerCard] = useState(false);
  const playerClicked = () => {
    playerCard ? setPlayerCard(false) : setPlayerCard(true);
    console.log("player clicked");
  };
  console.log(mappedPlayer.name);
  const handleDragStart = (event, mappedPlayerId) => {
    event.dataTransfer.setData("text/plain", mappedPlayerId);
    var img = document.createElement("img");
    img.src = carry;

    event.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
    requestAnimationFrame(function () {
      event.target.classList.add("untargetable");
    });
  };
  function endDrag(e) {
    e.target.classList.remove("untargetable");
  }

  return (
    <div
      className={team ? "grid-item" : "no-team"}
      key={mappedPlayer._id}
      draggable
      onClick={playerClicked}
      onDragStart={(event) =>
        handleDragStart(
          event,
          mappedPlayer._id,
          team === "blue-team" ? "blue" : "red"
        )
      }
      onDragEnd={endDrag}
      style={{
        left: `${mappedPlayer.position.x}%`,
        top: `${mappedPlayer.position.y}%`,
      }}
      id={mappedPlayer._id}
    >
      <div className="player-image-container">
        <h4 className="number">{mappedPlayer.number}</h4>
        <img
          draggable="false"
          src={team === "blue-team" ? blueTeam : redTeam}
          alt={team}
        ></img>
      </div>
      <div className="player-text-container">
        <h4>{mappedPlayer.name} </h4>
      </div>
      {playerCard && <PlayerCard mappedPlayer={mappedPlayer} />}
    </div>
  );
};

export default Player;
