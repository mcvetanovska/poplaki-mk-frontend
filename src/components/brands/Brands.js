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

  useEffect(() => {
    api
      .get("/companies/pageable?page=0&size=10")
      .then((data) => {
        if (data) {
          setBrandsData(data.data.content);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredBrands = brandsData.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (id) => {
    navigate(`/brand/${id}`);
  };

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
                  <img src={brand.logo} alt={`${brand.name} logo`} />
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
        </div>
      )}
    </CustomContainer>
  );
}

export default Brands;
