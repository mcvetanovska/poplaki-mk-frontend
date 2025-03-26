import React from "react";
import "../complaintCard/ComplaintCard.css"; // Reuse ComplaintCard styles
import { useNavigate } from "react-router-dom";

function UserProfileComplaintCard({ complaint }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div className="complaint-card mb-3">
        <div
          onClick={() => {
            navigate(`/complaints/${complaint.id}`);
          }}
        >
          <div className="text-left"></div>
          <div className="complaint-meta"></div>
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
        <p
          style={{
            color:
              complaint.statusType === "PENDING"
                ? "orange"
                : complaint.statusType === "ACCEPTED"
                ? "green"
                : "red",
            textAlign: "right",
          }}
        >
          Status: {complaint.statusType}
        </p>
      </div>
    </div>
  );
}

export default UserProfileComplaintCard;
