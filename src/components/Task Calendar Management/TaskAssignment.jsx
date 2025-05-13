import  { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  Badge,
  Modal,
} from "react-bootstrap";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const AdminTaskManager = () => {
  const [tasks ,setTasks] = useState([])  
 const [studentdata, setStudentsData] = useState([]);
   const [counselors, setCounselors] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(tasks.length / itemsPerPage);

const paginatedTasks = tasks.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`${BASE_URL}auth/getAllStudents`);
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [])
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await api.get(`${BASE_URL}counselor`);
        setCounselors(res.data);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };
  
    fetchCounselors();
  }, []);
  
 const fetchTasks = async () => {
  try {
    const response = await api.get(`${BASE_URL}task`);
    setTasks(response.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchTasks();
}, []);

  const [form, setForm] = useState({
    student: "",
    counselor: "",
    title: "",
    due: "",
    description: "",
    priority: "",
    status: "",
    relatedTo: "",
    relatedItem: "",
    assignedTo: "",
    assignedDate: "",
    finishingDate: "",
    attachment: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.student || !form.title || !form.due) return;

    const user_id = localStorage.getItem("user_id"); // Assuming user_id is available in localStorage

    const taskData = {
      title: form.title,
      user_id,
      due_date: form.due,
      counselor_id: form.counselor, // dynamic counselor_id
      student_id: form.student,
      description: form.description,
      priority: form.priority,
      status: form.status,
      related_to: form.relatedTo,
      related_item: form.relatedItem,
      assigned_to: form.assignedTo,
      assigned_date: form.assignedDate,
      finishing_date: form.finishingDate,
      attachment: form.attachment,
    };
    
    try {
      const response = await api.post(`${BASE_URL}task`, taskData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
   
    
      // After successful POST, update the state with the new task
      if (response.ok) {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            ...taskData, // Adding the task data to the state
            status: "pending",
          },
        ]);

        setForm({
          student: "",
          title: "",
          due: "",
          description: "",
          priority: "",
          status: "",
          relatedTo: "",
          relatedItem: "",
          assignedTo: "",
          assignedDate: "",
          finishingDate: "",
          attachment: "",
        });
        setEditId(null);
        setShowModal(false);
      } else {
        console.error("Failed to create task:", data);
      }
    } catch (error) {
      console.error("Error occurred while posting the task:", error);
    }
  };

  const handleEdit = (task) => {
    setForm({
      student: task.student,
      title: task.title,
      due: task.due,
      description: task.description,
      priority: task.priority,
      status: task.status,
      relatedTo: task.related_to,
      relatedItem: task.related_item,
      assignedTo: task.assigned_to,
      assignedDate: task.assigned_date,
      finishingDate: task.finishing_date,
      attachment: task.attachment,
    });
    setEditId(task.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const deleteTask =  async () => {
       try {
         const response = await fetch(`${BASE_URL}task/${id}`, {
           method: "DELETE",
         });
         const data = await response.json();
         if (response.ok) {
           setTasks(tasks.filter((task) => task.id !== id));
         } else {
           console.error("Failed to delete task:", data);
         }
       } catch (error) {
         console.error("Error occurred while deleting the task:", error);
       }
     }
     deleteTask();
  };


  return (
    <Container className="mt-4">
      <h3 className="mb-4">Admin - Task Manager</h3>

      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col>
              <Button onClick={() => setShowModal(true)}>Assign New Task</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table bordered hover responsive className="text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Task</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
   <tbody>
  {paginatedTasks.map((task, index) => (
    <tr key={task?.id}>
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>{task?.student_name}</td>
      <td>{task?.title}</td>
      <td>{new Date(task?.due_date).toLocaleDateString()}</td>
      <td>
        <Badge
          bg={
            task?.status === "completed"
              ? "success"
              : task?.status === "pending"
              ? "warning"
              : "secondary"
          }
        >
          {task?.status === "completed" ? "Completed" : "Pending"}
        </Badge>
      </td>
      <td>
        <Button
          variant="primary"
          size="sm"
          className="me-1"
          onClick={() => handleEdit(task)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(task?.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}

  {tasks.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center">No tasks assigned yet.</td>
    </tr>
  )}
</tbody>

          </Table>
        </Card.Body>
      </Card>
<div className="mt-4 d-flex justify-content-center">
  <nav>
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
          &laquo;
        </button>
      </li>

      {[...Array(totalPages)].map((_, i) => (
        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
</div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Task" : "Assign New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Task Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Due Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="due"
                  value={form.due}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Counselor *</Form.Label>
                <Form.Select
  name="counselor"
  value={form.counselor}
  onChange={handleChange}
>
  <option value="">Select Counselor</option>
  {counselors.map((counselor) => (
    <option key={counselor.id} value={counselor.id}>
      {counselor.full_name}
    </option>
  ))}
</Form.Select>

              </Col>
              <Col md={6}>
  <Form.Label>Student *</Form.Label>
  <Form.Select
  name="student"
  value={form.student}
  onChange={handleChange}
>
  <option value="">Select Student</option>
  {studentdata.map((student) => (
    <option key={student.id} value={student.id}>
      {student.full_name}
    </option>
  ))}
</Form.Select>
</Col>

            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter task description"
                maxLength={200}
              />
              <Form.Text muted>0/200 characters</Form.Text>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Priority *</Form.Label>
                <Form.Select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option>Select Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Status *</Form.Label>
                <Form.Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Select Status</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Related To *</Form.Label>
                <Form.Select
                  name="relatedTo"
                  value={form.relatedTo}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option>Application</option>
                  <option>Visa</option>
                  <option>Interview</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Related Item *</Form.Label>
                <Form.Control
                  type="text"
                  name="relatedItem"
                  value={form.relatedItem}
                  onChange={handleChange}
                  placeholder="Enter related item"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Assigned To *</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  placeholder="Enter assignee name"
                />
              </Col>
              <Col md={4}>
                <Form.Label>Assigned Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="assignedDate"
                  value={form.assignedDate}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Finishing Date *</Form.Label>
                <Form.Control
                  type="date"
                  name="finishingDate"
                  value={form.finishingDate}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Attach File</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button variant="dark" onClick={handleSave}>
                {editId ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminTaskManager;
