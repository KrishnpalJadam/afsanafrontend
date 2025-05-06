import React from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../Config";

const AdminUniversity = ({ university }) => {
  const role = localStorage.getItem("login");


  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  const programs = Array.isArray(university.programs) ? university.programs : [];
  const highlights = Array.isArray(university.highlights) ? university.highlights : [];


  const handleDeleteUniversity = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}universities/${id}`);
      console.log('Delete response:', response);
      alert("Deleted successfully. Please refresh this.");
      // After successful delete, filter out the deleted university from the list
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

  // Ensure the logo_url is being concatenated correctly
  // const imageUrl = `${BASE_URL}${university.logo_url}`;
  // console.log('Image URL:', imageUrl); 
  return (



    <animated.div className="col-md-4 mb-4" style={animation}>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src={`${university.logo_url}`}
              alt={`${university.name} Logo`}
              className="rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                padding: "5px",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-logo.png"; // Provide a default image if failed
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

          <Link to={"/university"} className="btn btn-primary w-100">
            Apply Now
          </Link>
          {role === "admin" && (
          <div>
            <Button variant="danger" onClick={() => handleDeleteUniversity(university.id)} className="mt-2 w-100">
              Delete
            </Button>
          </div>
          )}

        </div>
      </div>
    </animated.div>

  );
};

export default AdminUniversity;
