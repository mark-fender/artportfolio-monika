import { React, useState, useEffect, useRef } from "react";
import { db, storage } from "../../firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "../../firebase-config";
import "./AdminPage.css";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);

  const paintingDescription = useRef();
  const [paintingFile, setPaintingFile] = useState();
  const paintingSerie = useRef();

  const [exhibitionFile, setExhibitionFile] = useState();

  const seriesCollectionRef = collection(db, "series");
  const paintingsCollectionRef = collection(db, "paintings");
  const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"];
  const componentMounted = useRef(true);

  useEffect(() => {
    if (componentMounted.current) {
      setLoading(true);
      getSeries();
      setLoading(false);
    }
    return () => {
      componentMounted.current = false;
    };
  }, []);

  async function getSeries() {
    const series = await getDocs(seriesCollectionRef);
    setSeries(
      series.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }

  async function logout() {
    await auth.signOut();
  }

  function setSelectedPaintingImage(e) {
    e.preventDefault();
    e.target.files[0] && allowedTypes.includes(e.target.files[0].type)
      ? setPaintingFile(e.target.files[0])
      : setPaintingFile(null);
  }

  function setSelectedExhibitionImage(e) {
    e.preventDefault();
    e.target.files[0] && allowedTypes.includes(e.target.files[0].type)
      ? setExhibitionFile(e.target.files[0])
      : setExhibitionFile(null);
  }

  async function submitForm() {
    setLoading(true);
    uploadNewPainting();
    setLoading(false);
  }

  async function uploadNewPainting() {
    if (paintingDescription.current.value && paintingFile) {
      const storageRef = storage.ref(paintingFile.name);
      await storageRef.put(paintingFile);
      const url = await storageRef.getDownloadURL();
      const selectedSerie = series.find(
        (serie) => serie.name === paintingSerie.current.value
      );
      const createdAt = new Date().getTime();
      if (!selectedSerie && paintingSerie.current.value) {
        const q = query(
          seriesCollectionRef,
          where("name", "==", paintingSerie.current.value)
        );
        let newSerie;
        onSnapshot(q, (snapshot) => {
          newSerie = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))[0];
        });
        await setDoc(doc(seriesCollectionRef), {
          name: paintingSerie.current.value,
          createdAt,
        });
        try {
          await setDoc(doc(paintingsCollectionRef), {
            description: paintingDescription.current.value,
            serie: newSerie.id,
            image: url,
            createdAt,
          });
          window.alert("Úspešne nahrané. To je krása! 😍");
        } catch (error) {
          console.error(error);
          window.alert("Nahrávanie zlyhalo 😔");
        }
      } else {
        try {
          await setDoc(doc(paintingsCollectionRef), {
            description: paintingDescription.current.value,
            serie: selectedSerie.id,
            image: url,
            createdAt,
          });
          window.alert("Úspešne nahrané. To je krása! 😍");
        } catch (error) {
          console.error(error);
          window.alert("Nahrávanie zlyhalo 😔");
        }
      }
    }
    document.querySelectorAll("input").forEach((input) => (input.value = null));
    getSeries();
  }

  return (
    <div className="formArea">
      <form disabled={loading}>
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
            <input
              type="text"
              id="paintingDescription"
              ref={paintingDescription}
            ></input>
          </div>
          <div className="formControl">
            <label htmlFor="paintingSerie">Séria maľby</label>
            <input
              type="text"
              id="paintingSerie"
              ref={paintingSerie}
              list="series"
            ></input>
            <datalist id="series">
              {series.map((serie) => {
                return <option key={serie.id}>{serie.name}</option>;
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
