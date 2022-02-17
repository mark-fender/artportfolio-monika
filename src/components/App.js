import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Bio from "./bio/Bio";
import Gallery from "./gallery/Gallery";
import Exhibitions from "./exhibitions/Exhibitions";
import Contact from "./contact/Contact";
import Login from "./login/Login";
import AdminPage from "./admin/AdminPage";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  return useAuth() ? <Outlet /> : <Login />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header className="Header" />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Route>
          <Route path="/" element={<Bio />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Bio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
