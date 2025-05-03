import React, { createContext, useState } from "react";

// Create Context
export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", course: "MBA", status: "New", counselor: "Jane Smith", inquiryDate: "2024-02-20", followUpDate: "2024-02-25" },
    { id: 2, name: "Alice Johnson", course: "Engineering", status: "New", counselor: "Jane Smith", inquiryDate: "2024-02-18", followUpDate: "2024-02-23" },
    { id: 3, name: "Michael Brown", course: "Data Science", status: "New", counselor: "Jane Smith", inquiryDate: "2024-02-22", followUpDate: "2024-02-27" },
  ]);

  // Function to update lead status
  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <LeadContext.Provider value={{ leads, updateLeadStatus }}>
      {children}
    </LeadContext.Provider>
  );
};
