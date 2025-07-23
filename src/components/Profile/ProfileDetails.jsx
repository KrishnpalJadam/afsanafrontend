import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaClock, FaUserShield, FaCalendarAlt } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const statistics = [
  {
    value: 165,
    label: "Enquiries",
    description: "Total number of enquiries received",
    bgColor: "bg-dark text-white",
  },
  {
    value: 7,
    label: "Profiles Created",
    description: "Total number of profiles created",
    bgColor: "bg-danger text-white",
  },
  {
    value: 4,
    label: "Applications Submitted",
    description: "Total number of applications submitted",
    bgColor: "bg-warning text-white",
  },
  {
    value: 57.14,
    label: "Current Conversion Rate",
    description: "Rate of profiles against applications submitted",
    bgColor: "bg-success text-white",
  },
  {
    value: 0,
    label: "Unassigned Applications",
    description: "Applications that have not been assigned",
    bgColor: "bg-primary text-white",
  },
];

const ProfileDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-4"  >
      {/* back button */}
      <div className="border-black d-flex justify-content-end">
        <button
          onClick={() => navigate(-1)}
          className="px-3 rounded bg-light text-dark border border-dark btn-custom"
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </div>
      <div className="row align-items-center justify-content-center">
        {/* User Profile Section */}
        <div className="col-lg-5 col-md-6 d-flex align-items-center flex-column text-center text-md-start">
          <img
            src="data:image/jpeg;base64,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"
            alt="User"
            className="rounded-circle mb-3"
            style={{
              border: "1px solid gray",
              height: "150px",
              width: "150px",
            }}
          />
          <div>
            <h4 className="text-center">Jane Smith</h4>
            <p>
              <FaUser className="me-2" /> <strong>Logged in as:</strong>{" "}
              john.doe@example.com
            </p>
            <p>
              <FaClock className="me-2" /> <strong>Last logged in on:</strong>{" "}
              Wed 2nd of Sep 2020 01:30:50 PM
            </p>
            <p>
              <FaUserShield className="me-2" /> <strong>Account Level:</strong>{" "}
              System Admin
            </p>
            <p>
              <FaCalendarAlt className="me-2" />{" "}
              <strong>Current recruitment cohort:</strong> 2020
            </p>
          </div>
        </div>

        {/* Search Box Section */}
        <div className="col-lg-5 col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Quick Global Search</h5>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search applicants by first name, surname or e-mail address"
              />
              <button className="btn btn-danger">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>
            <FaTrophy className="me-2" /> Key Platform Statistics
          </h4>
          <div>
            <label className="me-2 fw-bold">Selected Cohort:</label>
            <select className="form-select d-inline-block w-auto">
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </select>
          </div>
        </div>

        <div className="row">
          {statistics.map((stat, index) => (
            <div className="col-md-2 col-sm-6 mb-3" key={index}>
              <div
                className={`card p-3 shadow-sm text-center  ${stat.bgColor}`}
                style={{ height: "200px" }}
              >
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="mb-0 fw-bold">{stat.label}</p>
                <small>{stat.description}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;