package com.EMP.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.EMP.dto.EmployeeDTO;
import com.EMP.entity.Employee;

public interface EmployeeService {
	

	String addEmployee(Employee employee);

	String authenticateEmployee(String email, String password);

	List<EmployeeDTO> getAllEmployees();

}
