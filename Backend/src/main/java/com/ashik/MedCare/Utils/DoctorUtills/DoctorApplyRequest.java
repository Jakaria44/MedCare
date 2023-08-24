package com.ashik.MedCare.Utils.DoctorUtills;

import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Entities.DoctorAvailability;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class DoctorApplyRequest {


    private String name;
    private String description;
    private String specialization;
    private String profileImageUrl;
    private String cvUrl;
    private String email;
    private int appointmentFee;
    private List<DoctorAvailability> doctorAvailabilities;




}
