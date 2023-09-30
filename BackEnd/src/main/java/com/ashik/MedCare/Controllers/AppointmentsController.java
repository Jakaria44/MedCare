package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.RequestObject.AppointmentRequest;
import com.ashik.MedCare.Services.AppointmentServices;
import com.ashik.MedCare.Utils.AppointMentUtill.AppointmentMapper;
import com.ashik.MedCare.Utils.AppointMentUtill.AppointmentResponse;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AppointmentsController {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentServices appointmentServices;


    @PostMapping("/protect/createappoint/{doctorId}/{userId}")
    public ResponseEntity<AppointmentResponse>createAppointment(@RequestBody AppointmentRequest request,
                                                            @PathVariable Integer doctorId,
                                                            @PathVariable Integer userId){


        AppointmentDtO appointmentDtO = AppointmentMapper.RequestToDto(new AppointmentDtO(), request);
        Optional<Doctor> byId = doctorRepository.findById(doctorId);
        appointmentDtO.setDoctor(byId.get());
        Optional<User> byId1 = userRepository.findById(userId);
        appointmentDtO.setUser(byId1.get());

        AppointmentDtO appoinMent = appointmentServices.createAppoinMent(appointmentDtO);

        AppointmentResponse appointmentResponse = AppointmentMapper.dtoToResponse(appoinMent, new AppointmentResponse());




        return new ResponseEntity<AppointmentResponse>(appointmentResponse, HttpStatus.OK);

    }

    @GetMapping("/protect/appointment/user/upcoming/{userid}")
    public ResponseEntity<List<AppointmentResponse>>getUpcomingAppointment(
            @PathVariable Integer userid,
            @RequestParam(name = "SortBy" ,defaultValue = "startTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "asc") String Sortdir
    ){

        List<AppointmentResponse> appointmentResponses = appointmentServices.upcomingAppointmentForPatient(userid,SortBy,Sortdir);

        return new ResponseEntity<List<AppointmentResponse>>(appointmentResponses,HttpStatus.OK);

    }


    @GetMapping("/protect/appointment/user/ongoing/{id}")
    public ResponseEntity<List<AppointmentResponse>>getongoingAppointment(
            @PathVariable Integer id,
            @RequestParam(name = "SortBy" ,defaultValue = "startTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "asc") String Sortdir
    ){

        List<AppointmentResponse> appointmentResponses = appointmentServices.ongoingAppointmentForPatient(id,SortBy,Sortdir);

        return new ResponseEntity<List<AppointmentResponse>>(appointmentResponses,HttpStatus.OK);

    }


    @GetMapping("protect/appointment/doctor/upcoming/{id}")
    public ResponseEntity<List<AppointmentResponse>>getUpcomingAppointmentforDoctor(
            @PathVariable Integer id,
            @RequestParam(name = "SortBy" ,defaultValue = "startTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "asc") String Sortdir
    ){

        List<AppointmentResponse> appointmentResponses = appointmentServices.upcomingAppointmentForDoctor(id,SortBy,Sortdir);

        return new ResponseEntity<List<AppointmentResponse>>(appointmentResponses,HttpStatus.OK);

    }


    @GetMapping("protect/appointment/doctor/ongoing/{id}")
    public ResponseEntity<List<AppointmentResponse>>getongoingAppointmentforDoctor(
            @PathVariable Integer id,
            @RequestParam(name = "SortBy" ,defaultValue = "startTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "asc") String Sortdir
    ){

        List<AppointmentResponse> appointmentResponses = appointmentServices.ongoingAppointmentForDoctor(id,SortBy,Sortdir);

        return new ResponseEntity<List<AppointmentResponse>>(appointmentResponses,HttpStatus.OK);

    }









}
