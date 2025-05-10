package com.EMP.dto;

import com.EMP.entity.Employee;

public class EmployeeDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private String designation;
    private String department;
    private double salary;
    private String joining_date;

    // Constructors
    public EmployeeDTO() {}

    public EmployeeDTO(Long id, String name, String email, String phone, String gender,
                       String designation, String department, double salary, String joining_date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.designation = designation;
        this.department = department;
        this.salary = salary;
        this.joining_date = joining_date;
    }

    public String getJoining_date() {
		return joining_date;
	}

	public void setJoining_date(String joining_date) {
		this.joining_date = joining_date;
	}

	// Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }
    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }

	
}
