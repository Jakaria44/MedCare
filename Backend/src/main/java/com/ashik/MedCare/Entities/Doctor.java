package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<DoctorCategory>doctorCategory;
    @OneToMany(mappedBy = "doctor")
    private List<AppointMents> appointMents;
}
