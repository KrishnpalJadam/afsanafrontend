import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell, FaClock, FaCalendarCheck } from "react-icons/fa";

// Sample data for applicants and their progress
const initialApplicants = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    stage: "Application Submitted",
  },
  { id: 2, name: "Bob Smith", email: "bob@example.com", stage: "Under Review" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    stage: "Interview Scheduled",
  },
  { id: 4, name: "David Lee", email: "david@example.com", stage: "Accepted" },
  { id: 5, name: "Emily Davis", email: "emily@example.com", stage: "Rejected" },
  {
    id: 6,
    name: "Alice Johnson",
    email: "alice@example.com",
    stage: "Application Submitted",
  },
  { id: 7, name: "Bob Smith", email: "bob@example.com", stage: "Under Review" },
  {
    id: 8,
    name: "Charlie Brown",
    email: "charlie@example.com",
    stage: "Interview Scheduled",
  },
  { id: 9, name: "David Lee", email: "david@example.com", stage: "Accepted" },
  {
    id: 10,
    name: "Emily Davis",
    email: "emily@example.com",
    stage: "Rejected",
  },
  {
    id: 11,
    name: "Alice Johnson",
    email: "alice@example.com",
    stage: "Application Submitted",
  },
  {
    id: 12,
    name: "Bob Smith",
    email: "bob@example.com",
    stage: "Under Review",
  },
  {
    id: 13,
    name: "Charlie Brown",
    email: "charlie@example.com",
    stage: "Interview Scheduled",
  },
  { id: 14, name: "David Lee", email: "david@example.com", stage: "Accepted" },
  {
    id: 15,
    name: "Emily Davis",
    email: "emily@example.com",
    stage: "Rejected",
  },
  {
    id: 16,
    name: "Alice Johnson",
    email: "alice@example.com",
    stage: "Application Submitted",
  },
  {
    id: 17,
    name: "Bob Smith",
    email: "bob@example.com",
    stage: "Under Review",
  },
  {
    id: 18,
    name: "Charlie Brown",
    email: "charlie@example.com",
    stage: "Interview Scheduled",
  },
  { id: 19, name: "David Lee", email: "david@example.com", stage: "Accepted" },
  {
    id: 20,
    name: "Emily Davis",
    email: "emily@example.com",
    stage: "Rejected",
  },
];

// Application stages in order
const stages = [
  "Application Submitted",
  "Under Review",
  "Interview Scheduled",
  "Final Decision Pending",
  "Accepted",
  "Rejected",
];

function AdmissionTracking() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [searchTerm, setSearchTerm] = useState("");

  // Move applicant to the next stage
  const moveToNextStage = (id) => {
    setApplicants((prev) =>
      prev.map((applicant) => {
        if (applicant.id === id) {
          const currentStageIndex = stages.indexOf(applicant.stage);
          if (currentStageIndex < stages.length - 1) {
            return { ...applicant, stage: stages[currentStageIndex + 1] };
          }
        }
        return applicant;
      })
    );
  };

  // Reject an applicant
  const rejectApplication = (id) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, stage: "Rejected" } : applicant
      )
    );
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm) ||
      applicant.email.toLowerCase().includes(searchTerm) ||
      applicant.stage.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5"  >
      <h2 className="text-center mb-4">📋 Application & Admission Tracking</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search applicants..."
          onChange={handleSearch}
        />
      </div>

      {/* Responsive Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Current Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr key={applicant.id}>
                <td>{index + 1}</td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>
                  <span
                    className={`badge ${
                      applicant.stage === "Accepted"
                        ? "bg-success"
                        : applicant.stage === "Rejected"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {applicant.stage}
                  </span>
                </td>
                <td className="text-center">
                  <FaCalendarCheck />
                  {/* Calendar with Check for Scheduled Reminder */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmissionTracking;
