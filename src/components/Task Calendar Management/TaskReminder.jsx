import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import dayjs from "dayjs"; // npm i dayjs

const TaskReminderDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminder, setReminder] = useState({ name: "", date: "" });
  const [reminders, setReminders] = useState([]);
  const [autoReminders, setAutoReminders] = useState(false);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`${BASE_URL}task`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      const response = await api.get(
        `remainder`
      );
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Add reminder
  const handleAddReminder = async () => {
    if (reminder.name && reminder.date) {
      try {
        await api.post(
          `remainder`,
          {
            task_name: reminder.name,
            date: reminder.date,
          }
        );
        setReminder({ name: "", date: "" });
        fetchReminders();
      } catch (error) {
        console.error("Error adding reminder:", error);
      }
    } else {
      alert("Please select a task and date.");
    }
  };

  // Delete reminder
  const handleDeleteReminder = async (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      try {
        await api.delete(
          `remainder/${id}`
        );
        fetchReminders();
      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    }
  };

  // Filter reminders for Today/Tomorrow
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  const alertReminders = reminders.filter(
    (rem) => rem.date === today || rem.date === tomorrow
  );
  const otherReminders = reminders.filter(
    (rem) => rem.date !== today && rem.date !== tomorrow
  );

  return (
    <Container className="mt-4">
  <Row>
    <Col md={12}>
      <h3 className="mb-3">Task Reminder Dashboard</h3>
    </Col>
  </Row>

  <Row>
    {/* Alerts for today and tomorrow */}
    <Col md={4}>
      <h4>Alerts</h4>
      {alertReminders.length > 0 ? (
        alertReminders.map((rem) => (
          <Alert key={rem.id} variant="warning" className="mb-3">
            <h5>{rem.task_name}</h5>
            <p>Due: <strong>{rem.date}</strong></p>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteReminder(rem.id)}
            >
              Delete
            </Button>
          </Alert>
        ))
      ) : (
        <Alert variant="info">No reminders for today or tomorrow!</Alert>
      )}
    </Col>

    {/* All other reminders */}
    <Col md={4}>
      <h4>Reminders</h4>
      {otherReminders.length > 0 ? (
        otherReminders.map((rem) => (
          <Card key={rem.id} className="mb-3 p-2 bg-light">
            <Card.Body>
              <Card.Title>{rem.task_name}</Card.Title>
              <Card.Text>Due: {rem.date}</Card.Text>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteReminder(rem.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Alert variant="secondary">No other reminders found.</Alert>
      )}
    </Col>

    {/* Add New Reminder */}
    <Col md={4}>
      <h4>Add New Reminder</h4>
      <Card className="p-3">
        <Form.Group className="mb-2">
          <Form.Select
            value={reminder.name}
            onChange={(e) => setReminder({ ...reminder, name: e.target.value })}>
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.title}>
                {task.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            type="date"
            value={reminder.date}
            onChange={(e) => setReminder({ ...reminder, date: e.target.value })}/>
        </Form.Group>

        <Button variant="danger" onClick={handleAddReminder} className="w-100">
          Add Reminder
        </Button>

        <div className="mt-3 d-flex align-items-center">
          <Form.Check  type="switch"
            id="autoReminders"
            label="Automate Reminders"
            checked={autoReminders}
            onChange={() => setAutoReminders(!autoReminders)}/>
        </div>
      </Card>
    </Col>
  </Row>
</Container>

  );
};

export default TaskReminderDashboard;
