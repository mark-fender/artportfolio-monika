import { useRef, useState } from "react";
import { auth } from "../../firebase-config";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  async function login() {
    if (emailRef.current.value && passwordRef.current.value) {
      setLoading(true);
      try {
        await auth.signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        );
      } catch (error) {
        window.alert("Ups! Nepodarilo sa prihlásiť.");
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
          <label>E-mail</label>
        </div>
        <div className="textField">
          <input type="password" required ref={passwordRef}></input>
          <label>Heslo</label>
        </div>
        <input
          type="submit"
          value="Prihlásiť sa"
          disabled={loading}
          onClick={() => login()}
        ></input>
      </form>
    </div>
  );
}
