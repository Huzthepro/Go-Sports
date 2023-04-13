import blueTeam from "../assets/blueTeam.png";

function PlayerCard({ mappedPlayer }) {
  const closeCard = () => {
    console.log("clicked");
  };
  return (
    <div className="player-menu-container" onClick={closeCard}>
      <div className="player-card-container">
        <div className="player-card-img-container">
          <img
            className="player-card-image"
            src={blueTeam}
            alt="blue-team"
          ></img>
        </div>
        <button onClick={console.log("hi there")}>hi</button>
        <div className="player-card-body">
          <h3>{mappedPlayer.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
