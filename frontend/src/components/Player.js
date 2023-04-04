import blueTeam from "../assets/blueTeam.png";
import redTeam from "../assets/redTeam.png";

const Player = ({ mappedPlayer, team }) => {
  const handleDragStart = (event, mappedPlayerId, team) => {
    event.dataTransfer.setData("text/plain", mappedPlayerId);
    var img = document.createElement("img");
    if (team === "blue") {
      img.src = blueTeam;
    } else {
      img.src = redTeam;
    }

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
        <img
          draggable="false"
          src={team === "blue-team" ? blueTeam : redTeam}
          alt={team}
        ></img>
      </div>
      <div className="player-text-container">
        <h4>{mappedPlayer.name} </h4>
      </div>
    </div>
  );
};

export default Player;
