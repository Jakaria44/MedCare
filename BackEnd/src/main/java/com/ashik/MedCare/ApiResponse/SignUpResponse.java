package com.ashik.MedCare.ApiResponse;

import com.ashik.MedCare.DTOs.UserDto;
import lombok.Data;

@Data
public class SignUpResponse {

    private String jwtToken;
    private boolean authenticate;
    private UserDto userDto;


}
