package com.ashik.MedCare.ApiResponse;

import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.*;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Data
@Getter
@ToString
public class LoginResponse {

    private String jwtToken;
    private boolean authenticate;
    private  UserDto userDto;





}
