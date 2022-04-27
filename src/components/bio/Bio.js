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
    <div className="Bio">
      <div className="bio-content">
        <div className="bio-text">
          {bioText}
          <div className="logo">
            <img src="assets/logo.webp" alt="logo" />
          </div>
        </div>
        <div className="chicken-photo">
          <img src="assets/chicken.webp" alt="portrait"></img>
        </div>
      </div>
    </div>
  );
}
