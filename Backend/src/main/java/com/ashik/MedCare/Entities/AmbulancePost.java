package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@Entity
public class AmbulancePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    @Column(name = "Driver_Name")
    private String driverName;
    @Column(name = "Model")
    private String ambulanceModel;
    @Column(name = "AirCon")
    private boolean isAircon;
    @Column(name = "ImageName")
    private String ambulanceImageName;
    @Column(name = "Description")
    private String ambulanceInfo;
    @Column(name = "Contact")
    private String contactInfo;
    private String division;
    private String district;
    private String upazila;
    private Date createdDate;
    @ManyToOne
    @JsonBackReference
    private User user;

}
