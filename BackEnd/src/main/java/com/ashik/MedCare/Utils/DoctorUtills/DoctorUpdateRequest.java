package com.ashik.MedCare.Utils.DoctorUtills;

import com.ashik.MedCare.Entities.DoctorAvailability;
import lombok.Data;

import java.util.List;

@Data
public class DoctorUpdateRequest {

    private String name;
    private String description;
    private String specialization;
    private String profileImageUrl;
    private int appointmentFee;
    private List<DoctorAvailability> doctorAvailabilities;
}
