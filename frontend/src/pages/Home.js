import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Link to={`/pitch`}>
      <button className="green-button"> Go to my Pitch</button>
    </Link>
  );
};

export default Home;
