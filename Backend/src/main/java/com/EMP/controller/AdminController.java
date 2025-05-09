package com.EMP.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EMP.dto.LoginRequest;
import com.EMP.entity.Admin;
import com.EMP.entity.Employee;
import com.EMP.entity.SalarySlip;
import com.EMP.repository.AdminRepository;
import com.EMP.repository.EmployeeRepository;
import com.EMP.repository.SalarySlipRepository;
import com.EMP.service.AdminService;
import com.EMP.service.EmployeeService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/admin")
 
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private SalarySlipRepository salarySlipRepository;

    // Admin login
    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        String result = adminService.authenticateAdmin(email, password);

        if (result.equals("Login Successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Integer>> getDashboardStats() {
        Map<String, Integer> stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
    
    @PostMapping("/add-employee")
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        String result = employeeService.addEmployee(employee);
        if (result.equals("Employee added successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    @PostMapping("/add-admin")
    public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
    	try {
            String response = adminService.addAdmin(admin);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/employees")
    public ResponseEntity<?> getAllEmployees() {
        try {
            List<Employee> employees = employeeService.getAllEmployees();
            if (employees.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No employees found.");
            }
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error fetching employees: " + e.getMessage());
        }
    }

    
    @PostMapping("/calculate-salaries")
    public ResponseEntity<?> calculateSalaries() {
        try {
            List<SalarySlip> slips = adminService.calculateSalariesWithTax();
            return ResponseEntity.ok(slips);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/employee/{id}")
    @Transactional
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        if (!employeeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
        salarySlipRepository.deleteByEmployeeId(id);
        employeeRepository.deleteById(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
    @GetMapping("/salary-slips")
    public List<SalarySlip> getAllSalarySlips() {
        return salarySlipRepository.findAll();
    }
    @GetMapping("/all-admins")
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
    
    @PostMapping("/profile")
    public ResponseEntity<Admin> getAdminByEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(admin);
    }
    
    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody Admin updatedAdmin) {
        Admin existingAdmin = adminRepository.findByEmail(updatedAdmin.getEmail());

        if (existingAdmin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found.");
        }

        existingAdmin.setName(updatedAdmin.getName());
        existingAdmin.setPhone(updatedAdmin.getPhone());
        existingAdmin.setGender(updatedAdmin.getGender());

        adminRepository.save(existingAdmin);
        return ResponseEntity.ok("Profile updated successfully.");
    }
    @GetMapping("/viewEmployee/{id}")
    public ResponseEntity<Employee> viewEmployeeById(@PathVariable Long id) {
        Employee emp = employeeRepository.findById(id).orElse(null);
        if (emp == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(emp);
    }
    @PostMapping("/update-Empprofile")
    public ResponseEntity<String> updateProfile(@RequestBody Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findByEmail(updatedEmployee.getEmail());

        if (existingEmployee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }

        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setPhone(updatedEmployee.getPhone());
        existingEmployee.setGender(updatedEmployee.getGender());
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        existingEmployee.setDesignation(updatedEmployee.getDesignation());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setSalary(updatedEmployee.getSalary());

        employeeRepository.save(existingEmployee);
        return ResponseEntity.ok("Profile updated successfully.");
    }





}