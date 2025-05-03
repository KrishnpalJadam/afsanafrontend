// import React, { useState } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Form,
//   Row,
//   Col,
//   Card,
//   Alert,
//   Modal,
// } from "react-bootstrap";

// const TaskManagement = () => {
//   const [tasks, setTasks] = useState([]);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [counselor, setCounselor] = useState("");
//   const [student, setStudent] = useState("");
//   const [description, setDescription] = useState("");
//   const [descriptionError, setDescriptionError] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // New Fields
//   const [priority, setPriority] = useState("");
//   const [status, setStatus] = useState("");
//   const [relatedTo, setRelatedTo] = useState("");
//   const [relatedItem, setRelatedItem] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");
//   const [assignedDate, setAssignedDate] = useState("");
//   const [finishingDate, setFinishingDate] = useState("");
//   const [file, setFile] = useState(null);

//   const counselors = ["John Smith", "Jane Doe", "Emily Davis"];
//   const students = ["Sanjana", "Kabir Singh", "Emily Davis"];

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setTaskTitle("");
//     setDueDate("");
//     setCounselor("");
//     setStudent("");
//     setDescription("");
//     setDescriptionError("");
//     setPriority("");
//     setStatus("");
//     setRelatedTo("");
//     setRelatedItem("");
//     setAssignedTo("");
//     setAssignedDate("");
//     setFinishingDate("");
//     setFile(null);
//   };

//   const addTask = (e) => {
//     e.preventDefault();

//     if (
//       !taskTitle ||
//       !dueDate ||
//       !counselor ||
//       !student ||
//       !description ||
//       !priority ||
//       !status ||
//       !relatedTo ||
//       !relatedItem ||
//       !assignedTo ||
//       !assignedDate ||
//       !finishingDate
//     ) {
//       alert("Please fill all fields!");
//       return;
//     }

//     if (description.length > 200) {
//       setDescriptionError("Description cannot exceed 200 characters.");
//       return;
//     }

//     const newTask = {
//       id: Date.now(),
//       title: taskTitle,
//       dueDate,
//       counselor,
//       student,
//       description,
//       priority,
//       status,
//       relatedTo,
//       relatedItem,
//       assignedTo,
//       assignedDate,
//       finishingDate,
//       file: file ? file.name : "",
//       reminder: "",
//     };

//     setTasks([...tasks, newTask]);
//     setShowSuccess(true);
//     handleCloseModal();

//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const handleReminderChange = (id, value) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, reminder: value } : task
//       )
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <Container className="mt-4">
//       {showSuccess && (
//         <Alert
//           variant="success"
//           onClose={() => setShowSuccess(false)}
//           dismissible
//           className="mb-3"
//         >
//           Task added successfully!
//         </Alert>
//       )}

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Task List</h2>
//         <Button variant="secondary" onClick={handleShowModal}>
//           <i className="bi bi-plus-circle me-2"></i> Add New Task
//         </Button>
//       </div>

//       <Card className="p-3 shadow-sm">
//         {tasks.length === 0 ? (
//           <Alert variant="info">
//             No tasks added yet. Click "Add New Task" to create one!
//           </Alert>
//         ) : (
//           <Table className="text-center text-nowrap" striped bordered hover responsive>
//             <thead className="table-white">
//               <tr>
//                 <th>Task Title</th>
//                 <th>Due Date</th>
//                 <th>Counselor</th>
//                 <th>Student</th>
//                 <th>Priority</th>
//                 <th>Status</th>
//                 <th>Description</th>
//                 <th>Reminder</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task.id}>
//                   <td>{task.title}</td>
//                   <td>{task.dueDate}</td>
//                   <td>{task.counselor}</td>
//                   <td>{task.student}</td>
//                   <td>{task.priority}</td>
//                   <td>{task.status}</td>
//                   <td>
//                     {task.description.length > 50
//                       ? `${task.description.substring(0, 50)}...`
//                       : task.description}
//                   </td>
//                   <td>
//                     <Form.Select
//                       value={task.reminder}
//                       onChange={(e) => handleReminderChange(task.id, e.target.value)}
//                       size="sm"
//                     >
//                       <option value="">Select Reminder</option>
//                       <option value="Task Cancel">Task Cancel</option>
//                       <option value="Upcoming">Upcoming</option>
//                       <option value="Alert">Alert</option>
//                     </Form.Select>
//                   </td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => deleteTask(task.id)}
//                       className="me-2"
//                     >
//                       <i className="bi bi-trash"></i> Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card>

//       <Modal show={showModal} onHide={handleCloseModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Task</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={addTask}>
//             <Row className="g-3 mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Task Title *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter task title"
//                     value={taskTitle}
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Due Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={dueDate}
//                     onChange={(e) => setDueDate(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="g-3 mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Counselor *</Form.Label>
//                   <Form.Select
//                     value={counselor}
//                     onChange={(e) => setCounselor(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Counselor</option>
//                     {counselors.map((name, index) => (
//                       <option key={index} value={name}>
//                         {name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Student *</Form.Label>
//                   <Form.Select
//                     value={student}
//                     onChange={(e) => setStudent(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Student</option>
//                     {students.map((student, index) => (
//                       <option key={index} value={student}>
//                         {student}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-4">
//               <Form.Label>Description *</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 placeholder="Enter task description"
//                 value={description}
//                 onChange={(e) => {
//                   setDescription(e.target.value);
//                   setDescriptionError(e.target.value.length > 200
//                     ? "Description cannot exceed 200 characters."
//                     : "");
//                 }}
//                 required
//                 className={descriptionError ? "is-invalid" : ""}
//               />
//               <div className="d-flex justify-content-between mt-1">
//                 <small className="text-muted">
//                   {description.length}/200 characters
//                 </small>
//                 {descriptionError && (
//                   <small className="text-danger">{descriptionError}</small>
//                 )}
//               </div>
//             </Form.Group>

//             <Row className="g-3 mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Priority *</Form.Label>
//                   <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
//                     <option value="">Select Priority</option>
//                     <option>Low</option>
//                     <option>Medium</option>
//                     <option>High</option>
//                     <option>Urgent</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Status *</Form.Label>
//                   <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} required>
//                     <option value="">Select Status</option>
//                     <option>New</option>
//                     <option>In Progress</option>
//                     <option>Completed</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="g-3 mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Related To *</Form.Label>
//                   <Form.Select value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} required>
//                     <option value="">Select</option>
//                     <option>New Lead</option>
//                     <option>Register Student</option>
//                     <option>Project</option>
//                     <option>Invoice</option>
//                     <option>Student</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Related Item *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter related item"
//                     value={relatedItem}
//                     onChange={(e) => setRelatedItem(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="g-3 mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Assigned To *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter assignee name"
//                     value={assignedTo}
//                     onChange={(e) => setAssignedTo(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label>Assigned Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={assignedDate}
//                     onChange={(e) => setAssignedDate(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label>Finishing Date *</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={finishingDate}
//                     onChange={(e) => setFinishingDate(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Attach File</Form.Label>
//               <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
//             </Form.Group>

//             <div className="d-flex justify-content-end">
//               <Button variant="danger" onClick={handleCloseModal} className="me-2">
//                 Cancel
//               </Button>
//               <Button variant="secondary" type="submit">
//                 Add Task
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default TaskManagement;

import React, { useState } from "react";
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

const AdminTaskManager = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      title: "Upload Passport Copy",
      due: "2025-06-15",
      status: "pending",
    },
    {
      id: 2,
      student: "Neha Verma",
      title: "Submit SOP",
      due: "2025-06-10",
      status: "completed",
    },
  ]);

  const [form, setForm] = useState({ student: "", title: "", due: "" });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.student || !form.title || !form.due) return;

    if (editId !== null) {
      setTasks(
        tasks.map((task) => (task.id === editId ? { ...task, ...form } : task))
      );
    } else {
      setTasks([...tasks, { id: Date.now(), ...form, status: "pending" }]);
    }

    setForm({ student: "", title: "", due: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setForm({ student: task.student, title: task.title, due: task.due });
    setEditId(task.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Admin - Task Manager</h3>

      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col>
              <Button onClick={() => setShowModal(true)}>
                Assign New Task
              </Button>
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
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.student}</td>
                  <td>{task.title}</td>
                  <td>{task.due}</td>
                  <td>
                    <Badge
                      bg={task.status === "completed" ? "success" : "warning"}
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-1"
                      onClick={() => handleStatusToggle(task.id)}
                    >
                      Toggle
                    </Button>
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
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No tasks assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
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
                  placeholder="Enter task title"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Due Date *</Form.Label>
                <Form.Control type="date" name="due" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Counselor *</Form.Label>
                <Form.Select name="counselor">
                  <option>Select Counselor</option>
                  <option>Counselor 1</option>
                  <option>Counselor 2</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Student *</Form.Label>
                <Form.Select name="student">
                  <option>Select Student</option>
                  <option>Rahul Sharma</option>
                  <option>Neha Verma</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                maxLength={200}
              />
              <Form.Text muted>0/200 characters</Form.Text>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Priority *</Form.Label>
                <Form.Select>
                  <option>Select Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Status *</Form.Label>
                <Form.Select>
                  <option>Select Status</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Related To *</Form.Label>
                <Form.Select>
                  <option>Select</option>
                  <option>Application</option>
                  <option>Visa</option>
                  <option>Interview</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Related Item *</Form.Label>
                <Form.Control type="text" placeholder="Enter related item" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Assigned To *</Form.Label>
                <Form.Control type="text" placeholder="Enter assignee name" />
              </Col>
              <Col md={4}>
                <Form.Label>Assigned Date *</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={4}>
                <Form.Label>Finishing Date *</Form.Label>
                <Form.Control type="date" />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Attach File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button variant="dark">Add Task</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminTaskManager;
