package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.*;
import lombok.Data;
import lombok.Getter;


import java.util.List;
@Data
@Getter
public class UserDto {

    private int id;
    private String name;
    private String email;
    private Address address;
    private String role;
    private String password;

    private List<AppointMents> appointMents;

    private List<BloodDonatePost>bloodDonatePostList;

    private List<AmbulancePost>ambulancePostList;

    private List<FundRaisePost>fundRaisePostList;
}
