import React from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiHome, FiRefreshCw } from "react-icons/fi";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <FiAlertCircle size={64} className="icon-red" />
        </div>
        <h1 className="error-title">Упс! Нешто тргна наопаку</h1>
        <p className="error-message">
        Не можевме да ја обработиме вашата барање. Страницата можеби е привремено
        недостапна или не постои.
        </p>
        <div className="error-actions">
          <Link to="/" className="action-button home">
            <FiHome size={20} /> Назад на Почетна
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="action-button retry"
          >
            <FiRefreshCw size={20} /> Обиди се повторно
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;