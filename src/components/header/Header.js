import "./Header.css";

function Header() {
  function openSidebar() {
    const primaryNavigation = document.querySelector(".primary-navigation");
    primaryNavigation.classList.toggle("nav-active");
    const navLinks = document.querySelectorAll(".primary-navigation li");
    navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = ``)
        : (link.style.animation = `navigationFade 0.5s ease forwards ${
            index / 7 + 0.5
          }s`);
    });
    const burgerMenu = document.querySelector(".burger-menu");
    burgerMenu.classList.toggle("toggle");
  }

  return (
    <div className="Header">
      <nav>
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <ul className="primary-navigation">
          <li>
            <a href="" className="navigation-link">
              Bio
            </a>
          </li>
          <li>
            <a href="" className="navigation-link">
              Galéria
            </a>
          </li>
          <li>
            <a href="" className="navigation-link">
              Výstavy
            </a>
          </li>
          <li>
            <a href="" className="navigation-link">
              Kontakt
            </a>
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

export default Header;
