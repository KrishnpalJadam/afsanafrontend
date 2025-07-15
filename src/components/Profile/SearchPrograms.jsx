import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const SearchPrograms = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Spring animation
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data);
        setFilteredUniversities(response.data);
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);

  // Unique university names and locations for select options
  const universityNames = [...new Set(universities.map(u => u.name))];
  const locations = [...new Set(universities.map(u => u.location))];

  // Handle filtering
  useEffect(() => {
    let filtered = universities;

    if (selectedUniversity) {
      filtered = filtered.filter(u => u.name === selectedUniversity);
    }

    if (selectedLocation) {
      filtered = filtered.filter(u => u.location === selectedLocation);
    }

    setFilteredUniversities(filtered);
  }, [selectedUniversity, selectedLocation, universities]);

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="text-center">Search Programs & Schools</h2>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <Form.Group controlId="selectUniversity">
            <Form.Label>Select University</Form.Label>
            <Form.Select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="">All Universities</option>
              {universityNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group controlId="selectLocation">
            <Form.Label>Select Location</Form.Label>
            <Form.Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((university, index) => {
            const programs = Array.isArray(university.programs) ? university.programs : [];
            const highlights = Array.isArray(university.highlights) ? university.highlights : [];

            return (
          <animated.div key={index} className="col-md-4 mb-4" style={animation}>
  <div className="card shadow-sm" style={{ height: "450px" }}>
    <div
      className="card-body"
      style={{
        maxHeight: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}
    >
      <style>
        {`
          .card-body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="d-flex align-items-center mb-4">
        <img
          src={university.logo_url}
          alt={`${university.name} Logo`}
          className="rounded-circle"
          crossOrigin="anonymous"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            padding: "5px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-logo.png";
          }}
        />
        <h5 className="ml-3">{university.name}</h5>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center text-muted mb-2">
          📬 <span className="ml-2">{university.location}</span>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="font-weight-bold">Popular Programs:</h6>
        <ul className="text-muted">
          {programs.length > 0 ? (
            programs.map((program, idx) => <li key={idx}>• {program}</li>)
          ) : (
            <li>No programs available</li>
          )}
        </ul>
      </div>

      <div className="mb-3">
        <h6 className="font-weight-bold">Key Highlights:</h6>
        <ul className="text-muted">
          {highlights.length > 0 ? (
            highlights.map((highlight, idx) => <li key={idx}>• {highlight}</li>)
          ) : (
            <li>No highlights available</li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h6 className="font-weight-bold">Contact:</h6>
        <div className="text-muted">
          <p>📞 {university.contact_phone || "N/A"}</p>
          <p>📧 {university.contact_email || "N/A"}</p>
        </div>
      </div>

      <Link
        to={`/university/${university.id}`}
        className="btn btn-primary w-100"
      >
        Apply Now
      </Link>
    </div>
  </div>
</animated.div>


            );
          })
        ) : (
          <p>No universities available</p>
        )}
      </div>
    </div>
  );
};

export default SearchPrograms;
