import React, { useCallback, useEffect, useState } from "react";
import "./FileComplaint.css";
import api from "../../axios/axios";
import { useNavigate } from "react-router-dom";

function FileComplaint() {
  const navigate = useNavigate();
  const [brandsData, setBrandsData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    companyId: "",
    description: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetInputs = () => {
    setFormData({
      title: "",
      companyId: "",
      description: "",
    });
  };

  const postNewComplaint = useCallback(() => {
    api
      .post("/complaints", formData)
      .then((data) => console.log("API Response:", data))
      .catch((err) => console.log("API Error:", err));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.companyId && formData.description) {
      postNewComplaint();
      resetInputs();
      navigate("/complaints");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Додај поплака</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Наслов"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select
          className="form-input dropdown-select w-100"
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required>
          <option value="" disabled>
            Изберете бренд
          </option>
          {brandsData.map((brand, index) => (
            <option key={`${brand.id}-${index}`} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <textarea
          className="form-textarea"
          name="description"
          placeholder="Опис"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button className="form-button" type="submit">
          Испрати поплака
        </button>
      </form>
    </div>
  );
}

export default FileComplaint;
