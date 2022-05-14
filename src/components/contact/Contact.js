import "./Contact.css";

export default function Contact() {
  return (
    <div className="Contact">
      <div className="contact-content">
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
    </div>
  );
}
