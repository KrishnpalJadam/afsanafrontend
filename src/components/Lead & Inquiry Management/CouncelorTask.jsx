// CounselorDashboard.jsx (Dummy Data Example)
import React from "react";
import { Card, Table, Button, Container } from "react-bootstrap";

const CounselorTask = () => {
  // Hard-coded counselor name
  const counselorName = "John Smith";

  // Sample tasks with a new "studentEmail" field
  const tasks = [
    {
      title: "Orientation Session",
      dueDate: "2025-12-01",
      counselor: "John Smith",
      student: "Emily Davis",
      studentEmail: "emily@example.com",
      description: "Brief intro session",
      reminder: "Upcoming",
    },
    {
      title: "Project Discussion",
      dueDate: "2025-12-05",
      counselor: "John Smith",
      student: "Sanjana",
      studentEmail: "sanjana@example.com",
      description: "Review project proposal",
      reminder: "Alert",
    },
    {
      title: "Weekly Check-in",
      dueDate: "2025-12-07",
      counselor: "Jane Doe",
      student: "Kabir Singh",
      studentEmail: "kabir@example.com",
      description: "Progress update",
      reminder: "Upcoming",
    },
  ];

  const filteredTasks = tasks.filter(
    (task) => task.counselor === counselorName
  );

  return (
    <Container className="mt-4">
      <div className="d-flex  justify-content-between align-items-center mb-3">
        <h2 className="mb-3 mb-md-0">Assign Task</h2>
        <Button variant="outline-secondary">Export</Button>
      </div>
      <Card className="p-4 shadow-sm m-3">
        {filteredTasks.length === 0 ? (
          <p>No tasks assigned yet for {counselorName}.</p>
        ) : (
          <Table
            bordered
            hover
            responsive
            className="mt-3 text-center text-nowrap"
          >
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Due Date</th>
                <th>Student Name</th>
                <th>Description</th>
                <th>Reminder</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.student}</td>
                  <td>{task.description}</td>
                  <td>{task.reminder}</td>
                  <td>
                    <Button
                      variant="success"
                      href={`mailto:${
                        task.studentEmail
                      }?subject=Regarding your task: ${encodeURIComponent(
                        task.title
                      )}`}
                    >
                      Contact Student
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default CounselorTask;
