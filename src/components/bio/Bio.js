import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
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

  return (
    <main className="Bio">
      <div className="bio-content">
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
    </main>
  );
}
