package com.EMP.dto;

public class AdminDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;

    // Constructors
    public AdminDTO() {}

    public AdminDTO(Long id, String name, String email, String phone, String gender) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
    }

    // Getters and Setters
    
    public Long getId() {
        return id;
    }
    public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
}
