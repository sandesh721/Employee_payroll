package com.EMP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.EMP.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmail(String email);
    
    @Query("SELECT COUNT(e) FROM Employee e")
    int countEmployees();

	boolean existsByEmail(String email);
}
