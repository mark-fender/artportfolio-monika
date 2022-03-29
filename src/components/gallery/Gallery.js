import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function Gallery() {
  const [series, setSeries] = useState([]);
  const seriesCollectionRef = collection(db, "series");
  const paintingsCollectionRef = collection(db, "paintings");

  useEffect(() => {
    const getSeries = async () => {
      const seriesDocs = await getDocs(seriesCollectionRef);
      let seriesMapped = [];
      seriesDocs.docs.forEach((doc) => {
        seriesMapped.push({ id: doc.id, ...doc.data() });
      });
      seriesMapped.forEach((s) => {
        const q = query(paintingsCollectionRef, where("serie", "==", s.id));
        onSnapshot(q, (snapshot) => {
          s.paintings = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        });
      });
      setSeries(
        seriesMapped.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
    };
    getSeries();
  }, []);

  return (
    <div className="Gallery">
      {series.map((serie) => {
        return <div key={serie.id}>{serie.name}</div>;
      })}
    </div>
  );
}
