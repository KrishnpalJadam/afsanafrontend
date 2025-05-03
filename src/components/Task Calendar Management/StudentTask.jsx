// import React, { useState } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Row,
//   Col,
//   Alert,
//   Form,
// } from "react-bootstrap";

// const MyTasks = () => {
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Upload Academic Documents", status: "pending" },
//     { id: 2, title: "Complete Profile Section", status: "completed" },
//     { id: 3, title: "Pay Application Fee", status: "pending" },
//     { id: 4, title: "Check Email for Offer Letter", status: "completed" },
//     { id: 5, title: "Join WhatsApp Student Group", status: "pending" },
//   ]);

//   const [filter, setFilter] = useState("all");

//   const [alerts, setAlerts] = useState([
//     { id: 1, type: "info", message: "New university added in UK list." },
//     {
//       id: 2,
//       type: "warning",
//       message: "Visa deadline approaching: 20 June 2025.",
//     },
//     { id: 3, type: "success", message: "Your application has been reviewed." },
//   ]);

//   const handleToggleStatus = (taskId) => {
//     const updated = tasks.map((task) =>
//       task.id === taskId
//         ? {
//             ...task,
//             status: task.status === "pending" ? "completed" : "pending",
//           }
//         : task
//     );
//     setTasks(updated);
//   };

//   const filteredTasks = tasks.filter((task) =>
//     filter === "all" ? true : task.status === filter
//   );

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">My Tasks</h3>

//       {/* Alerts Section */}
//       <Row className="mb-3">
//         {alerts.map((alert) => (
//           <Col md={12} key={alert.id}>
//             <Alert variant={alert.type}>{alert.message}</Alert>
//           </Col>
//         ))}
//       </Row>

//       {/* Filter */}
//       <Card className="mb-3">
//         <Card.Body>
//           <Form>
//             <Form.Group as={Row} controlId="taskFilter">
//               <Form.Label column sm="3">
//                 Filter Tasks:
//               </Form.Label>
//               <Col sm="9">
//                 <Form.Select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                 >
//                   <option value="all">All</option>
//                   <option value="pending">Pending</option>
//                   <option value="completed">Completed</option>
//                 </Form.Select>
//               </Col>
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>

//       {/* Task List */}
//       <Card>
//         <Card.Body>
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Task</th>
//                 <th>Status</th>
//                 <th>Toggle</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTasks.map((task, index) => (
//                 <tr key={task.id}>
//                   <td>{index + 1}</td>
//                   <td>{task.title}</td>
//                   <td>
//                     <Badge
//                       bg={task.status === "completed" ? "success" : "warning"}
//                     >
//                       {task.status}
//                     </Badge>
//                   </td>
//                   <td>
//                     <Button
//                       variant={
//                         task.status === "completed" ? "secondary" : "primary"
//                       }
//                       size="sm"
//                       onClick={() => handleToggleStatus(task.id)}
//                     >
//                       Mark as{" "}
//                       {task.status === "completed" ? "Pending" : "Completed"}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredTasks.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No tasks found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default MyTasks;

import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Alert,
  Form,
} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyTasks = () => {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Upload Academic Documents",
      status: "pending",
      due: "2025-06-10",
      file: null,
    },
    {
      id: "2",
      title: "Complete Profile Section",
      status: "completed",
      due: "2025-06-05",
      file: null,
    },
    {
      id: "3",
      title: "Pay Application Fee",
      status: "pending",
      due: "2025-06-15",
      file: null,
    },
    {
      id: "4",
      title: "Check Email for Offer Letter",
      status: "completed",
      due: "2025-06-01",
      file: null,
    },
    {
      id: "5",
      title: "Join WhatsApp Group",
      status: "pending",
      due: "2025-06-12",
      file: null,
    },
  ]);

  const [alerts] = useState([
    { id: 1, type: "info", message: "New program added for Canada 2025." },
    {
      id: 2,
      type: "danger",
      message: "Visa Application deadline: 20 June 2025",
    },
  ]);

  const handleToggleStatus = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === "pending" ? "completed" : "pending",
          }
        : task
    );
    setTasks(updated);
  };

  const handleFileUpload = (e, id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, file: e.target.files[0] } : task
    );
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const getDueStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = (due - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return <Badge bg="danger">Overdue</Badge>;
    if (diff < 3) return <Badge bg="warning">Due Soon</Badge>;
    return <Badge bg="secondary">Upcoming</Badge>;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // reorder in original task list too
    const newOrder = tasks.map(
      (task) => items.find((i) => i.id === task.id) || task
    );

    setTasks(newOrder);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">My Tasks</h3>

      {/* Alerts Section */}
      <Row className="mb-3">
        {alerts.map((alert) => (
          <Col md={12} key={alert.id}>
            <Alert variant={alert.type}>{alert.message}</Alert>
          </Col>
        ))}
      </Row>

      {/* Filter */}
      <Card className="mb-3">
        <Card.Body>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Filter Tasks
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Task List with Drag + Drop */}
      <Card>
        <Card.Body>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <Table
                  bordered
                  hover
                  responsive
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Task</th>
                      <th>Status</th>
                      <th>Due</th>
                      <th>File Upload</th>
                      <th>Toggle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>
                              <Badge
                                bg={
                                  task.status === "completed"
                                    ? "success"
                                    : "warning"
                                }
                              >
                                {task.status}
                              </Badge>
                            </td>
                            <td>
                              {task.due} {getDueStatus(task.due)}
                            </td>
                            <td>
                              <Form.Control
                                type="file"
                                size="sm"
                                onChange={(e) => handleFileUpload(e, task.id)}
                              />
                              {task.file && (
                                <span className="text-success small d-block mt-1">
                                  {task.file.name}
                                </span>
                              )}
                            </td>
                            <td>
                              <Button
                                variant={
                                  task.status === "completed"
                                    ? "secondary"
                                    : "primary"
                                }
                                size="sm"
                                onClick={() => handleToggleStatus(task.id)}
                              >
                                Mark as{" "}
                                {task.status === "completed"
                                  ? "Pending"
                                  : "Completed"}
                              </Button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyTasks;
