import "./Login.css";

function Signup() {
  return (
    <form action="#" className="signup">
      <div className="field">
        <input type="text" placeholder="Email Address" required />
      </div>
      <div className="field">
        <input type="password" placeholder="Password" required />
      </div>
      <div className="field">
        <input type="password" placeholder="Confirm password" required />
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Signup" />
      </div>
    </form>
  );
}

export default Signup;
