import { useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const FollowUpScheduling = () => {
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [followUps, setFollowUps] = useState([]);
  const [status, setStatus] = useState(null);

  // Add follow-up
  const scheduleFollowUp = () => {
    if (date && task) {
      setFollowUps([...followUps, { id: Date.now(), date, task }]);
      setStatus("Follow-up scheduled successfully!");
      setDate("");
      setTask("");
    } else {
      setStatus("Please enter a date and task.");
    }
  };

  // Remove a follow-up
  const removeFollowUp = (id) => {
    setFollowUps(followUps.filter((item) => item.id !== id));
  };

  // Edit follow-up
  const editFollowUp = (id) => {
    const selected = followUps.find((item) => item.id === id);
    setDate(selected.date);
    setTask(selected.task);
    setFollowUps(followUps.filter((item) => item.id !== id));
  };

  // Clear all follow-ups
  const clearAll = () => {
    setFollowUps([]);
    setStatus("All follow-ups cleared!");
  };

  return (
    <Container className="p-3">
      <h4 className="fw-bold mb-4">Follow-up Scheduling</h4>
      {status && <Alert variant="info">{status}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Follow-up Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Follow-up Task</Form.Label>
          <Form.Control
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task (e.g., Call client)"
          />
        </Form.Group>

        <Button variant="primary" onClick={scheduleFollowUp} className="me-2" style={{backgroundColor:"gray" , color:"black", border:"none"}}>
          Schedule Follow-up
        </Button>
        <Button
          variant="danger"
          onClick={clearAll}
          disabled={followUps.length === 0}
        >
          Clear All
        </Button>
      </Form>

      {followUps.length > 0 && (
        <ListGroup className="mt-4">
          <h5>Scheduled Follow-ups</h5>
          {followUps.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{item.date}:</strong> {item.task}
              </span>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => editFollowUp(item.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFollowUp(item.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default FollowUpScheduling;
