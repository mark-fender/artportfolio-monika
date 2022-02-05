import { useEffect, useState } from "react";
import { db } from "./../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./App.css";

function App() {
  const [series, setSeries] = useState([]);
  const seriesCollectionRef = collection(db, "series");
  useEffect(() => {
    const getSeries = async () => {
      const series = await getDocs(seriesCollectionRef);
      setSeries(series.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })));
    }
    getSeries();
  }, []);
  return (
    <div className="App">
      {series.map((serie) => { 
        return <div>
          <span>Name: {serie.name}</span>
        </div>
      })}
    </div>
  );
}

export default App;
