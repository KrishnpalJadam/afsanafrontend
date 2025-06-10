
import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Table, Badge } from "react-bootstrap";
import api from '../../interceptors/axiosInterceptor';
import BASE_URL from '../../Config';

function AdminStatus() {
  const [convertData, setConvertData] = useState([]);
  const [getPerformance, setPerformance] = useState([])
  useEffect(() => {
    const fetchConvertedLeads = async () => {
      try {
        const response = await api.get(`${BASE_URL}AllConvertedLeadsinquiries`);
        setConvertData(response.data);

      } catch (error) {
        console.error("Error fetching converted leads:", error);
      }
    };

    fetchConvertedLeads();
  }, []);

useEffect(() => {
  const fetchPerformance = async () => {
    try {
      const response = await api.get(`${BASE_URL}counselor-performance`);
      setPerformance(response.data || []);  // Set default empty array if no data
      console.log("Performance Data:", response.data);
    } catch (error) {
      console.log("Error fetching performance data:", error);
      setPerformance([]);  // Set empty array in case of an error
    }
  };
  fetchPerformance();
}, []);

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
        <Tabs defaultActiveKey="convertedLeads" id="inquiries-tabs" className="mb-3">

          {/* Tab for Total Inquiries */}
         


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
                  <th>Status</th> {/* Status column */}
                </tr>
              </thead>
              <tbody>
                {convertData.map((lead, index) => (
                  <tr key={lead.id}>
                    <td>{index + 1}</td>
                    <td>{lead.full_name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone_number}</td>
                    <td>{lead.city}</td>
                    <td>{lead.course_name}</td>
                    <td>{lead.source}</td>
                    <td>
                      <Badge
                         // Set background color based on lead status
                        style={{ color: 'white', padding: '5px 10px', borderRadius: '4px', backgroundColor: "green" }}
                      >
                        {lead.lead_status}  {/* Display status */}
                      </Badge>
                    </td>
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
                {getPerformance.map((performance, index) => (
                  <tr key={performance.counselor}>
                    <td>{index + 1}</td> {/* Display the index as the row number */}
                    <td>{performance.counselor_name}</td>
                    <td>{performance.total_leads}</td>
                    <td>{performance.converted_leads}</td>
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
