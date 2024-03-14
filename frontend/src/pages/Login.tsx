import Signup from "../component/login/Signup";
import Signin from "../component/login/Signin";
import { useRef, useState } from "react";

function Login() {
  const [visible, setVisible] = useState("hide");
  const signupRef = useRef<HTMLLabelElement>(null);

  const signUpBtn = () => {
    setVisible("visible");
  };

  const loginBtn = () => {
    setVisible("hide");
  };

  const signupLink = () => {
    if (signupRef.current) {
      signupRef.current.click();
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title login ${visible}`}>Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={loginBtn}>
            Login
          </label>
          <label
            ref={signupRef}
            htmlFor="signup"
            className="slide signup"
            onClick={signUpBtn}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <Signin signupLink={signupLink} visible={visible} />
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default Login;
