package com.EMP.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EMP.entity.Admin;
import com.EMP.entity.Employee;
import com.EMP.repository.AdminRepository;
import com.EMP.repository.EmployeeRepository;
import com.EMP.service.OtpService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private OtpService otpService;
    @Autowired
    private AdminRepository adminRepo;
    @Autowired
    private EmployeeRepository employeeRepo;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");

        if ("ADMIN".equals(role) && !adminRepo.existsByEmail(email) ||
            "EMPLOYEE".equals(role) && !employeeRepo.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        otpService.generateOtp(email);
        return ResponseEntity.ok("OTP sent to email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String role = body.get("role");
        String otp = body.get("otp");
        String newPassword = body.get("newPassword");

        if (!otpService.validateOtp(email, otp)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
        }

        if ("ADMIN".equals(role)) {
            Admin admin = adminRepo.findByEmail(email);
            admin.setPassword(newPassword);
            adminRepo.save(admin);
        } else {
            Employee emp = employeeRepo.findByEmail(email);
            emp.setPassword(newPassword);
            employeeRepo.save(emp);
        }

        return ResponseEntity.ok("Password updated successfully");
    }
}
