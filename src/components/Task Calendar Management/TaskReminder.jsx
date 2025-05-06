import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor"; // Assuming this is set up properly
import BASE_URL from "../../Config";

const TaskReminderDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminder, setReminder] = useState({ name: "", date: "" });
  const [reminders, setReminders] = useState([]);
  const [autoReminders, setAutoReminders] = useState(false);

  // Fetch tasks from API
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

  // Fetch reminders from API
  const fetchReminders = async () => {
    try {
      const response = await api.get(`https://cj2ww6qd-5000.inc1.devtunnels.ms/api/remainder`);
      setReminders(response.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Add a new reminder
  const handleAddReminder = async () => {
    if (reminder.name && reminder.date) {
      try {
        await api.post(`https://cj2ww6qd-5000.inc1.devtunnels.ms/api/remainder`, {
          task_name: reminder.name,
          date: reminder.date,
        });
        setReminder({ name: "", date: "" });
        fetchReminders();
      } catch (error) {
        console.error("Error adding reminder:", error);
      }
    } else {
      alert("Please select a task and date.");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Reminders */}
        <Col md={6}>
          <h4>Manage Reminders</h4>
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
            {reminders.map((rem) => (
              <Card key={rem.id} className="mb-3 p-3 bg-light">
                <Card.Body>
                  <Card.Title>{rem.task_name}</Card.Title>
                  <Card.Text>Due: {rem.date}</Card.Text>
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
