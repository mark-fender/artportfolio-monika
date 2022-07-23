import "./Contact.css";
import { observeFadeInElements } from "../../utils/observers";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    observeFadeInElements(1);
  });

  return (
    <main className="Contact">
      <div className="contact-content fade-in">
        <div className="contact-type">
          <img src="assets/mail.webp" alt="contact-type-icon" />
          <a href="mailto:mh.hurajova@gmail.com" className="contact-type-title">
            mh.hurajova@gmail.com
          </a>
        </div>
        <div className="contact-type">
          <img src="assets/insta.webp" alt="contact-type-icon" />
          <a
            href="https://www.instagram.com/m.hurajova_art"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-type-title"
          >
            m.hurajova_art
          </a>
        </div>
        <div className="contact-type">
          <img src="assets/phone.webp" alt="contact-type-icon" />
          <span className="contact-type-title">+421 919 406 655</span>
        </div>
      </div>
    </main>
  );
}
