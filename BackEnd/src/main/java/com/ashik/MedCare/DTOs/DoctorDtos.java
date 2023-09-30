package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Entities.DoctorAvailability;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class DoctorDtos {

    private int id;
    private String name;
    private String description;
    private String specialization;
    private String profileImageUrl;
    private String cvUrl;
    private boolean approve;
    private Date appliedTime;
    private int appointmentFee;
    private String email;
    private List<DoctorAvailability> doctorAvailabilities;
    @JsonIgnore
    private List<AppointMents> appointMents;

}
