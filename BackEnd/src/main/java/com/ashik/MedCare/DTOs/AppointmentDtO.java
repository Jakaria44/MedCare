package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class AppointmentDtO {


    private int id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;

    @JsonIgnore
    private Doctor doctor;
    @JsonIgnore
    private User user;


}
