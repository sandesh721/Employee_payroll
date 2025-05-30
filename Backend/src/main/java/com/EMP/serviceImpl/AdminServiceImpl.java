package com.EMP.serviceImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EMP.entity.Admin;
import com.EMP.entity.Employee;
import com.EMP.entity.SalarySlip;
import com.EMP.repository.AdminRepository;
import com.EMP.repository.EmployeeRepository;
import com.EMP.repository.SalarySlipRepository;
import com.EMP.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepo;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired 
    private SalarySlipRepository salarySlipRepository;
    @Override
    public Admin findAdminByEmail(String email) {
        return adminRepo.findByEmail(email);
    }

    @Override
    public String authenticateAdmin(String email, String password) {
        Admin admin = adminRepo.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return "Login Successful";
        } else {
            return "Invalid Credentials";
        }
    }
    @Override
    public Map<String, Integer> getDashboardStats() {
        Map<String, Integer> stats = new HashMap<>();

        int totalEmployees = employeeRepository.countEmployees();
        int totalAdmins = adminRepo.countAdmins();
        int totalSlips = salarySlipRepository.countSlips();

        stats.put("employees", totalEmployees);
        stats.put("admins", totalAdmins); 
        stats.put("slips", totalSlips);

        return stats;
    }
    @Override
    public String addAdmin(Admin admin) {
        if (adminRepo.existsByEmail(admin.getEmail())) {
            return "Admin with this email already exists!";
        }
        adminRepo.save(admin);
        return "Admin added successfully!";
    }
    @Override
    public List<SalarySlip> calculateSalariesWithTax() {
        List<Employee> employees = employeeRepository.findAll();

        boolean allValid = employees.stream().allMatch(e -> e.getSalary() > 0);
        if (!allValid) {
            throw new IllegalStateException("All employees must have a valid basic salary.");
        }

        List<SalarySlip> slips = new ArrayList<>();

        for (Employee e : employees) {
        	double monthlyBasic = e.getSalary();                  
            double annualIncome = monthlyBasic * 12;              
            double annualTax = calculateTax(annualIncome);        
            double monthlyTax = annualTax / 12.0;                 
            double netSalary = monthlyBasic - monthlyTax;
            salarySlipRepository.deleteByEmployeeIdAndMonth(e.getId(), LocalDate.now().getMonthValue(), LocalDate.now().getYear());
            SalarySlip slip = new SalarySlip();
            slip.setEmployeeId(e.getId());
            slip.setName(e.getName());
            slip.setDesignation(e.getDesignation());
            slip.setBasicSalary(monthlyBasic);
            slip.setTax(monthlyTax);
            slip.setNetSalary(netSalary);
            slip.setDepartment(e.getDepartment());
            slips.add(salarySlipRepository.save(slip));
        }

        return slips;
    }

    // New Tax Regime FY 2023-24
    private double calculateTax(double income) {
        double tax = 0;

        if (income <= 300000) return 0;
        else if (income <= 600000) tax = (income - 300000) * 0.05;
        else if (income <= 900000) tax = 15000 + (income - 600000) * 0.10;
        else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
        else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
        else tax = 150000 + (income - 1500000) * 0.30;

        return tax;
    }

}