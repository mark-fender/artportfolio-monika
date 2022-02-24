import { useRef, useState } from "react";
import { auth } from "../../firebase-config";
import "./Login.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  async function login() {
    if (emailRef.current.value && passwordRef.current.value) {
      console.log(emailRef, passwordRef);
      setLoading(true);
      try {
        await auth.signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );
      } catch (error) {
        window.alert("Ups! Nepodarilo sa prihlasit");
        console.error(error);
      }
      setLoading(false);
    }
  }

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
        <input
          type="submit"
          value="Login"
          disabled={loading}
          onClick={login}
        ></input>
      </form>
    </div>
  );
}

export default Login;
