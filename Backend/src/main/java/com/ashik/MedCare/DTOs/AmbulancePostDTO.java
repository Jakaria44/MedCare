package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.User;
import lombok.Data;

import java.util.Date;

@Data
public class AmbulancePostDTO {

    private int id ;

    private String driverName;

    private String ambulanceModel;

    private boolean isAircon;

    private String ambulanceImageName;

    private String ambulanceInfo;

    private String contactInfo;

    private String division;
    private String district;
    private String upazila;
    private Date createdDate;

    private User user;
}
