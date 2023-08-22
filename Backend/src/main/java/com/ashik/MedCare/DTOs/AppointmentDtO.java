package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;

@Data
public class AppointmentDtO {

    private int id;

    private String description;
    private Date date;
    private Doctor doctor;
    private User user;


}
