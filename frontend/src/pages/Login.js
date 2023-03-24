import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <section className="form">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="Please enter an Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="PLease enter password"
          />
        </div>
        <div className="form-group">
          <button disabled={isLoading} type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </section>
  );
};

export default Login;
