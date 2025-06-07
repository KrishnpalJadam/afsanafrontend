// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Button,
//   Table,
//   Form,
//   Modal,
//   Badge,
//   InputGroup,
// } from "react-bootstrap";
// import { FaSearch, FaTrash } from "react-icons/fa";

// import BASE_URL from "../../Config";
// import api from "../../interceptors/axiosInterceptor";

// const AdminStatus = () => {
//   const [leads, setLeads] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterSource, setFilterSource] = useState("");
//   const [filteredLeads, setFilteredLeads] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const response = await api.get(`${BASE_URL}lead`);
//         setLeads(response.data);
//       } catch (error) {
//         console.error("Error fetching leads:", error);
//       }
//     };
//     fetchLeads();
//   }, []);

//   const handleFilter = () => {
//     const filtered = leads.filter((lead) => {
//       const statusMatch = filterStatus === "" || lead.status === filterStatus;
//       const sourceMatch = filterSource === "" || lead.source === filterSource;
//       const searchMatch =
//         searchTerm === "" ||
//         lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         lead.phone?.toLowerCase().includes(searchTerm.toLowerCase());
//       return statusMatch && sourceMatch && searchMatch;
//     });
//     setFilteredLeads(filtered);
//     setCurrentPage(1); // Reset to first page on filter
//   };

//   const handleResetFilter = () => {
//     setFilterStatus("");
//     setFilterSource("");
//     setSearchTerm("");
//     setFilteredLeads(null);
//     setCurrentPage(1);
//   };

//   const handleDeleteLead = async (leadId) => {
//     try {
//       await api.delete(`${BASE_URL}lead/${leadId}`);
//       setLeads(leads.filter((lead) => lead.id !== leadId));
//     } catch (error) {
//       console.error("Error deleting lead:", error);
//     }
//   };

//   const displayLeads = filteredLeads !== null ? filteredLeads : leads;

//   // Pagination calculations
//   const indexOfLastLead = currentPage * itemsPerPage;
//   const indexOfFirstLead = indexOfLastLead - itemsPerPage;
//   const currentLeads = displayLeads.slice(indexOfFirstLead, indexOfLastLead);
//   const totalPages = Math.ceil(displayLeads.length / itemsPerPage);
//   useEffect(() => {
//     handleFilter();
//   }, [searchTerm, filterStatus, filterSource]);

//   return (
//     <Container fluid className="py-3">
//       <h2>Admin Panel - All Leads</h2>

//       <div className="d-flex justify-content-between mb-3 pt-3">
//         <div className="d-flex gap-2">
//           <InputGroup>
//             <Form.Control
//               type="text"
//               placeholder="Search leads..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   handleFilter();
//                 }
//               }}
//             />
//           </InputGroup>
//         </div>
//       </div>

//       <Table striped bordered hover className="text-center">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Contact</th>
//             <th>Asign Counselor</th>
//             <th>Status</th>
//             <th>Inquiry Date</th>
//             <th>Follow up date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentLeads.length > 0 ? (
//             currentLeads.map((lead, index) => (
//               <tr key={lead.id}>
//                 <td>{indexOfFirstLead + index + 1}</td>
//                 <td>{lead?.name}</td>
//                 <td>{lead?.phone}</td>
//                 <td>{lead?.counselor_name || "Unassigned"}</td>
//                 <td>
//                   <Badge bg={lead.status === "In Progress" ? "primary" : "success"}>
//                     {lead?.status}
//                   </Badge>
//                 </td>
//                 <td>{lead?.created_at}</td>
//                 <td>{lead?.follow_up_date}</td>
//                 <td>
//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={() => handleDeleteLead(lead.id)}
//                   >
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8">No leads found.</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <nav>
//           <ul className="pagination justify-content-center">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
//                 Previous
//               </button>
//             </li>
//             {[...Array(totalPages)].map((_, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//               >
//                 <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
//             >
//               <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </Container>
//   );
// };

// export default AdminStatus;



import React from 'react'
import { Tabs, Tab, Table ,Badge } from "react-bootstrap";

function AdminStatus() {
  const totalInquiriesData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      city: "New York",
      course: "Math 101",
      source: "Website",
      status: "In Progress",  // Added status
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      city: "Los Angeles",
      course: "Physics 101",
      source: "Referral",
      status: "Completed",  // Added status
    },
    // More data...
  ];

  const followupsDueTodayData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      city: "New York",
      course: "Math 101",
      source: "Website",
      status: "Pending",  // Added status
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      city: "Los Angeles",
      course: "Physics 101",
      source: "Referral",
      status: "Follow-up",  // Added status
    },
    // More data...
  ];

  const convertedLeadsData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      city: "New York",
      course: "Math 101",
      source: "Website",
      status: "Converted",  // Added status
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "098-765-4321",
      city: "Los Angeles",
      course: "Physics 101",
      source: "Referral",
      status: "Converted",  // Added status
    },
    // More data...
  ];

  const counselorPerformanceData = [
    {
      counselor: "Counselor 1",
      totalLeads: 10,
      convertedLeads: 5,
      status: "Active",  // Added status
    },
    {
      counselor: "Counselor 2",
      totalLeads: 15,
      convertedLeads: 8,
      status: "Inactive",  // Added status
    },
    // More data...
  ];

  const getStatusBackgroundColor = (status) => {
    if (status === "Completed") {
      return "success"; // Green background for completed
    }
    if (status === "In Progress") {
      return "primary"; // Blue background for in progress
    }
    if (status === "Pending") {
      return "warning"; // Blue background for in progress
    }
    if (status === "Follow-up") {
      return "success"; // Blue background for in progress
    }
    if (status === "Active") {
      return "success"; // Blue background for in progress
    }
    if (status === "Inactive") {
      return "warning"; // Blue background for in progress
    }
    return "secondary"; // Default gray background for other statuses
  };
  return (
    <div>
        <div className="mt-4">
      <h1>Total Inquiry</h1>
      <Tabs defaultActiveKey="totalInquiries" id="inquiries-tabs" className="mb-3">
        
        {/* Tab for Total Inquiries */}
        <Tab eventKey="totalInquiries" title="Total Inquiries">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Course</th>
                <th>Source</th>
                <th>Status</th> {/* Added status column */}
                
              </tr>
            </thead>
            <tbody>
              {totalInquiriesData.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{inquiry.id}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.phone}</td>
                  <td>{inquiry.city}</td>
                  <td>{inquiry.course}</td>
                  <td>{inquiry.source}</td>
                  <td>
              <Badge
                bg={getStatusBackgroundColor(inquiry.status)}  // Set the background color based on status
                style={{ color: "white", padding: "5px 10px", borderRadius: "4px" }}  // Set the text color to white
              >
                {inquiry.status} {/* Display the status text */}
              </Badge>
            </td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Tab for Follow-ups Due Today */}
        <Tab eventKey="followUpsDueToday" title="Follow-ups Due Today">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Course</th>
                <th>Source</th>
                <th>Status</th> {/* Added status column */}
              
              </tr>
            </thead>
            <tbody>
              {followupsDueTodayData.map((followUp) => (
                <tr key={followUp.id}>
                  <td>{followUp.id}</td>
                  <td>{followUp.name}</td>
                  <td>{followUp.email}</td>
                  <td>{followUp.phone}</td>
                  <td>{followUp.city}</td>
                  <td>{followUp.course}</td>
                  <td>{followUp.source}</td>
                  <td>
                  <Badge
                bg={getStatusBackgroundColor(followUp.status)}  // Set the background color based on status
                style={{ color: "white", padding: "5px 10px", borderRadius: "4px" }}  // Set the text color to white
              >
                {followUp.status} {/* Display the status text */}
              </Badge>
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Tab for Converted Leads */}
        <Tab eventKey="convertedLeads" title="Converted Leads">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Course</th>
                <th>Source</th>
                <th>Status</th> {/* Added status column */}
             
              </tr>
            </thead>
            <tbody>
              {convertedLeadsData.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.city}</td>
                  <td>{lead.course}</td>
                  <td>{lead.source}</td>
                  <td>{lead.status}</td> {/* Display status */}
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Tab for Counselor-wise Performance */}
        <Tab eventKey="counselorPerformance" title="Counselor-wise Performance">
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th> {/* Index column */}
            <th>Counselor Name</th>
            <th>Total Leads</th>
            <th>Converted Leads</th>
            <th>Status</th> {/* Added status column */}
           
          </tr>
        </thead>
        <tbody>
          {counselorPerformanceData.map((performance, index) => (
            <tr key={performance.counselor}>
              <td>{index + 1}</td> {/* Display the index as the row number */}
              <td>{performance.counselor}</td>
              <td>{performance.totalLeads}</td>
              <td>{performance.convertedLeads}</td>
              <td>
                  <Badge
                bg={getStatusBackgroundColor(performance.status)}  // Set the background color based on status
                style={{ color: "white", padding: "5px 10px", borderRadius: "4px" }}  // Set the text color to white
              >
                {performance.status} {/* Display the status text */}
              </Badge>
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
        </Tab>
      </Tabs>
    </div>
    </div>
  )
}

export default AdminStatus
