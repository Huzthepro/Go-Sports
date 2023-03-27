import PlayerDetails from "./PlayerDetails";

const PlayerGallery = ({ players, refreshPlayers }) => {
  return (
    <div className="players">
      {players &&
        players.map((mappedPlayer) => (
          <PlayerDetails
            key={mappedPlayer._id}
            player={mappedPlayer}
            refreshPlayers={refreshPlayers}
          />
        ))}
    </div>
  );
};

export default PlayerGallery;
