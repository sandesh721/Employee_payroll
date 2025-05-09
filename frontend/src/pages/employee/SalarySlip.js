import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import html2pdf from "html2pdf.js";
import "../../css/AllSalarySlips.css";
const SalarySlip = () => {
  const [salarySlips, setSalarySlips] = useState([]);

  useEffect(() => {
    const fetchSlips = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`/employee/salary-slips/${user.email}`);
        setSalarySlips(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching salary slips", error);
      }
    };
    fetchSlips();
  }, []);

  const exportPDF = () => {
    const element = document.getElementById("salary-slip-table");
    const opt = {
      margin: 0.5,
      filename: "All_Salary_Slips.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };


  return (
    <div className="salary-slips-container" id="main-content">
      <h2 >Salary Slip</h2>

      <button onClick={exportPDF} >
        Export to PDF
      </button>

      <div  >
        <table id="salary-slip-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Basic Salary</th>
              <th>Tax Deduction</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {salarySlips.map((slip, index) => (
              <tr key={index}>
                <td>{slip.generatedAt}</td>
                <td>{slip.name}</td>
                <td>₹{slip.basicSalary}</td>
                <td>₹{slip.tax}</td>
                <td>₹{slip.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalarySlip;
