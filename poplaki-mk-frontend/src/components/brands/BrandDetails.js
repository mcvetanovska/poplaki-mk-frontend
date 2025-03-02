import React, { useEffect, useState } from "react";
import api from "../../axios/axios";
import { useParams } from "react-router-dom";
import CustomContainer from "../customContainer/CustomContainer";
import Loader from "../../loader/Loader";

const BrandDetails = () => {
  const { id: brandId } = useParams();
  const [brand, setBrand] = useState();

  useEffect(() => {
    api
      .get(`/companies/${brandId}`)
      .then((data) => {
        if (data) {
          setBrand(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CustomContainer minHeight={90}>
      {brand ? (
        <div style={{ minHeight: "80vh" }}>
          <div className="container">
            <div className="complaints">
              <div className="d-flex justify-content-center align-items-center">
                <img src={brand.logo} alt={brand.logo} style={{ width: 150 }} />
                <h2 className="ml-4 mb-0">{brand.name}</h2>
              </div>
              <p>{brand.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </CustomContainer>
  );
};

export default BrandDetails;
