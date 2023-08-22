package com.ashik.MedCare.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class DoctorCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String categoryName;
    @ManyToMany(mappedBy ="doctorCategory",fetch = FetchType.LAZY)
    private List<Doctor>doctors;

}
