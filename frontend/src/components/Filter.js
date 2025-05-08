import React, { useEffect, useState } from "react";
import "../css/Filter.css";

const FilterComponent = ({
  data = [],
  setFilteredData,
  showDepartment = true,
  showSalarySort = true,
}) => {
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salarySort, setSalarySort] = useState("");

  const [designationOptions, setDesignationOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    const designations = [...new Set(data.map(item => item.designation))];
    const departments = [...new Set(data.map(item => item.department))];
    setDesignationOptions(designations);
    setDepartmentOptions(departments);
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [search, designation, department, salarySort]);

  const applyFilters = () => {
    let filtered = [...data];

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          (item.name?.toLowerCase() || "").includes(lower) ||
          (item.email?.toLowerCase() || "").includes(lower) ||
          (item.phone?.toLowerCase() || "").includes(lower)
      );
    }

    if (designation) {
      filtered = filtered.filter(item => item.designation === designation);
    }

    if (showDepartment && department) {
      filtered = filtered.filter(item => item.department === department);
    }

    if (showSalarySort && salarySort === "asc") {
      filtered = filtered.sort((a, b) => a.salary - b.salary);
    } else if (showSalarySort && salarySort === "desc") {
      filtered = filtered.sort((a, b) => b.salary - a.salary);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="filter-component">
      <input
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

      {showDepartment && (
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departmentOptions.map((d, idx) => (
            <option key={idx} value={d}>{d}</option>
          ))}
        </select>
      )}

      {showSalarySort && (
        <select value={salarySort} onChange={(e) => setSalarySort(e.target.value)}>
          <option value="">Sort Salary</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      )}
    </div>
  );
};

export default FilterComponent;
