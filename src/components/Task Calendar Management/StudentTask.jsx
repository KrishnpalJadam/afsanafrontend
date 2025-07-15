import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Form,
  Modal,
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";

const MyTasks = () => {
  const [studentid, setStudentId] = useState("");
  const [tasksData, setTasksData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const is_id = localStorage.getItem("student_id");
    if (is_id) {
      setStudentId(is_id);
    }
  }, []);

  useEffect(() => {
    if (studentid) {
      fetchTasks();
    }
  }, [studentid]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`student_task/${studentid}`);
      setTasksData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setNote(task.notes || "");
    setImage(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setNote("");
    setImage(null);
  };

  const handleNoteSend = async () => {
    if (!selectedTask) return;

    const formData = new FormData();
    formData.append("notes", note);
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.patch(`update_task/${selectedTask.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Notes and image sent successfully.");
      handleCloseModal();
      fetchTasks();
    } catch (error) {
      console.error("Error sending notes and image:", error);
      alert("Failed to send notes.");
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Tasks</h3>
      <Card>
        <Card.Body>
          <Table bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
            
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {tasksData.length > 0 ? (
    tasksData.map((task, index) => (
      <tr key={task.id}>
        <td>{index + 1}</td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{new Date(task.due_date).toLocaleDateString()}</td>
        <td>
          <Badge
            bg={
              task.priority === "High"
                ? "danger"
                : task.priority === "Medium"
                ? "warning"
                : "info"
            }
          >
            {task.priority}
          </Badge>
        </td>
        <td>
          <Badge
            bg={
              task.status === "Complete"
                ? "success"
                : task.status === "Pending"
                ? "secondary"
                : task.status === "In Progress"
                ? "primary"
                : task.status === "Pending Approval"
                ? "warning"
                : "danger"
            }
          >
            {task.status}
          </Badge>
        </td>
        
        <td>
        <Button
  size="sm"
  variant="primary"
  disabled={task.status?.toString().trim().toLowerCase() === "completed"}
  onClick={() => handleShowModal(task)}
  title={
    task.status?.toString().trim().toLowerCase() === "completed"
      ? "Task already completed"
      : "Upload Notes & Image"
  }
>
  Upload Notes & Image
</Button>
        </td>
        
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center">
        No tasks found.
      </td>
    </tr>
  )}
</tbody>


          </Table>
        </Card.Body>
      </Card>

      {/* Modal for Upload Notes & Image */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Notes & Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <>
              <p>
                <strong>Task:</strong> {selectedTask.title}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNoteSend}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyTasks;
