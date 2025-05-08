package com.EMP.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.EMP.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(a) FROM Admin a")
    int countAdmins();
}