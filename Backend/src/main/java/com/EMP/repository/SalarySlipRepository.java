package com.EMP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EMP.entity.SalarySlip;

import jakarta.transaction.Transactional;

public interface SalarySlipRepository extends JpaRepository<SalarySlip, Long> {
	@Query("SELECT COUNT(s) FROM SalarySlip s")
    int countSlips();
	List<SalarySlip> findAllByOrderByGeneratedAtDesc();
	@Modifying
	@Transactional
	@Query("DELETE FROM SalarySlip s WHERE s.employeeId = :empId AND MONTH(s.generatedAt) = :month AND YEAR(s.generatedAt) = :year")
	void deleteByEmployeeIdAndMonth(@Param("empId") Long empId, @Param("month") int month, @Param("year") int year);
	void deleteByEmployeeId(Long id);

}
