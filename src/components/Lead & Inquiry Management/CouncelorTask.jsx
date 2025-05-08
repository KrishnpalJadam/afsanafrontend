import { useEffect, useState } from "react";
import { Card, Table, Button, Container, Badge, Modal } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";

const CounselorTask = () => {
  const [counselorId, setCounselorId] = useState("");
  const [tasksData, setTasksData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const is_id = localStorage.getItem("counselor_id");
    if (is_id) {
      setCounselorId(is_id);
    }
  }, []);

  useEffect(() => {
    if (counselorId) {
      fetchTasks();
    }
  }, [counselorId]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`task/${counselorId}`);
      console.log(response.data)
      setTasksData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge bg="danger">{priority}</Badge>;
      case "Medium":
        return <Badge bg="warning" text="dark">{priority}</Badge>;
      case "Low":
        return <Badge bg="success">{priority}</Badge>;
      default:
        return <Badge bg="secondary">N/A</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning" text="dark">{status}</Badge>;
      case "Complete":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge bg="secondary">N/A</Badge>;
    }
  };

  const handleStatusToggle = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Pending" ? "Complete" : "Pending";
      await api.patch(`update_task/${taskId}`, {
        status: newStatus,
      });
      alert(`Task marked as ${newStatus}`);
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update task status.");
    }
  };

  const handleCheckNotes = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalStatusToggle = async () => {
    if (!selectedTask) return;
    try {
      const newStatus =
        selectedTask.status === "Pending" ? "Complete" : "Pending";
      await api.patch(`update_task/${selectedTask.id}`, {
        status: newStatus,
      });
      alert(`Task marked as ${newStatus}`);
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update task status.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-3 mb-md-0">Assigned Tasks</h2>
        <Button variant="outline-secondary">Export</Button>
      </div>
      <Card className="p-4 shadow-sm m-3">
        {tasksData.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <Table bordered hover responsive className="mt-3 text-center text-nowrap">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Student Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasksData.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{new Date(task.due_date).toLocaleDateString()}</td>
                  <td>{task.student_name}</td>
                  <td>{task.description}</td>
                  <td>{getPriorityBadge(task.priority)}</td>
                  <td>{getStatusBadge(task.status)}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleCheckNotes(task)}>
                      Check Notes
                    </Button>
                  </td>
                  <td>
                    {task.status === "Complete" ? (
                      <span className="text-success fw-bold">Complete</span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleStatusToggle(task.id, task.status)
                        }>
                        Mark Complete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modal for Notes */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Task Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedTask?.image ? (
  <div style={{ marginBottom: "10px" }}>
    <strong>Image:</strong><br />
    <img
      src={selectedTask.image}
      alt="Task"
        crossOrigin="anonymous"
      style={{ width: "200px", height: "auto", borderRadius: "6px", marginTop: "8px" }}
    />
  </div>
) : (
  <p><strong>Image:</strong> No image available</p>
)}

<p><strong>Notes:</strong> {selectedTask?.notes || "No notes available"}</p>
<p><strong>Status:</strong> {selectedTask?.status}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={
              selectedTask?.status === "Pending" ? "success" : "warning"
            }
            onClick={handleModalStatusToggle}
          >
            {selectedTask?.status === "Pending"
              ? "Mark as Complete"
              : "Mark as Pending"}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CounselorTask;
