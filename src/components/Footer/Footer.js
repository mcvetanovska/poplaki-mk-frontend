import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>За нас</h3>
            <p>
              Ние обезбедуваме платформа за потрошувачите да ги искажат своите
              загрижености и да се поврзат со брендовите за решавање на
              проблемите.
            </p>
            <br></br>
            <ul>
              <li>
                <Link to="/file-complaint">Додај поплака</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 POPLAKI.MK Сите права задржани.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
