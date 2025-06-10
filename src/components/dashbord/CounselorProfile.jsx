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
            src="data:image/png;base64,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"
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
