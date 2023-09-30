package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Column(length = 10000)
    private String description;
    private String specialization;
    private String email;
    private String profileImageUrl;
    private int appointmentFee;
    private String cvUrl;
    private boolean approve;
    private Date appliedTime;
    private  int loginUserId;
    private int earnings;
    @OneToMany(mappedBy = "doctor")
    @JsonManagedReference
    private List<DoctorAvailability> doctorAvailabilities;
    @OneToMany(mappedBy = "doctor")
    private List<AppointMents> appointMents;
    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Slot>slots;




}
