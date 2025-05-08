package com.EMP.service;

import java.util.List;
import java.util.Map;

import com.EMP.entity.Admin;
import com.EMP.entity.SalarySlip;

public interface AdminService {
	Admin findAdminByEmail(String email);
    String authenticateAdmin(String email, String password);
	Map<String, Integer> getDashboardStats();
	String addAdmin(Admin admin);
	List<SalarySlip> calculateSalariesWithTax();
}
