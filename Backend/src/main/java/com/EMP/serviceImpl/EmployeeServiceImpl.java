package com.EMP.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.EMP.dto.EmployeeDTO;
import com.EMP.entity.Employee;
import com.EMP.repository.EmployeeRepository;
import com.EMP.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepo;
    
    
    public Employee findEmployeeByEmail(String email) {
        return employeeRepo.findByEmail(email);
    }
    @Override
    public String authenticateEmployee(String email, String password) {
        Employee employee = employeeRepo.findByEmail(email);
        if (employee != null && employee.getPassword().equals(password)) {
            return "Login Successful";
        } else {
            return "Invalid Credentials";
        }
    }
    @Override
    public String addEmployee(Employee employee) {
        if (employeeRepo.existsByEmail(employee.getEmail())) {
            return "Employee with this email already exists.";
        }
        employeeRepo.save(employee);
        return "Employee added successfully.";
    }
	@Override
	public List<EmployeeDTO> getAllEmployees() {
		return employeeRepo.fetchAllEmployeeDTOs();
	}
}