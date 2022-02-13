import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./header/Header";
import Bio from "./bio/Bio";
import Gallery from "./gallery/Gallery";
import Exhibitions from "./exhibitions/Exhibitions";
import Contact from "./contact/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Header className="Header" />
        <Routes>
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
