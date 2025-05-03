import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate, Link } from "react-router-dom";

const Studentuniversities = ({ university }) => {
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  const Navigate = useNavigate();
  function handleApplyBtn() {
    Navigate("/AllUniversityStatus");

    alert(`You have applied to ${university.name}`);
  }

  return (
    <animated.div className="col-md-4 mb-4" style={animation}>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src={university.logo}
              alt={`${university.name} Logo`}
              className="rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                padding: "5px",
              }}
            />
            <h5 className="ml-3">{university.NAME}</h5>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center text-muted mb-2">
              {/* <i className="fas fa-map-marker-alt"></i> */}
              📬 <span>{university.location}</span>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="font-weight-bold">Popular Programs:</h6>
            <ul className="text-muted">
              {university.programs.map((program, index) => (
                <li key={index}>• {program}</li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <h6 className="font-weight-bold">Key Highlights:</h6>
            <ul className="text-muted">
              {university.highlights.map((highlight, index) => (
                <li key={index}>• {highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h6 className="font-weight-bold">Contact:</h6>
            <div className="text-muted">
              <p>
                {/* <i className="fas fa-phone mr-2"></i> */}
                📞 {university.contact.phone}
              </p>
              <p>
                {/* <i className="fas fa-envelope mr-2"></i> */}
                📧 {university.contact.email}
              </p>
            </div>
          </div>
          <Link to={"/university"} className="btn btn-primary w-100">
            Apply Now
          </Link>
        </div>
      </div>
    </animated.div>
  );
};

export default Studentuniversities;
