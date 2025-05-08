import React, { useEffect, useState } from "react";
import "../css/Filter.css";

const FilterComponent = ({ salarySlips, setFilteredSlips }) => {
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salarySort, setSalarySort] = useState("");

  const [designationOptions, setDesignationOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    // Extract unique designations and departments for dropdowns
    const designations = [...new Set(salarySlips.map(s => s.designation))];
    const departments = [...new Set(salarySlips.map(s => s.department))];
    setDesignationOptions(designations);
    setDepartmentOptions(departments);
  }, [salarySlips]);

  useEffect(() => {
    applyFilters();
  }, [search, designation, department, salarySort]);

  const applyFilters = () => {
    let filtered = [...salarySlips];

    // Text search on name, email, phone
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (slip) =>
          slip.name.toLowerCase().includes(lower) ||
          slip.email.toLowerCase().includes(lower) ||
          slip.phone.toLowerCase().includes(lower)
      );
    }

    if (designation) {
      filtered = filtered.filter(slip => slip.designation === designation);
    }

    if (department) {
      filtered = filtered.filter(slip => slip.department === department);
    }

    if (salarySort === "asc") {
      filtered = filtered.sort((a, b) => a.salary - b.salary);
    } else if (salarySort === "desc") {
      filtered = filtered.sort((a, b) => b.salary - a.salary);
    }

    setFilteredSlips(filtered);
  };

  return (
    <div className="filter-component">
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, email, or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
        <option value="">All Designations</option>
        {designationOptions.map((d, idx) => (
          <option key={idx} value={d}>{d}</option>
        ))}
      </select>

      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        {departmentOptions.map((d, idx) => (
          <option key={idx} value={d}>{d}</option>
        ))}
      </select>

      <select value={salarySort} onChange={(e) => setSalarySort(e.target.value)}>
        <option value="">Sort Salary</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterComponent;
