import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { observeFadeInElements } from "../../utils/observers";
import "./Bio.css";

export default function Bio() {
  const [bioText, setBioText] = useState("");

  useEffect(() => {
    getBio();
  }, []);

  async function getBio() {
    const bio = await getDoc(doc(db, "bio", "0"));
    if (bio.exists()) {
      setBioText(bio.data().bioText);
    }
  }

  useEffect(() => {
    observeFadeInElements();
  });

  return (
    <main className="Bio">
      {bioText && (
        <div className="bio-content fade-in">
          <article className="bio-text">
            {bioText}
            <div className="logo">
              <img src="assets/logo.webp" alt="logo" />
            </div>
          </article>
          <div className="chicken-photo">
            <img src="assets/chicken.webp" alt="portrait"></img>
          </div>
        </div>
      )}
    </main>
  );
}
