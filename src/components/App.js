import "./App.css";
import Gallery from "./gallery/Gallery";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header className="Header" />
      <div className="contentArea">
        <Gallery className="Gallery" />
      </div>
    </div>
  );
}

export default App;
