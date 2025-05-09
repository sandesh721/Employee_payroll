package com.EMP.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EMP.dto.LoginRequest;
import com.EMP.entity.Employee;
import com.EMP.entity.SalarySlip;
import com.EMP.repository.EmployeeRepository;
import com.EMP.repository.SalarySlipRepository;
import com.EMP.serviceImpl.EmployeeServiceImpl;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private SalarySlipRepository salarySlipRepository;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String result = employeeService.authenticateEmployee(email, password);
        if (result.equals("Login Successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    @PostMapping("/profile")
    public ResponseEntity<Employee> getAdminByEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Employee employee = employeeRepository.findByEmail(email);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(employee);
    }
    
    @PostMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findByEmail(updatedEmployee.getEmail());

        if (existingEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }

        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setPhone(updatedEmployee.getPhone());
        existingEmployee.setGender(updatedEmployee.getGender());

        employeeRepository.save(existingEmployee);
        return ResponseEntity.ok("Profile updated successfully.");
    }
    
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String idStr = request.get("id");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        Employee employee = null;

        // Try fetching by email if provided
        if (email != null && !email.isEmpty()) {
            employee = employeeRepository.findByEmail(email);
        }

        // If not found by email, try by ID
        if (employee == null && idStr != null && !idStr.isEmpty()) {
            try {
                Long id = Long.parseLong(idStr);
                employee = employeeRepository.findById(id).orElse(null);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Invalid ID format");
            }
        }

        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (!employee.getPassword().equals(oldPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
        }

        employee.setPassword(newPassword);
        employeeRepository.save(employee);

        return ResponseEntity.ok("Password Successfully Updated");
    }

    @GetMapping("/salary-slips/{email}")
    public ResponseEntity<List<SalarySlip>> getAllSalarySlips(@PathVariable String email) {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<SalarySlip> slips = salarySlipRepository.findByEmployeeId(employee.getId());
        return ResponseEntity.ok(slips);
    }


}