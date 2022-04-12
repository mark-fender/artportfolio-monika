import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./Exhibitions.css";

export default function Exhibitions() {
  const exhibitionsCollectionRef = collection(db, "exhibitions");
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExhibitions();
  }, []);

  async function getExhibitions() {
    const exhibitions = await getDocs(exhibitionsCollectionRef);
    setExhibitions(
      exhibitions.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort(function (x, y) {
          return y.createdAt - x.createdAt;
        })
    );
    setLoading(false);
  }

  return (
    <div className="Exhibitions">
      <div className="exhibitions-wrapper">
        {!loading && exhibitions ? (
          exhibitions.map((exhibition) => {
            return (
              <div className="exhibition-content" key={exhibition.id}>
                <div className="exhibition-header">
                  <h2>{exhibition.name}</h2>
                  <hr />
                </div>
                <div className="exhibition-poster">
                  <img src={exhibition.image} alt="exhibition-poster"></img>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
