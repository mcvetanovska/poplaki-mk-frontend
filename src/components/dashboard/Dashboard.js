import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../../axios/axios";
import ComplaintCard from "../complaintCard/ComplaintCard";

function Dashboard() {
  const [active, setActive] = useState("complaints");
  const [brandsData, setBrandsData] = useState([]);
  const [complaintsData, setComplaintsData] = useState([]);

  useEffect(() => {
    api
      .get("/companies/pageable?page=0&size=10")
      .then((data) => {
        if (data) {
          setBrandsData(data.data.content);
        }
      })
      .catch((err) => console.log(err));
    api
      .get(
        "/admin/complaints/pageable?page=0&size=10&sortBy=createdOn&sortDirection=DESC&type=PENDING"
      )
      .then((data) => {
        if (data) {
          setComplaintsData(data.data.content);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-content container">
      {active === "complaints" ? (
        <div className="complaints-list p-0">
          <p style={{ color: "#000" }}>{complaintsData.length} поплаки</p>
          <div className="complaints">
            <ul className="p-0">
              {complaintsData.length > 0 ? (
                complaintsData.map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
              ) : (
                <p>Нема поплаки што одговараат на вашето пребарување.</p>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="brands-container">
          <p style={{ color: "#000" }}>{brandsData.length} брендови</p>
          {brandsData.map((brand) => (
            <div className="brand-card" key={brand.id}>
              <div style={{ minWidth: "80px" }}>
                <div className="brand-logo">
                  <img
                    src={`http://localhost:8080/uploads/logos/${brand.logo}`}
                    alt={`${brand.name} logo`}
                  />
                </div>
              </div>

              <div className="brand-info">
                <h3>{brand.name}</h3>
                <div>
                  <div className="brand-rating">
                    <span className="brand-score d-flex flex-lg-row flex-column">
                      <span className="text-orange mr-lg-3">
                        Вкупно: {brand.totalComplaints}
                      </span>
                      <span className="text-success">
                        Решени:{" "}
                        {brand.totalComplaints - brand.totalResolvedComplaints}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
