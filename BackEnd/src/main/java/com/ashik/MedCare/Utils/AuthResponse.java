package com.ashik.MedCare.Utils;

import lombok.Data;

@Data
public class AuthResponse {

    private String jwtToken;
    private boolean isAuth;

}
