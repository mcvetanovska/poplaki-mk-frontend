import React, { useEffect, useState } from "react";
import "./Brands.css";
import api from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
import CustomContainer from "../customContainer/CustomContainer";

function Brands() {
  const navigate = useNavigate();
  const [brandsData, setBrandsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);

  const fetchBrands = (page) => {
    api
      .get(`/companies/pageable?page=${page}&size=10`)
      .then((data) => {
        if (data) {
          setBrandsData(data.data.content);
          setTotalPages(data.data.totalPages);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleNavigate = (id) => {
    navigate(`/brand/${id}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
            />
          </div>

          {filteredBrands.map((brand) => (
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
            </div>
          ))}

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </CustomContainer>
  );
}

export default Brands;
