import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  function openSidebar() {
    const primaryNavigation = document.querySelector(".primary-navigation");
    primaryNavigation.classList.toggle("nav-active");
    const navLinks = document.querySelectorAll(".primary-navigation li");
    navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = ``)
        : (link.style.animation = `navigationFade 0.5s ease forwards ${
            index / 5 + 0.5
          }s`);
    });
    const burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.classList.toggle("toggle");
  }

  function onNavLinkClick(e) {
    document.querySelector(".active")?.classList?.remove("active");
    e.target.classList.add("active");
    e.target.focus();
  }

  return (
    <div className="Header">
      <nav>
        <div className="logo">
          <h1>Monika Hurajová</h1>
        </div>
        <ul className="primary-navigation">
          <li>
            <Link
              to="/bio"
              onClick={onNavLinkClick}
              className="navigation-link active"
            >
              Bio
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="navigation-link"
              onClick={onNavLinkClick}
            >
              Galéria
            </Link>
          </li>
          <li>
            <Link
              to="/exhibitions"
              className="navigation-link"
              onClick={onNavLinkClick}
            >
              Výstavy
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="navigation-link"
              onClick={onNavLinkClick}
            >
              Kontakt
            </Link>
          </li>
        </ul>
        <div className="burger-menu" onClick={openSidebar}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
}
