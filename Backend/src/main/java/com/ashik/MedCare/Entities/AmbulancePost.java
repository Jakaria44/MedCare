package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

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
    @Column(name = "Description")
    private String ambulanceInfo;
    @Column(name = "Contact")
    private String contactInfo;
    @Column(name = "location")
    private  String location;
    @ManyToOne
    @JsonBackReference
    private User user;

}
