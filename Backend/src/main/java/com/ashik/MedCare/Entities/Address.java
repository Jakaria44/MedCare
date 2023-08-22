package com.ashik.MedCare.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String division;
    private String district;
    private String upazila;
    @OneToOne(mappedBy = "address",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private User user;


}
