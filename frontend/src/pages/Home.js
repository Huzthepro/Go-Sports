import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import tactic from "../assets/tactic.png";
const Home = () => {
  const { user } = useAuthContext();
  const link = user ? "/pitch" : "/login";
  return (
    <div className="home-page">
      <h4>Start designing your team!</h4>
      <div className="games">
        <Link className="game-card" to={link}>
          <div className="card-img-container">
            <img src={tactic} alt="Team design"></img>
          </div>

          <button className="green-button"> Go to my Pitch</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
