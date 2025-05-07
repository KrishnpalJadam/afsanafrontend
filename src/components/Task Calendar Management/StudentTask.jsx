  import React, { useEffect, useState } from "react";
  import {
    Container,
    Card,
    Table,
    Button,
    Badge,
    Form,
  } from "react-bootstrap";
  import api from "../../interceptors/axiosInterceptor";

  const MyTasks = () => {
    const [studentid, setStudentId] = useState("");
    const [tasksData, setTasksData] = useState([]);
    const [notesData, setNotesData] = useState({}); // to store notes locally by task id

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

    const handleNoteChange = (taskId, value) => {
      setNotesData((prevNotes) => ({
        ...prevNotes,
        [taskId]: value,
      }));
    };

    const handleNoteSend = async (taskId) => {
      try {
        const noteValue = notesData[taskId] || "";
        console.log(`Sending PATCH to task/${taskId} with notes: ${noteValue}`);
    
        await api.patch(`update_task/${taskId}`, {
          notes: noteValue,
        });
    
        alert("Notes sent successfully.");
    
        // 🧹 Clear the note input for this task
        setNotesData((prevNotes) => {
          const newNotes = { ...prevNotes };
          delete newNotes[taskId];
          return newNotes;
        });
    
        fetchTasks();
      } catch (error) {
        console.error("Error sending notes:", error);
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
                  <th>Notes</th>
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
                            task.status === "Completed"
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
                        {task.status === "Pending" ? (
                          <Form.Control
                            type="text"
                            placeholder="Write your note..."
                            value={notesData[task.id] || ""}
                            onChange={(e) =>
                              handleNoteChange(task.id, e.target.value)
                            }
                          />
                        ) : (
                          task.notes || "-"
                        )}
                      </td>
                      <td>
                        {task.status === "Pending" ? (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleNoteSend(task.id)}
                          >
                            Mark as Complete
                          </Button>
                        ) : (
                          <Badge bg="success">Completed</Badge>
                        )}
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
      </Container>
    );
  };

  export default MyTasks;
