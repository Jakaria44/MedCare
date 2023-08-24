package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.DoctorAvailability;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.DoctorAvailabilityRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.DoctorServices;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorApplyRequest;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorMapper;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorPagePost;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;
    @Autowired
    private DoctorAvailabilityRepository doctorAvailabilityRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/doctor/apply")
    ResponseEntity<GeneralResponse>applyDoctor(@RequestBody DoctorApplyRequest applyRequest
                                               ){

        DoctorDtos doctorDtos = DoctorMapper.applyRequestToDto(applyRequest);
        doctorDtos.setApprove(false);


        List<DoctorAvailability> doctorAvailabilities = doctorDtos.getDoctorAvailabilities();
        doctorDtos.setDoctorAvailabilities(null);


        DoctorDtos applydoctor = doctorServices.applydoctor(doctorDtos);
        Doctor doctor = new Doctor();
        DoctorMapper.dtoToDoctor(applydoctor,doctor);
        doctor.setId(applydoctor.getId());

        for (DoctorAvailability doctorAvailability : doctorAvailabilities){
            doctorAvailability.setDoctor(doctor);
            doctorAvailabilityRepository.save(doctorAvailability);
        }




        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully updated post");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);


    }


    //doctorApprovedByAdmin
    @GetMapping("/doctor/approved/{id}")
    public ResponseEntity<Boolean> approveDoctor(@PathVariable Integer id){

        Doctor doctor = doctorServices.approveDoctor(id);
        String s = RandomStringUtils.randomAlphanumeric(8);

        User user = new User();
        user.setEmail(doctor.getEmail());
        user.setRole("ROLE_DOCTOR");
        user.setName(doctor.getName());
        user.setPassword(s);

        User save = userRepository.save(user);

        //Send email to doctor with Credential


        return new ResponseEntity<Boolean>(true,HttpStatus.OK);

    }

    @GetMapping("/doctor/allbyapprove/{approve}")
    public ResponseEntity<List<DoctorDtos>> getAllApproveDoctor(@PathVariable boolean approve){
        List<DoctorDtos> allApprovedDoctor = doctorServices.getAllApprovedDoctor(approve);

        return new ResponseEntity<List<DoctorDtos>>(allApprovedDoctor,HttpStatus.OK);
    }

    @GetMapping("/doctor/getAllapproveDoctorWithPge/{approve}")
    public ResponseEntity<DoctorPagePost> getAllPostbyUserIdwithPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "appliedTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable boolean approve ){


        DoctorPagePost doctorPagePost = doctorServices.allDoctorPage(pageNumber, pageSize, SortBy, SortDir, approve);


        return new ResponseEntity<DoctorPagePost>(doctorPagePost,HttpStatus.OK);
    }




}
