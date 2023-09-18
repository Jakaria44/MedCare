package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@Entity
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonManagedReference
    @ToString.Exclude
    private Address address;
    private String role;
    private String password;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    private List<AppointMents>appointMents;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    private List<BloodDonatePost>bloodDonatePostList;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    private List<AmbulancePost>ambulancePostList;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    private List<FundRaisePost>fundRaisePostList;



}
