import React from "react";
import { Card, Row, Col, Image, ProgressBar } from "react-bootstrap";

/**
 * @param {object} counselor - Counselor details (name, email, phone, role, imageUrl, activeSince).
 * @param {number} totalLeads - Total number of leads assigned to the counselor.
 * @param {number} completedLeads - Number of leads that are completed/converted.
 */
const CounselorProfile = ({ counselor, totalLeads, completedLeads }) => {
  // Calculate completion percentage
  const completionPercent =
    totalLeads === 0 ? 0 : Math.round((completedLeads / totalLeads) * 100);

  // Calculate how many days the counselor has been active
  // (based on "activeSince" in the counselor object)
  const startDate = new Date(counselor?.activeSince);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate - startDate);
  const daysActive = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return (
    <Card className="mb-4 shadow-lg p-4" style={{ backgroundColor: "#fff" }}>
      <Row className="align-items-center">
        {/* Profile Image */}
        <Col md={4} className="text-center mb-3 mb-md-0">
          <Image
            src="img/student.jpeg"
            alt="Counselor Profile"
            roundedCircle
            fluid
            style={{ height: "150px", width: "150px" }}
          />
        </Col>

        {/* Counselor Details & Progress */}
        <Col md={8}>
          <h3 className="fw-bold mb-3">{counselor.name}</h3>
          <p className="text-muted mb-2">
            <strong>Email:</strong> {counselor.email}
          </p>
          <p className="text-muted mb-2">
            <strong>Phone:</strong> {counselor.phone}
          </p>
          <p className="text-muted mb-2">
            <strong>Role:</strong> {counselor.role}
          </p>
          <p className="text-muted mb-2">
            <strong>University Name:</strong> {counselor.university_name}
          </p>
          {/* Progress Bar for Completed Leads */}
          <div className="mt-4">
            <strong>Lead Completion: </strong>
            <ProgressBar
              now={completionPercent}
              label={`${completionPercent}%`}
              className="mt-2 step-progress-bar"
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CounselorProfile;
