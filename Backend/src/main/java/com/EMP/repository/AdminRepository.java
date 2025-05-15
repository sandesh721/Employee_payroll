package com.EMP.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.EMP.dto.AdminDTO;
import com.EMP.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(a) FROM Admin a")
    int countAdmins();
    
    @Query("SELECT new com.EMP.dto.AdminDTO(a.id, a.name, a.email, a.phone, a.gender) FROM Admin a WHERE a.email = :email")
    AdminDTO fetchAdminDTOByEmail(@Param("email") String email);

    @Query("SELECT new com.EMP.dto.AdminDTO(a.id, a.name, a.email, a.phone, a.gender) FROM Admin a")
    List<AdminDTO> fetchAllAdminDTOs();



}