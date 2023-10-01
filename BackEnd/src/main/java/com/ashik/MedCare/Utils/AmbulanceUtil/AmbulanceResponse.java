package com.ashik.MedCare.Utils.AmbulanceUtil;

import com.ashik.MedCare.Entities.User;
import lombok.Data;

import java.util.Date;

@Data
public class AmbulanceResponse {

    private int id ;
    private int userId;
    private String userName;
    private String userRole;

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




}
