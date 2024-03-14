import "./Login.css";

interface signinProps {
  signupLink: () => void;
  visible: string;
}

const Signin: React.FC<signinProps> = ({ signupLink, visible }) => {
  return (
    <form action="#" className={`login ${visible}`}>
      <div className="field">
        <input type="text" placeholder="Email Address" required />
      </div>
      <div className="field">
        <input type="password" placeholder="Password" required />
      </div>
      <div className="pass-link">
        <a href="#">Forgot password?</a>
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Login" />
      </div>
      <div className="signup-link">
        Not a member?{" "}
        <a href="#" onClick={signupLink}>
          Signup now
        </a>
      </div>
    </form>
  );
};

export default Signin;
