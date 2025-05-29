import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Pagination } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import moment from "moment";

// Fetch Tasks Function
const fetchTasks = async (setTasks) => {
  try {
    const response = await api.get(`${BASE_URL}task`);
    
    setTasks(response.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Fetch Reminders Function
const fetchReminders = async (setReminders) => {
  try {
    const response = await api.get(`remainder`);
    setReminders(response.data);
  } catch (error) {
    console.error("Error fetching reminders:", error);
  }
};

// Fetch New Reminders Function
const fetchRemindersNew = async (setNewData) => {
  try {
    const response = await api.get(`${BASE_URL}tasks/reminder`);
    setNewData(response.data);
  } catch (error) {
    console.error("Error fetching new reminders:", error);
  }
};

const TaskReminderDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [reminder, setReminder] = useState({ name: "" });
  const [reminders, setReminders] = useState([]);
  const [autoReminders, setAutoReminders] = useState(false);
  const [newdata, setNewData] = useState([]);

  // Pagination states
  const [activePage, setActivePage] = useState(1);
  const [missedPage, setMissedPage] = useState(1);
  const itemsPerPage = 5;

  // Initial Data Fetch
  useEffect(() => {
    fetchTasks(setTasks);
    fetchReminders(setReminders);
    fetchRemindersNew(setNewData);
  }, []);

  // Add reminder
  const handleAddReminder = async () => {
    if (reminder.name) {
      try {
        await api.post(`remainder`, { task_id: parseInt(reminder.name, 10) });
        setReminder({ name: "" });
        fetchReminders(setReminders);
      } catch (error) {
        console.error("Error adding reminder:", error);
      }
    } else {
      alert("Please select a task.");
    }
  };

  // Delete reminder
  const handleDeleteReminder = async (id) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      try {
        await api.delete(`remainder/${id}`);
        fetchReminders(setReminders);
      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    }
  };

  // Split data into active & missed
  const today = moment().format("YYYY-MM-DD");
  const activeReminders = newdata.filter((item) => item.due_date >= today);
  const missedAlerts = newdata.filter((item) => item.due_date < today);

  // Pagination functions
  const paginate = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const renderPagination = (items, currentPage, setPage) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (totalPages <= 1) return null;
    return (
      <Pagination className="mt-2">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Task Reminder Dashboard</h3>

      <Row className="g-4">
        {/* Left: Add Reminder */}
        <Col md={6}>
          <h5>Add New Notification</h5>
          <Card className="p-3 shadow-sm">
            <Form.Group className="mb-3">
              <Form.Select
                value={reminder.name}
                onChange={(e) => setReminder({ ...reminder, name: e.target.value })}
              >
                <option value="">Select Task</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="danger" className="w-100" onClick={handleAddReminder}>
              Add Notification
            </Button>
            <Form.Check
              type="switch"
              id="autoReminders"
              label="Automate Reminders"
              className="mt-3"
              checked={autoReminders}
              onChange={() => setAutoReminders(!autoReminders)}
            />
          </Card>
        </Col>

        {/* Right: Old Reminders */}
        <Col md={6}>
          <h5>Notification</h5>
          {reminders.length > 0 ? (
            reminders.map((rem) => (
              <Card key={rem.id} className="mb-3 p-2 bg-light shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>{rem.title}</Card.Title>
                    <Card.Text className="mb-0">Due Date: {rem.due_date}</Card.Text>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteReminder(rem.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="secondary">No reminders found.</Alert>
          )}
        </Col>
      </Row>

      {/* New Reminders */}
      <Row className="g-4 mt-4">
        <Col md={6}>
          <h5>📌 Upcoming Reminders</h5>
          {paginate(activeReminders, activePage).length > 0 ? (
            paginate(activeReminders, activePage).map((rem) => (
              <Card key={rem.id} className="mb-3 p-2 bg-light shadow-sm">
                <Card.Body>
                  <Card.Title>{rem.title}</Card.Title>
                  <Card.Text>
                    Due: {rem.due_date}
                    {rem.due_time ? ` at ${rem.due_time}` : ""}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="secondary">No upcoming reminders found.</Alert>
          )}
          {renderPagination(activeReminders, activePage, setActivePage)}
        </Col>

        <Col md={6}>
          <h5>⚠️ Missed Alerts</h5>
          {paginate(missedAlerts, missedPage).length > 0 ? (
            paginate(missedAlerts, missedPage).map((rem) => (
              <Card key={rem.id} className="mb-3 p-2 bg-light shadow-sm border-danger">
                <Card.Body>
                  <Card.Title className="text-danger">{rem.title}</Card.Title>
                  <Card.Text>
                    Due: {rem.due_date}
                    {rem.due_time ? ` at ${rem.due_time}` : ""}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="secondary">No missed alerts.</Alert>
          )}
          {renderPagination(missedAlerts, missedPage, setMissedPage)}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskReminderDashboard;
