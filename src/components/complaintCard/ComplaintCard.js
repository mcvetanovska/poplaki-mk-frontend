import React from "react";
import "./ComplaintCard.css";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";

function ComplaintCard({ complaint, status }) {
  const navigate = useNavigate();
  const handleAccept = (id) => {
    api
      .put(`/admin/complaints/${id}?type=ACCEPTED`)
      .then((res) => {
        if (res.status == 202) {
          alert("Поплаката е прифатена!");
          navigate("/complaints");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDecline = (id) => {
    api
      .put(`/admin/complaints/${id}?type=DECLINED`)
      .then((res) => {
        if (res.status == 202) {
          alert("Поплаката е одбиена!");
          navigate("/complaints");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div className="complaint-card mb-3">
        <div
          onClick={() => {
            navigate(`/complaints/${complaint.id}`);
          }}
        >
          {/* <h2>{complaint.title}</h2> */}
          <div className="text-left"></div>
          <div className="complaint-meta">
            <span>
              <img
                src={`http://localhost:8080/uploads/logos/${complaint.company.logo}`}
                alt={`${complaint.company.name} logo`}
                style={{ width: 50 }}
              />
              → {complaint?.company?.name}
            </span>
          </div>
          <h4 style={{ color: "black" }}>
            {complaint.title.charAt(0).toUpperCase() + complaint.title.slice(1)}
          </h4>
          <p style={{ color: "black" }}>{complaint.description}</p>
        </div>
        {complaint.statusType == "PENDING" &&
          window.location.href.includes("dashboard") && (
            <div className="button-container">
              <button
                className="dashboard-specific-button accept-button"
                onClick={() => handleAccept(complaint.id)}
              >
                Прифати поплака
              </button>
              <button
                className="dashboard-specific-button decline-button"
                onClick={() => handleDecline(complaint.id)}
              >
                Одби поплака
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default ComplaintCard;
