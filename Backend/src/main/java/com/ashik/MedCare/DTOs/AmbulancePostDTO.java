package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.User;
import lombok.Data;

@Data
public class AmbulancePostDTO {

    private int id ;

    private String driverName;

    private String ambulanceModel;

    private boolean isAircon;

    private String ambulanceInfo;

    private String contactInfo;

    private  String location;

    private User user;
}
