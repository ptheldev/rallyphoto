import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
        <div className="header__logo">
            <div className="header__logo-main-text">Piotr Thel</div>
            <div className="header__logo-desc-text">Fotografia rajdowa</div>
            <Link to="/" className="header__logo-link"> </Link>
        </div>
        <div className="header__links">
            <a href="https://www.facebook.com/piotr.thel" aria-label="facebook" className="header__link" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" aria-hidden="true"></i> </a>
            <Link to="/kontakt" className="header__link" aria-current="page">KONTAKT</Link>
        </div>
    </header>
  );
}

export default Header;