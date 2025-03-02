import React, { useEffect, useState } from "react";
import "../complaints/Complaints.css";
import { useParams } from "react-router-dom";
import api from "../../axios/axios";
import CustomContainer from "../customContainer/CustomContainer";
import Loader from "../../loader/Loader";

function ComplaintsDetails() {
  const [complaint, setComplaint] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/complaints/${id}`)
      .then((res) => {
        setComplaint(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <CustomContainer minHeight={90}>
      {complaint ? (
        <div className="complaints d-flex justify-content-center align-items-start flex-column">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img
              src={complaint.company.logo}
              alt={`${complaint.company.logo} logo`}
              style={{ width: 80 }}
            />
            {complaint.company.name}
          </div>
          <div>
            <h2 className="m-0">{complaint.title}</h2>
            <p>{complaint.description}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </CustomContainer>
  );
}

export default ComplaintsDetails;
