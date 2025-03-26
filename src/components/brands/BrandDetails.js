import React, { useEffect, useState } from "react";
import api from "../../axios/axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import CustomContainer from "../customContainer/CustomContainer";
import Loader from "../../loader/Loader";
import TablePagination from "@mui/material/TablePagination";

const BrandDetails = () => {
  const { id: brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/companies/${brandId}`)
      .then((data) => {
        if (data) {
          setBrand(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [brandId]);

  useEffect(() => {
    if (brandId) {
      api
        .get(`/complaints/pageable/company/${brandId}`)
        .then((response) => {
          if (response.data) {
            setComplaints(response.data.content);
            setTotalComplaints(response.data.totalElements);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [brandId, currentPage, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div
      className="d-flex justify-content-start align-items-center"
      style={{
        width: "80%",
        margin: "0 auto",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      {brand ? (
        <div className="brand-details-container">
          <div className="container">
            <div className="brand-header mb-4">
              <div className="d-flex justify-content-start align-items-center header-logo">
                <img
                  src={`http://localhost:8080/uploads/logos/${brand.logo}`}
                  alt={brand.logo}
                />
              </div>
              <h2 className="brand-details-name">{brand.name}</h2>
            </div>

            <div className="complaints-list">
              <h3>Поплаки</h3>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="complaint-card"
                    onClick={() => navigate(`/complaints/${complaint.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <h4>{complaint.title}</h4>
                    <p>{complaint.description}</p>
                  </div>
                ))
              ) : (
                <p>Нема поплаки за овај бренд.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BrandDetails;
