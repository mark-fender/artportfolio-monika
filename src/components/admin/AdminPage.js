import { React, useState, useEffect, useRef } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../../firebase-config";
import "./AdminPage.css";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [paintingFile, setPaintingFile] = useState();
  const [exhibitionFile, setExhibitionFile] = useState();
  const [selectedSerie, setSelectedSerie] = useState();
  const seriesCollectionRef = collection(db, "series");
  const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"];
  const componentMounted = useRef(true);

  useEffect(() => {
    setLoading(true);
    if (componentMounted.current) {
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
    }
    setLoading(false);
    return () => {
      componentMounted.current = false;
    };
  }, []);

  async function logout() {
    await auth.signOut();
  }

  function setSelectedPaintingImage(e) {
    e.preventDefault();
    let selected = e.target.files[0];
    selected && allowedTypes.includes(selected.type)
      ? setPaintingFile(selected)
      : setPaintingFile(null);
  }

  function setSelectedExhibitionImage(e) {
    e.preventDefault();
    let selected = e.target.files[0];
    selected && allowedTypes.includes(selected.type)
      ? setExhibitionFile(selected)
      : setExhibitionFile(null);
  }

  function submitForm() {}

  return (
    <div className="formArea">
      <form>
        <div className="section">
          <h3>Bio</h3>
          <div className="formControl">
            <textarea type="text" id="bio"></textarea>
          </div>
        </div>
        <div className="section">
          <h3>Maľba</h3>
          <div className="formControl">
            <label htmlFor="paintingDescription">Popis maľby</label>
            <input type="text" id="paintingDescription"></input>
          </div>
          <div className="formControl">
            <label htmlFor="paintingSerie">Séria maľby</label>
            <input type="text" id="paintingSerie" list="series"></input>
            <datalist id="series">
              {series.map((serie) => {
                return (
                  <option onClick={setSelectedSerie} key={serie.id}>
                    {serie.name}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className="formControl">
            <label htmlFor="paintingFile">Fotka maľby</label>
            <input
              type="file"
              id="paintingFile"
              onChange={setSelectedPaintingImage}
            ></input>
          </div>
        </div>
        <div className="section">
          <h3>Výstava</h3>
          <div className="formControl">
            <label htmlFor="exhibitionName">Názov výstavy</label>
            <input type="text" id="exhibitionName"></input>
          </div>
          <div className="formControl">
            <label htmlFor="exhibitionFile">Plagát</label>
            <input
              type="file"
              id="exhibitionFile"
              onChange={setSelectedExhibitionImage}
            ></input>
          </div>
        </div>
      </form>
      <div className="buttonArea">
        <button className="logoutButton" onClick={logout} disabled={loading}>
          Odhlásiť sa
        </button>
        <button
          className="submitButton"
          onClick={submitForm}
          disabled={loading}
        >
          Nahrať
        </button>
      </div>
    </div>
  );
}
