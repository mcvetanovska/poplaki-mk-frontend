import React, { useState, useEffect } from "react";
import "../complaints/Complaints.css";
import ComplaintCard from "../complaintCard/ComplaintCard";
import api from "../../axios/axios";
import CustomContainer from "../customContainer/CustomContainer";

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api
      .get("/profile/complaints/pageable")
      .then((data) => {
        if (data) {
          setComplaints(data.data.content);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CustomContainer>
      <div className="complaints-list p-0">
        <div className="complaints pt-3">
          <ul className="p-0">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            ) : (
              <p>Немате поплаки.</p>
            )}
          </ul>
        </div>
      </div>
    </CustomContainer>
  );
}

export default Complaints;
