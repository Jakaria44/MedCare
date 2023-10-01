package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class BloodDonatePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "Blood_Group")
    private String bloodGroup;
    @Column(name = "Available")
    private boolean availibility;
//    @Column(name = "Location")
//    private String location;

    private String division;
    private String district;
    private String upazila;

    @Column(name = "Contact")
    private String contact;
    @Column(name = "Created")
    private Date createdDate;
    @ManyToOne
    @JsonBackReference
    private User user;

}
