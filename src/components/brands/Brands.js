import React, { useEffect, useState } from "react";
import "./Brands.css";
import api from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import CustomContainer from "../customContainer/CustomContainer";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Brands() {
  const navigate = useNavigate();
  const [brandsData, setBrandsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  useEffect(() => {
    fetchBrands(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const fetchBrands = (page, size) => {
    api
      .get(`/companies/pageable?page=${page}&size=${size}`)
      .then((data) => {
        if (data && data.data) {
          setBrandsData(data.data.content);
          setTotalPages(data.data.totalPages);
        }
      })
      .catch((err) => console.error("Error fetching brands:", err));
  };

  const handleNavigate = (id) => {
    navigate(`/brand/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const filteredBrands = brandsData.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CustomContainer>
      {brandsData.length === 0 ? (
        <CustomContainer minHeight={90}>
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        </CustomContainer>
      ) : (
        <div className="container brands-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="brands-grid">
            {filteredBrands.map((brand) => (
              <div
                className="brand-card"
                key={brand.id}
                onClick={() => handleNavigate(brand.id)}
              >
                <div className="brand-logo">
                  <img
                    src={`http://localhost:8080/uploads/logos/${brand.logo}`}
                    alt={`${brand.name} logo`}
                  />
                </div>
                <div className="brand-info">
                  <h3>{brand.name}</h3>
                  <div className="brand-rating">
                    <span className="brand-score">
                      <span style={{ color: "orange", marginRight: "15px" }}>
                        Вкупно: {brand.totalComplaints}
                      </span>
                      <span style={{ color: "green" }}>
                        Решени: {brand.totalResolvedComplaints}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-container">
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={handleChangePage}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
      )}
    </CustomContainer>
  );
}

export default Brands;
