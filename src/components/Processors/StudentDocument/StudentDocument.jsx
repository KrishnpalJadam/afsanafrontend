import React, { useState } from 'react';

const StudentDocument = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John",
      identifyingName: "john-jul-24-abc",
      phone: "9876543210",
      document: "Aadhar.pdf"
    },
    {
      id: 2,
      name: "Rahul",
      identifyingName: "rahul-jul-24-xyz",
      phone: "9123456780",
      document: "Passport.pdf"
    }
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'start', color: '#0d6efd', marginBottom: '20px' }}>
        Student Document
      </h1>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: '#f8f9fa',
            
          }}
        >
          <thead>
            <tr style={{textAlign:"center" , font:"bold"}}>
              <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>#</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Student Name</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Identifying Name</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Phone No</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Document</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id} style={{ textAlign: 'center' }}>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{stu.id}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{stu.name}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{stu.identifyingName}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{stu.phone}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6', color: '#198754', fontWeight: 'bold' }}>
                  {stu.document}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDocument;
