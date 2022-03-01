import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Gallery() {
  const [series, setSeries] = useState([]);
  const [paintings, setPaintings] = useState([]);

  const seriesCollectionRef = collection(db, "series");
  const paintingsCollectionRef = collection(db, "paintings");

  useEffect(() => {
    const getSeries = async () => {
      const series = await getDocs(seriesCollectionRef);
      setSeries(
        series.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    const getPaintings = async () => {
      const paintings = await getDocs(paintingsCollectionRef);
      setPaintings(
        paintings.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getSeries();
    getPaintings();
  }, []);

  return (
    <div className="Gallery">
      {series.map((serie) => {
        return <div key={serie.id}>{serie.name}</div>;
      })}

      {paintings.map((painting) => {
        return (
          <div key={painting.id}>
            {painting.description}
            <img src={painting.image}></img>
          </div>
        );
      })}
    </div>
  );
}
