package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Services.DoctorServices;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;

    @PostMapping("/doctor/apply")
    ResponseEntity<GeneralResponse>applyDoctor(@RequestBody DoctorDtos doctorDtos
                                               ){

        DoctorDtos applydoctor = doctorServices.applydoctor(doctorDtos);

        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully updated post");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);


    }

}
