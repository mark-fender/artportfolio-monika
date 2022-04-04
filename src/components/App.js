import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Outlet,
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
    authListener();
  }, []);

  const ProtectedRoutes = () => {
    return user ? <Outlet /> : <Login />;
  };

  return user === "" ? (
    <div></div>
  ) : (
    <Router>
      <div className="App">
        <Header className="Header" />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Route>
          <Route exact path="/" element={<Navigate replace to="/bio" />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
