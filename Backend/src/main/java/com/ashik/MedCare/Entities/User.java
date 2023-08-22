package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    @OneToOne
    private Address address;
    private String role;
    private String password;
    @OneToMany(mappedBy = "user")
    private List<AppointMents>appointMents;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<BloodDonatePost>bloodDonatePostList;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<AmbulancePost>ambulancePostList;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<FundRaisePost>fundRaisePostList;



}
