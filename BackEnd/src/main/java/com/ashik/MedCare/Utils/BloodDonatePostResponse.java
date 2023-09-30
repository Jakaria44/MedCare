package com.ashik.MedCare.Utils;

import com.ashik.MedCare.Entities.User;
import lombok.Data;

import java.util.Date;

@Data
public class BloodDonatePostResponse {

    private int id;
    private int userId;
    private String userName;
    private String userImageUrl;
    private String userRole;
    private String bloodGroup;

    private boolean availibility;

//    private String location;

    private String division;
    private String district;
    private String upazila;

    private String contact;

    private Date createdDate = new Date();




}
