import React, { useState, useEffect } from "react";
import { Search, MessageCircle, Users, Shield } from "lucide-react";
import "./Landing.css";
import api from "../../axios/axios";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [stats, setStats] = useState([
    { icon: MessageCircle, label: "Active Complaints", value: "Loading..." },
    { icon: Users, label: "Registered Users", value: "Loading..." },
    { icon: Shield, label: "Verified Brands", value: "Loading..." },
  ]);
  const [companies, setCompanies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [complaintsCount, usersCount, companiesCount] = await Promise.all(
          [
            api.get("/complaints/count"),
            api.get("/users/count"),
            api.get("/companies/count"),
          ]
        );

        setStats([
          {
            icon: MessageCircle,
            label: "Активни Поплаки",
            value: complaintsCount.data,
          },
          {
            icon: Users,
            label: "Регистрирани Корисници",
            value: usersCount.data,
          },
          {
            icon: Shield,
            label: "Верификувани Брендови",
            value: companiesCount.data,
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    api
      .get("/companies/pageable?page=0&size=6") // Fetch only 6 items
      .then((response) => {
        if (response && response.data.content) {
          setCompanies(response.data.content); // Set the fetched data
        }
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleNavigate = (id) => {
    navigate(`/brand/${id}`);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/complaints?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Изразете ги вашите грижи, најдете решенија</h1>
          <p>
            Поврзете се со брендови, решавајте проблеми и споделете ги вашите
            искуства
          </p>
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Побарај поплаки ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Барај</button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-wrapper">
        <div className="stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <stat.icon className="stat-icon" />
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="complaints">
        <h2>Неодамнешни Поплаки</h2>
        <div className="complaints-grid">
          {companies.map((company) => (
            <div
              key={company.id}
              className="brand-card"
              onClick={() => handleNavigate(company.id)}
            >
              <img
                src={`http://localhost:8080/uploads/logos/${company.logo}`}
                alt={`${company.name} logo`}
                className="brand-logo"
              />
              <h3 className="brand-name">{company.name}</h3>
              <p
                className="brand-stats"
                style={{ color: "orange", marginRight: "15px" }}
              >
                Вкупно поплаки: {company.totalComplaints}
              </p>
              {/* <p className="brand-stats">
                Решени поплаки: {company.totalResolvedComplaints}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
