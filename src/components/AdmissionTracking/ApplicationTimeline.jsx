// import React from "react";
// import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";

// const ApplicationTimeline = () => {
//   const { applicationId } = useParams(); // For future dynamic fetch
//   const navigate = useNavigate();

//   // Dummy timeline data
//   const timeline = [
//     {
//       status: "Submitted",
//       date: "2025-04-01",
//       time: "10:30 AM",
//       note: "Application submitted by student.",
//     },
//     {
//       status: "In Review",
//       date: "2025-04-02",
//       time: "03:45 PM",
//       note: "Documents under verification by counselor.",
//     },
//     {
//       status: "Approved",
//       date: "2025-04-04",
//       time: "12:00 PM",
//       note: "Student approved. Proceed to visa process.",
//     },
//   ];

//   const getBadgeVariant = (status) => {
//     switch (status) {
//       case "Submitted":
//         return "secondary";
//       case "In Review":
//         return "info";
//       case "Approved":
//         return "success";
//       case "Rejected":
//         return "danger";
//       default:
//         return "dark";
//     }
//   };

//   return (
//     <Container className="mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="">Application Timeline</h4>
//         <Button
//           variant="secondary"
//           className="mb-3"
//           onClick={() => navigate(-1)}
//         >
//           ← Back
//         </Button>
//       </div>

//       <Card>
//         <ListGroup variant="flush">
//           {timeline.map((item, index) => (
//             <ListGroup.Item key={index}>
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>
//                     <Badge bg={getBadgeVariant(item.status)} className="me-2">
//                       {item.status}
//                     </Badge>
//                     <small>
//                       {item.date} at {item.time}
//                     </small>
//                   </h5>
//                   <p className="mb-1">{item.note}</p>
//                 </div>
//               </div>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Card>
//     </Container>
//   );
// };

// export default ApplicationTimeline;

import React, { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Badge,
  Button,
  Modal,
  Form,
  ProgressBar,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationTimeline = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [timeline, setTimeline] = useState([
    {
      status: "Submitted",
      date: "2025-04-01",
      time: "10:30 AM",
      note: "Application submitted.",
    },
    {
      status: "In Review",
      date: "2025-04-02",
      time: "3:45 PM",
      note: "Under verification.",
    },
    {
      status: "Approved",
      date: "2025-04-04",
      time: "12:00 PM",
      note: "Approved for next steps.",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");

  const statusSteps = ["Submitted", "In Review", "Approved", "Rejected"];

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Submitted":
        return "secondary";
      case "In Review":
        return "info";
      case "Approved":
        return "success";
      case "Rejected":
        return "danger";
      default:
        return "dark";
    }
  };

  const latestStatusIndex = statusSteps.findIndex(
    (step) => step === timeline[timeline.length - 1].status
  );

  const handleAddTimeline = () => {
    const now = new Date();
    const newEntry = {
      status: newStatus,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      note: newNote,
    };
    setTimeline([...timeline, newEntry]);
    setShowAddModal(false);
    setNewStatus("");
    setNewNote("");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="">Application Timeline</h2>
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
      </div>

      {/* Horizontal Stepper */}
      <Card className="mb-4 p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          {statusSteps.map((step, idx) => (
            <div key={idx} className="text-center" style={{ minWidth: "80px" }}>
              <Badge
                bg={idx <= latestStatusIndex ? "primary" : "light"}
                text={idx <= latestStatusIndex ? "light" : "dark"}
              >
                {step}
              </Badge>
              <div className="small mt-1">
                {idx <= latestStatusIndex ? "✔️" : "⏳"}
              </div>
            </div>
          ))}
        </div>
        <ProgressBar now={(latestStatusIndex + 1) * 25} className="mt-3" />
      </Card>

      {/* Timeline List */}
      <Card>
        <ListGroup variant="flush">
          {timeline.map((item, index) => (
            <ListGroup.Item key={index}>
              <div>
                <h6>
                  <Badge bg={getBadgeVariant(item.status)} className="me-2">
                    {item.status}
                  </Badge>
                  <small>
                    {item.date} at {item.time}
                  </small>
                </h6>
                <p className="mb-1">{item.note}</p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Add Entry Button */}
      <div className="mt-4 d-flex justify-content-end">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + Add Timeline Entry
        </Button>
      </div>

      {/* Add Entry Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Timeline Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                {statusSteps.map((step, idx) => (
                  <option key={idx} value={step}>
                    {step}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTimeline}>
            Add Entry
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ApplicationTimeline;
