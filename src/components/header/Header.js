import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  function toggleSidebar() {
    const primaryNavigation = document.querySelector(".primary-navigation");
    primaryNavigation.classList.toggle("nav-active");
    const navLinks = document.querySelectorAll(".primary-navigation li");
    navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = ``)
        : (link.style.animation = `navigationFade 0.5s ease forwards ${
            index / 5 + 0.35
          }s`);
    });
    const burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.classList.toggle("toggle");
  }

  function onNavLinkClick(e) {
    document.querySelector(".active")?.classList?.remove("active");
    e.target.classList.add("active");
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) toggleSidebar();
      },
      { threshold: [0] }
    );
    observer.observe(document.querySelector(".burger-menu"));
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
              className={
                window.location.pathname === "/bio" ||
                window.location.pathname === "/"
                  ? "navigation-link active"
                  : "navigation-link"
              }
            >
              Bio
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className={
                window.location.pathname === "/gallery"
                  ? "navigation-link active"
                  : "navigation-link"
              }
              onClick={onNavLinkClick}
            >
              Galéria
            </Link>
          </li>
          <li>
            <Link
              to="/exhibitions"
              className={
                window.location.pathname === "/exhibitions"
                  ? "navigation-link active"
                  : "navigation-link"
              }
              onClick={onNavLinkClick}
            >
              Výstavy
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={
                window.location.pathname === "/contact"
                  ? "navigation-link active"
                  : "navigation-link"
              }
              onClick={onNavLinkClick}
            >
              Kontakt
            </Link>
          </li>
        </ul>
        <div className="burger-menu" onClick={toggleSidebar}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
}
