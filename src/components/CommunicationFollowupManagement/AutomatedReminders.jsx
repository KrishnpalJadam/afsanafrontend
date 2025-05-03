import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const AutomatedReminders = () => {
  const [reminder, setReminder] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [repeat, setRepeat] = useState("none");
  const [reminders, setReminders] = useState([]);
  const [status, setStatus] = useState(null);

  // Function to add reminder
  const addReminder = () => {
    if (reminder && dateTime) {
      const newReminder = {
        id: Date.now(),
        text: reminder,
        time: dateTime,
        repeat,
      };
      setReminders([...reminders, newReminder]);
      setStatus("Reminder added successfully!");
      setReminder("");
      setDateTime("");
      setRepeat("none");

      // Schedule notification
      scheduleNotification(newReminder);
    } else {
      setStatus("Please enter a reminder and time.");
    }
  };

  // Schedule notification alert
  const scheduleNotification = (reminder) => {
    const now = new Date();
    const reminderTime = new Date(reminder.time);
    const timeDiff = reminderTime - now;

    if (timeDiff > 0) {
      setTimeout(() => {
        alert(`🔔 Reminder: ${reminder.text}`);
      }, timeDiff);
    }
  };

  // Function to remove a reminder
  const removeReminder = (id) => {
    setReminders(reminders.filter((item) => item.id !== id));
  };

  // Function to edit a reminder
  const editReminder = (id) => {
    const selected = reminders.find((item) => item.id === id);
    setReminder(selected.text);
    setDateTime(selected.time);
    setRepeat(selected.repeat);
    setReminders(reminders.filter((item) => item.id !== id));
  };

  // Function to clear all reminders
  const clearAll = () => {
    setReminders([]);
    setStatus("All reminders cleared!");
  };

  return (
    <Container className="p-3">
      <h4 className="fw-bold mb-4">Automated Reminders & Notifications</h4>
      {status && <Alert variant="info">{status}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Reminder Message</Form.Label>
          <Form.Control
            type="text"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Enter reminder message"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reminder Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Repeat</Form.Label>
          <Form.Select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          >
            <option value="none">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={addReminder} className="me-2" style={{backgroundColor:"gray" , color:"black", border:"none"}}>
          Set Reminder
        </Button>
        <Button
          variant="danger"
          onClick={clearAll}
          disabled={reminders.length === 0}
        >
          Clear All
        </Button>
      </Form>

      {reminders.length > 0 && (
        <ListGroup className="mt-4">
          <h5>Scheduled Reminders</h5>
          {reminders.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{new Date(item.time).toLocaleString()}</strong>:{" "}
                {item.text} ({item.repeat})
              </span>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => editReminder(item.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeReminder(item.id)}
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

export default AutomatedReminders;
