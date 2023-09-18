package com.ashik.MedCare.RequestObject;

import com.ashik.MedCare.Entities.User;
import lombok.Data;

@Data
public class AmbulanceRequest {

    private String driverName;

    private String ambulanceModel;

    private boolean isAircon;

    private String ambulanceImageName;

    private String ambulanceInfo;

    private String contactInfo;

    private String division;
    private String district;
    private String upazila;




}
