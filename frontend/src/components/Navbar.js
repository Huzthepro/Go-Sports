import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo"></img>{" "}
        </Link>
      </div>
      {user && (
        <ul>
          <li>
            <span className="user-email">{user.email}</span>
          </li>
          <button className="green-button" onClick={handleClick}>
            Log out
          </button>
        </ul>
      )}
      {!user && (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Register</Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
