import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Gallery() {
  const [series, setSeries] = useState([]);
  const seriesCollectionRef = collection(db, "series");
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
    getSeries();
  }, []);
  return (
    <div className="Gallery">
      {series.map((serie) => {
        return <div></div>;
      })}
    </div>
  );
}

export default Gallery;
