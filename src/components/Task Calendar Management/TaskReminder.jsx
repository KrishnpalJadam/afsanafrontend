import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const TaskReminderDashboard = () => {
  // Sample tasks data
  const [tasks, setTasks] = useState([
    { id: 1, name: "Submit Project Report", due: "Nov 10, 2023", completed: false },
    { id: 2, name: "Team Meeting", due: "Nov 12, 2023", completed: false },
  ]);

  // Sample alerts data
  const alerts = [
    { id: 1, title: "Missing Documents", description: "Document: Tax Forms", due: "Immediate" },
    { id: 2, title: "Deadline Alert", description: "Project: Marketing Plan", due: "Nov 15, 2023" },
  ];

  // Reminder state
  const [reminder, setReminder] = useState({ name: "", date: "" });
  const [reminders, setReminders] = useState([]);
  const [autoReminders, setAutoReminders] = useState(false);

  // Mark task as complete
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Add new reminder
  const handleAddReminder = () => {
    if (reminder.name && reminder.date) {
      const newReminder = {
        id: reminders.length + 1, // Unique ID for each reminder
        name: reminder.name,
        date: reminder.date,
      };
      setReminders([...reminders, newReminder]); // Add new reminder to the list
      setReminder({ name: "", date: "" }); // Reset the form
    } else {
      alert("Please fill out both the task name and date.");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Upcoming Tasks */}
        <Col md={4}>
          <h4>Upcoming Tasks</h4>
          {tasks.map((task) => (
            <Card key={task.id} className="mb-3 p-3 bg-danger bg-opacity-10">
              <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>Due: {task.due}</Card.Text>
                <Form.Check
                  type="checkbox"
                  label="Mark as Complete"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Alerts */}
        <Col md={4}>
          <h4>Alerts</h4>
          {alerts.map((alert) => (
            <Card key={alert.id} className="mb-3 p-3 bg-danger text-light">
              <Card.Body>
                <Card.Title>{alert.title}</Card.Title>
                <Card.Text>{alert.description}</Card.Text>
                <Card.Text>
                  <strong>Due:</strong> {alert.due}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Reminder Management */}
        <Col md={4}>
          <h4>Manage Reminders</h4>
          <Card className="p-3">
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Task Name"
                value={reminder.name}
                onChange={(e) => setReminder({ ...reminder, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                value={reminder.date}
                onChange={(e) => setReminder({ ...reminder, date: e.target.value })}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleAddReminder} className="w-100">
              Add Reminder
            </Button>
            <div className="mt-3 d-flex align-items-center">
              <Form.Check
                type="switch"
                id="autoReminders"
                label="Automate Reminders"
                checked={autoReminders}
                onChange={() => setAutoReminders(!autoReminders)}
              />
            </div>
          </Card>

          {/* Display Reminders */}
          <div className="mt-4">
            <h5>Reminders</h5>
            {reminders.map((reminder) => (
              <Card key={reminder.id} className="mb-3 p-3 bg-light">
                <Card.Body>
                  <Card.Title>{reminder.name}</Card.Title>
                  <Card.Text>Due: {reminder.date}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskReminderDashboard;