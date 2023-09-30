package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.User;
import lombok.Data;


import java.util.Date;

@Data
public class BloodDonatePostDto {

    private int id;

    private String bloodGroup;

    private boolean availibility;

//    private String location;

    private String division;
    private String district;
    private String upazila;

    private String contact;

    private Date createdDate = new Date();

    private User user;


}
