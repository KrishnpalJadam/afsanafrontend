import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import Swal from "sweetalert2";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const UniversityCards = () => {
  const [universities, setUniversities] = useState([]);
  const role = localStorage.getItem("login"); // To check if the user is an admin
  
  // Spring animation for the cards
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  // Fetch universities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data); // Set fetched universities to state
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);

  // Handle delete action for university
  const handleDeleteUniversity = async (id) => {
    try {
      const response = await api.delete(`${BASE_URL}universities/${id}`);
      Swal.fire({
        title: "Deleted Successfully!",
        text: "The university has been deleted.",
        icon: "success",
        confirmButtonText: "Close",
      });
      // Filter out the deleted university from the list
      setUniversities((prevUniversities) =>
        prevUniversities.filter((university) => university.id !== id)
      );
    } catch (error) {
      console.error("Error deleting university:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="text-center ">Top International Universities</h2>
      </div>
      <div className="row mt-4">
        {universities.length > 0 ? (
          universities.map((university, index) => {
            const programs = Array.isArray(university.programs) ? university.programs : [];
            const highlights = Array.isArray(university.highlights) ? university.highlights : [];

            return (
              <animated.div key={index} className="col-md-4 mb-4" style={animation}>
                <div className="card shadow-sm" style={{ height: "450px" }}>
                  <div className="card-body"
                   style={{
        maxHeight: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
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
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          padding: "5px",
                        }}
                        crossorigin="anonymous"
                        onError={(e) => {
                          e.target.onerror = null;
                          // e.target.src = "default-logo.png";
                        }}
                      />
                      <h5 className="ml-3">{university.name}</h5>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center text-muted mb-2">
                        📬 <span>{university.location}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h6 className="font-weight-bold">Popular Programs:</h6>
                      <ul className="text-muted">
                        {programs.length > 0 ? (
                          programs.map((program, index) => (
                            <li key={index}>• {program}</li>
                          ))
                        ) : (
                          <li>No programs available</li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <h6 className="font-weight-bold">Key Highlights:</h6>
                      <ul className="text-muted">
                        {highlights.length > 0 ? (
                          highlights.map((highlight, index) => (
                            <li key={index}>• {highlight}</li>
                          ))
                        ) : (
                          <li>No highlights available</li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h6 className="font-weight-bold">Contact:</h6>
                      <div className="text-muted">
                        <p>📞 {university.contact_phone || 'N/A'}</p>
                        <p>📧 {university.contact_email || 'N/A'}</p>
                      </div>
                    </div>
                    {
                      (role == "student" || role == "counselor")
                        ?
                        <Link to={`/university/${university.id}`} className="btn btn-primary w-100">
                          Apply Now
                        </Link>
                        :
                        <Link to={"/login"} className="btn btn-primary w-100">
                          Apply Now
                        </Link>
                    }
                    {role === "admin" && (
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUniversity(university.id)}
                          className="mt-2 w-100"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
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

export default UniversityCards;
