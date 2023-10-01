package com.ashik.MedCare.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class WeekDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
//    @OneToOne(cascade = CascadeType.ALL,mappedBy = "weekDays")
//    private DoctorAvailability doctorAvailability;

}
