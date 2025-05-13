package com.EMP.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendAccountCreationEmail(String toEmail, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Account Created for Employee Payroll System");
        message.setText("Your account has been successfully created.\nEmail: " + toEmail + "\nPassword: " + password);
        mailSender.send(message);
    }
}

