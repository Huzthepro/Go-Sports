import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useSignup Hook will handle signup process
  const { signup, error, isLoading } = useSignup();

  //Form button will trigger handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <section className="form">
      <h3>Sign up</h3>
      {isLoading && <Spinner spinMessage={isLoading} />}
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
            placeholder="Please enter password"
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

export default Signup;
