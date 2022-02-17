import { useRef } from "react";
import "./Login.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // #0a8980

  return (
    <div className="center">
      <h1>Prihlásenie</h1>
      <form method="post">
        <div className="textField">
          <input type="text" required ref={emailRef}></input>
          <span></span>
          <label>E-mail</label>
        </div>
        <div className="textField">
          <input type="password" required ref={passwordRef}></input>
          <span></span>
          <label>Heslo</label>
        </div>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  );
}

export default Login;
