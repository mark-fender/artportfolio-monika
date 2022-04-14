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
      <div className="bio-text">{bioText}</div>
      <div className="signature">
        <img src="assets/logo.webp" alt="signature"/>
      </div>
    </div>
  );
}
