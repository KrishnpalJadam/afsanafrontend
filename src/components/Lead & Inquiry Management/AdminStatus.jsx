import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Table, Badge, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../../interceptors/axiosInterceptor';
import BASE_URL from '../../Config';
import { MdDelete } from 'react-icons/md';

function AdminStatus() {
  const [convertData, setConvertData] = useState([]);
  const [getPerformance, setPerformance] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    branch: '',
    source: '',
    startDate: '',
    endDate: '',
  });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await api.get('getAllleadsstatus');
        const allInquiries = response.data;
        const userRole = localStorage.getItem('role');
        const userId = localStorage.getItem('user_id');

        const filteredInquiries =
          userRole === 'admin'
            ? allInquiries
            : allInquiries.filter(
              (inquiry) => inquiry.counselor_id === parseInt(userId)
            );

        setInquiries(filteredInquiries);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  useEffect(() => {
    const fetchConvertedLeads = async () => {
      try {
        const response = await api.get(`${BASE_URL}AllConvertedLeadsinquiries`);
        setConvertData(response.data);
      } catch (error) {
        console.error('Error fetching converted leads:', error);
      }
    };

    const fetchPerformance = async () => {
      try {
        const response = await api.get(`${BASE_URL}counselor-performance`);
        setPerformance(response.data || []);
      } catch (error) {
        console.log('Error fetching performance data:', error);
        setPerformance([]);
      }
    };

    fetchConvertedLeads();
    fetchPerformance();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [inquiries, filters]);

  const filterInquiries = () => {
    let data = [...inquiries];

    if (filters.search) {
      data = data.filter(
        (inq) =>
          inq?.full_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          inq?.phone_number?.includes(filters.search)
      );
    }

    if (filters.branch) {
      data = data.filter((inq) => inq.branch === filters.branch);
    }

    if (filters.source) {
      data = data.filter((inq) => inq.source === filters.source);
    }

    if (filters.startDate && filters.endDate) {
      data = data.filter((inq) => {
        const inquiryDate = new Date(inq.date_of_inquiry);
        return (
          inquiryDate >= new Date(filters.startDate) &&
          inquiryDate <= new Date(filters.endDate)
        );
      });
    }

    setFilteredData(data);
  };

  const getStatusBadge = (status) => {
    let variant = 'dark';
    let textColor = '#fff';

    switch (status) {
      case 'Not Interested':
        variant = 'secondary';
        break;
      case 'In Review':
        variant = 'warning';
        textColor = '#000';
        break;
      case 'New':
        variant = 'info';
        textColor = '#000';
        break;
      case 'Converted to Lead':
        variant = 'success';
        break;
      case 'Not Eligible':
        variant = 'danger';
        break;
      case 'Follow-up':
        variant = 'primary';
        break;
      default:
        variant = 'dark';
    }

    const handleDeleteInquiry = async (id) => {
      try {
        await api.delete(`${BASE_URL}inquiries/${id}`);
        setInquiries({
          ...inquiries,
          todayInquiries: inquiries.todayInquiries.filter(
            (inq) => inq.id !== id
          ),
        });
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    };

    return (
      <Badge
        bg={variant}
        style={{
          padding: '5px 10px',
          borderRadius: '4px',
          color: textColor,
        }}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div>
      <div className="mt-4 p-2">
        <h3>Total Inquiry</h3>
        <div className="card mt-3">
          <Tabs defaultActiveKey="allleads" id="inquiries-tabs" className="mb-3">
           

            <Tab eventKey="allleads" title="All Leads">
            
              <Row className="mb-4 p-3">
                <Col md={3}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    style={{ height: '40px' }}
                    placeholder="Search by Name or Phone"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    style={{ height: '40px' }}
                    value={filters.branch}
                    onChange={(e) =>
                      setFilters({ ...filters, branch: e.target.value })
                    }
                  >
                    <option value="">All Branches</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Sylhet">Sylhet</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    style={{ height: '40px' }}
                    value={filters.source}
                    onChange={(e) =>
                      setFilters({ ...filters, source: e.target.value })
                    }
                  >
                    <option value="">All Sources</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event</option>
                    <option value="agent">Agent</option>
                    <option value="office_visit">Office Visit</option>
                    <option value="hotline">Hotline</option>
                    <option value="seminar">Seminar</option>
                    <option value="expo">Expo</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    style={{ height: '40px' }}
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    style={{ height: '40px' }}
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                  />
                    
                  <button
                    className="btn btn-secondary w-100 mt-4"
                    onClick={() =>
                      setFilters({
                        search: '',
                        branch: '',
                        source: '',
                        startDate: '',
                        endDate: '',
                      })
                    }
                  >
                    Reset
                  </button>
          
                </Col>
            
              </Row>
           
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Inquiry ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th>Branch</th>
                    <th>Inquiry Type</th>
                    <th>Date of Inquiry</th>
                    <th>Country</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((inq, index) => (
                      <tr key={inq.id}>
                        <td>{index + 1}</td>
                        <td>{inq.full_name}</td>
                        <td>{getStatusBadge(inq.lead_status)}</td>
                        <td>{inq.phone_number}</td>
                        <td>{inq.branch}</td>
                        <td>{inq.inquiry_type}</td>
                        <td>
                          {new Date(inq.date_of_inquiry)
                            .toISOString()
                            .split('T')[0]}
                        </td>
                        <td>{inq.country}</td>
                        <td> <Button variant="danger" size="sm" onClick={() => handleDeleteInquiry(inq.id)} className="ms-2">  <MdDelete />
                        </Button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">No inquiries available.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Tab>

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
                    <th>Status</th>
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
                      <td>{getStatusBadge(lead.lead_status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="counselorPerformance" title="Counselor-wise Performance">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Counselor Name</th>
                    <th>Total Leads</th>
                    <th>Converted Leads</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getPerformance.map((performance, index) => (
                    <tr key={performance.counselor}>
                      <td>{index + 1}</td>
                      <td>{performance.counselor_name}</td>
                      <td>{performance.total_leads}</td>
                      <td>{performance.converted_leads}</td>
                      <td>{getStatusBadge(performance.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdminStatus;
