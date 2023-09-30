package com.ashik.MedCare.ApiResponse;

import com.ashik.MedCare.DTOs.DoctorDtos;
import lombok.Data;

@Data
public class DoctorLoginresponse {

    private String jwtToken;
    private boolean Authenticated;
    private DoctorDtos doctorDtos;
}
