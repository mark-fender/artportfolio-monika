import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Bio from "./bio/Bio";
import Gallery from "./gallery/Gallery";
import Exhibitions from "./exhibitions/Exhibitions";
import Contact from "./contact/Contact";
import Login from "./login/Login";
import AdminPage from "./admin/AdminPage";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState("");

  function authListener() {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }

  useEffect(() => {
    auth.signInAnonymously();
    authListener();
  }, []);

  const ProtectedRoutes = () => {
    return user && !user.isAnonymous ? <AdminPage /> : <Login />;
  };

  return user === "" ? (
    <div></div>
  ) : (
    <Router>
      <div className="App">
        <Header className="Header" />
        <Routes>
          <Route path="/admin" element={<ProtectedRoutes />}></Route>
          <Route exact path="/" element={<Navigate replace to="/bio" />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <div className="signature-area">
          <span>
            Web by{" "}
            <a
              href="https://www.linkedin.com/in/marek-lip%C4%8D%C3%A1k/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marek Lipčák - LinkedIn
            </a>
          </span>
        </div>
      </div>
    </Router>
  );
}
