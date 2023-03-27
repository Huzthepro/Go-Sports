import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Fetcher from "../helpers/Fetcher";

const AddPLayer = ({ refreshPlayers }) => {
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const apiCon = new Fetcher();

    apiCon
      .post("pitch", { name, power })
      .then(() => {
        refreshPlayers();
        setName("");
        setPower("");
        setError(null);
        setEmptyFields([]);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setEmptyFields(err.response.data.emptyFields);
      });
  };
  return (
    <form className="form-create-player" onSubmit={handleSubmit}>
      <div className="form-group-vertical">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Player name"
          className={emptyFields.includes("name") ? "error" : ""}
        ></input>
      </div>
      <div className="form-group-vertical">
        <input
          type="number"
          onChange={(e) => setPower(e.target.value)}
          value={power}
          placeholder="Player power"
          className={emptyFields.includes("power") ? "error" : ""}
        ></input>
      </div>
      <button className="green-button">Add Player</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddPLayer;
