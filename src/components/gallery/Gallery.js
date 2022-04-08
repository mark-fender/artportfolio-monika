import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, orderBy } from "firebase/firestore";
import "./Gallery.css";

export default function Gallery() {
  const [series, setSeries] = useState([]);
  const seriesCollectionRef = collection(db, "series");
  const paintingsCollectionRef = collection(db, "paintings");
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");
  const [zoomImgDescription, setZoomImgDescription] = useState("");

  useEffect(() => {
    getSeries();
  }, []);

  async function getSeries() {
    const seriesDocs = await getDocs(seriesCollectionRef);
    const paintingsDocs = await getDocs(paintingsCollectionRef);
    if (seriesDocs && paintingsDocs) {
      let seriesMapped = seriesDocs.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort(function (x, y) {
          return y.createdAt - x.createdAt;
        });
      let paintingsMapped = paintingsDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      mapPaintingsToSeries(seriesMapped, paintingsMapped);
      setSeries(seriesMapped);
    }
    setLoading(false);
  }

  function mapPaintingsToSeries(series, paintings) {
    series.forEach((serie) => {
      serie.paintings = paintings
        .filter((painting) => painting.serie === serie.id)
        .sort(function (x, y) {
          return y.createdAt - x.createdAt;
        });
    });
  }

  function getZoomedImage(imageSrc, description) {
    setTempImgSrc(imageSrc);
    setZoomImgDescription(description);
    setModel(true);
  }

  return (
    <>
      <div className={model ? "model open" : "model"}>
        {model ? <img className="zoom-image" src={tempImgSrc}></img> : <></>}
        <div className="model-description">
          <span>{zoomImgDescription}</span>
          <img
            className="close-icon"
            src="assets/close.webp"
            onClick={() => setModel(false)}
          ></img>
        </div>
      </div>
      <div className="Gallery">
        {!loading && series ? (
          series.map((serie) => {
            return (
              <div className="serie-content" key={serie.id}>
                <div className="serie-header">
                  <h2>{serie.name}</h2>
                  <hr />
                </div>
                <div className="paintings-img-grid">
                  {serie.paintings &&
                    serie.paintings.map((painting) => {
                      return (
                        <div
                          key={painting.id}
                          className="painting-wrapper"
                          onClick={() =>
                            getZoomedImage(painting.image, painting.description)
                          }
                        >
                          <img
                            src={painting.image}
                            alt={painting.description}
                            className="painting-image"
                          ></img>
                          <div className="description-wrapper">
                            <span className="description">
                              {painting.description}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
