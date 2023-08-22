package com.ashik.MedCare.RequestObject;

import lombok.Data;

@Data
public class AmbulanceRequest {

    private String driverName;

    private String ambulanceModel;

    private boolean isAircon;

    private String ambulanceInfo;

    private String contactInfo;

    private  String location;
}
