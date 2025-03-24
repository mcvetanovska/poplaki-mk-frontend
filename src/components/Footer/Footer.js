import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>За нас</h2>
        <p>
          Ние обезбедуваме платформа за потрошувачите да ги искажат своите
          загрижености и да се поврзат со брендовите за решавање на проблемите.
        </p>
      </div>
      <div className="footer-bottom">
        <p>© 2025 POPLAKI.MK Сите права задржани.</p>
      </div>
    </footer>
  );
};

export default Footer;
