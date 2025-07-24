import React, { useEffect, useState } from "react";
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
import axios from "axios";
import BASE_URL from "../../../Config";


ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ProcessorsDashboard = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [chartData, setChartData] = useState([]);


  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}sataffdashboard`);
      if (res.data.success) {
        const { total_leads, total_inquiries, chart_data } = res.data.data;
        setTotalLeads(total_leads);
        setTotalInquiries(total_inquiries);
        setChartData(chart_data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const barData = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Count",
        data: chartData.map((item) => item.value),
        backgroundColor: ["#0049B7", "#FF6B00"],
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Distribution",
        data: chartData.map((item) => item.value),
        backgroundColor: ["#0049B7", "#FF6B00"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid py-4" style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      <h2 className="mb-4 fw-bold">Processor Dashboard</h2>

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
            <h5>Total Application</h5>
            <h2>{5}</h2>
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
            <h5>Total Document</h5>
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
            <h5 className="mb-3">Applications vs Documents (Bar)</h5>
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
            <h5 className="mb-3">Applications vs Documents (Pie)</h5>
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

export default ProcessorsDashboard;
