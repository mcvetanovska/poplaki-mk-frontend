import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../complaints/Complaints.css";
import ComplaintCard from "../complaintCard/ComplaintCard";
import api from "../../axios/axios";
import CustomContainer from "../customContainer/CustomContainer";
import Loader from "../../loader/Loader";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract searchQuery from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";

  // Fetch complaints on initial render
  useEffect(() => {
    setLoading(true);
    api
      .get(
        "/complaints/pageable?page=0&size=10&sortBy=createdOn&sortDirection=DESC&type=ACCEPTED"
      )
      .then((response) => {
        if (response?.data?.content) {
          setComplaints(response.data.content);
          setFilteredComplaints(response.data.content); // Set initial filtered data to all complaints
        }
      })
      .catch((err) => console.error("Error fetching complaints:", err))
      .finally(() => setLoading(false));
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Show all complaints if search query is empty
      setFilteredComplaints(complaints);
      return;
    }

    setLoading(true);
    api
      .get(`/complaints/search?page=0&size=10&title=${searchQuery}`)
      .then((res) => {
        if (res?.data?.content) {
          setFilteredComplaints(res.data.content);
        }
      })
      .catch((err) => console.error("Error during search:", err))
      .finally(() => setLoading(false));
  }, [searchQuery, complaints]);

  // Handle search input and update URL query
  const handleSearch = (e) => {
    const value = e.target.value;
    navigate(`?query=${value}`);

    // If input is empty, reset the filtered complaints immediately
    if (value.trim() === "") {
      setFilteredComplaints(complaints);
    }
  };

  return (
    <CustomContainer>
      <div className="complaints-list">
        <div className="complaints">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Барај поплака"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Complaints List */}
          {loading ? (
            <CustomContainer>
              <Loader />
            </CustomContainer>
          ) : (
            <ul className="p-0">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
              ) : (
                <p>Нема поплаки што одговараат на вашето пребарување.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </CustomContainer>
  );
}

export default Complaints;
