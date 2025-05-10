package com.EMP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EMP.dto.EmployeeDTO;
import com.EMP.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmail(String email);
    
    @Query("SELECT COUNT(e) FROM Employee e")
    int countEmployees();

	boolean existsByEmail(String email);
	
	@Query("SELECT new com.EMP.dto.EmployeeDTO(e.id, e.name, e.email, e.phone, e.gender, e.designation, e.department, e.salary, e.joining_date) FROM Employee e")
	List<EmployeeDTO> fetchAllEmployeeDTOs();
	
	@Query("SELECT new com.EMP.dto.EmployeeDTO(e.id, e.name, e.email, e.phone, e.gender, e.designation, e.department, e.salary, e.joining_date) FROM Employee e where e.id= :id")
	EmployeeDTO fetchEmployeeDTOs(@Param("id") Long id);
	
	@Query("SELECT new com.EMP.dto.EmployeeDTO(e.id, e.name, e.email, e.phone, e.gender, e.designation, e.department, e.salary, e.joining_date) FROM Employee e where e.email= :email")
	EmployeeDTO fetchEmployeeDTOByEmail(@Param("email") String email);

}
