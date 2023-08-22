package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Entities.DoctorCategory;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
public class DoctorDtos {

    private int id;
    private String name;
    private String description;
    private List<DoctorCategory> doctorCategory;
    private List<AppointMents> appointMents;

}
