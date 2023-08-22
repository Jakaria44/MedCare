package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.AppointmentServices;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api/v1")
public class AppointmentsController {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentServices appointmentServices;


    @PostMapping("/createappoint/{doctorId}/{userId}")
    public ResponseEntity<GeneralResponse>createAppointment(@RequestBody AppointmentDtO appointmentDtO,
                                                            @PathVariable Integer doctorId,
                                                            @PathVariable Integer userId){


        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        appointmentDtO.setDoctor(doctor);
        appointmentDtO.setUser(user);
        appointmentDtO.setDate(new Date());

        appointmentServices.createAppoinMent(appointmentDtO);


        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully updated post");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);

    }





}
