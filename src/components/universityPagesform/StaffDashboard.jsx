import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const StaffDashboard = () => {
  const totalLeads = 5;
  const totalInquiries = 12;

  const barData = {
    labels: ["Inquiries", "Leads"],
    datasets: [
      {
        label: "Count",
        data: [totalInquiries, totalLeads],
        backgroundColor: ["#FF6B00", "#0049B7"],
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ["Leads", "Inquiries"],
    datasets: [
      {
        label: "Distribution",
        data: [totalLeads, totalInquiries],
        backgroundColor: ["#0049B7", "#FF6B00"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid py-4" style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <h2 className="mb-4 fw-bold">Staff Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div
            style={{
              background: "linear-gradient(135deg, #0049B7, #003f9a)",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              height: "100%",
            }}
          >
            <h5>Total Leads</h5>
            <h2>{totalLeads}</h2>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            style={{
              background: "linear-gradient(135deg, #FF6B00, #e65a00)",
              color: "#fff",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              height: "100%",
            }}
          >
            <h5>Total Inquiries</h5>
            <h2>{totalInquiries}</h2>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <h5 className="mb-3">Leads vs Inquiries (Bar)</h5>
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              height: "100%",
            }}
          >
            <h5 className="mb-3">Leads vs Inquiries (Pie)</h5>
            <Pie
              data={pieData}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
