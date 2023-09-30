package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.DTOs.SlotDto;
import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.DoctorAvailability;
import com.ashik.MedCare.Entities.Slot;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.DoctorAvailabilityRepository;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Repository.SlotRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.DoctorServices;
import com.ashik.MedCare.Services.ServiceImplementation.EmailServiceImpl;
import com.ashik.MedCare.Services.SlotServices;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorApplyRequest;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorMapper;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorPagePost;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorUpdateRequest;
import com.ashik.MedCare.Utils.GeneralResponse;
import com.ashik.MedCare.Utils.SLOT.SlotUtil;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DoctorController {

    @Autowired
    private DoctorServices doctorServices;
    @Autowired
    private DoctorAvailabilityRepository doctorAvailabilityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private SlotServices slotServices;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailServiceImpl emailService;




    ;@PostMapping("/doctor/apply")
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
        generalResponse.setMessage("succesfully applied");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);


    }


    //doctorApprovedByAdmin
    @GetMapping("/protect/doctor/approved/{id}")
    public ResponseEntity<GeneralResponse> approveDoctor(@PathVariable Integer id){

        Doctor doctor = doctorServices.approveDoctor(id);
        String s = RandomStringUtils.randomAlphanumeric(8);

//        User user = new User();
//        user.setEmail(doctor.getEmail());
//        user.setRole("ROLE_DOCTOR");
//        user.setName(doctor.getName());
//        user.setPassword(s);
//
//        User save = userRepository.save(user);

        UserDto userDto = new UserDto();
        userDto.setName(doctor.getName());
        userDto.setPassword(s);
        userDto.setRole("ROLE_DOCTOR");
        userDto.setEmail(doctor.getEmail());
        UserDto userDto1 = userService.RegisterUser(userDto);

        System.out.println(s);
        doctor.setLoginUserId(userDto1.getId());

        doctorRepository.save(doctor);

        String subject = "Credential for Medcare PlatForm";
        String message = "Your user eamil is "+ userDto1.getEmail() + "Password : "+ s +" use this credential for log in";

        emailService.SendEmail(userDto1.getEmail(),subject,message);



        List<DoctorAvailability> doctorAvailabilities = doctor.getDoctorAvailabilities();



        for(DoctorAvailability doctorAvailability : doctorAvailabilities){
            LocalTime startTime = doctorAvailability.getStartTime();
            LocalTime endTime = doctorAvailability.getEndTime();
            String weekDays = doctorAvailability.getWeekDays().toUpperCase();

            List<LocalDate> localDates = SlotUtil.upcomingAllDates(weekDays);

//            System.out.println(localDates);


            for(LocalDate localDate : localDates){
                LocalTime temp = startTime;
                LocalTime midstart = temp;
                while (midstart != endTime){
                    LocalTime slotStart = temp;
                    midstart = temp.plusHours(1);
                    temp = midstart;
                    Slot slot = new Slot();
                    slot.setStartTime(slotStart);
                    slot.setEndTime(midstart);
                    slot.setLocalDate(localDate);
                    slot.setDoctor(doctor);
                    slotRepository.save(slot);


                }
            }



        }




        //Send email to doctor with Credential



        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("Email sent to doctor with credential");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);

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


    @GetMapping("/getSingleDoctor/{doctorId}")
    public  ResponseEntity<DoctorDtos> getSingleDoctor(@PathVariable Integer doctorId){

        Doctor getsingledoctor = doctorServices.getsingledoctor(doctorId);
        DoctorDtos doctorDtos = DoctorMapper.doctorToDtos(getsingledoctor, new DoctorDtos());

        return  new ResponseEntity<DoctorDtos>(doctorDtos,HttpStatus.OK);

    }


    @GetMapping("Slot/SingleDoctor/{doctorId}")
    public  ResponseEntity<List<SlotDto>> getSingleDoctorSlots(@PathVariable Integer doctorId){

        List<SlotDto> allSlotofSingleDoctor = slotServices.getAllSlotofSingleDoctor(doctorId);


        return  new ResponseEntity<List<SlotDto>>(allSlotofSingleDoctor,HttpStatus.OK);

    }


    @PutMapping("/protect/doctor/update/{doctorId}")
    public ResponseEntity<DoctorDtos> updateDoctorInfo(@PathVariable Integer doctorId,
                                                       @RequestBody DoctorUpdateRequest updateRequest) {

        Doctor getsingledoctor = doctorServices.getsingledoctor(doctorId);

        getsingledoctor.setName(updateRequest.getName());
        getsingledoctor.setDescription(updateRequest.getDescription());
        getsingledoctor.setSpecialization(updateRequest.getSpecialization());
        getsingledoctor.setProfileImageUrl(updateRequest.getProfileImageUrl());
        getsingledoctor.setAppointmentFee(updateRequest.getAppointmentFee());

        List<DoctorAvailability> doctorAvailabilities = updateRequest.getDoctorAvailabilities();

        List<DoctorAvailability> doctorAvailabilities1 = getsingledoctor.getDoctorAvailabilities();

        List<Slot> slots = getsingledoctor.getSlots();


        slotRepository.deleteAll(slots);
        doctorAvailabilityRepository.deleteAll(doctorAvailabilities1);

       for (DoctorAvailability doctorAvailability : doctorAvailabilities){
           doctorAvailability.setDoctor(getsingledoctor);

       }

        List<DoctorAvailability> collect = doctorAvailabilities.stream().map((doctrinal) -> doctorAvailabilityRepository.save(doctrinal)).collect(Collectors.toList());

//       DoctorAvailability doctorAvailability = new DoctorAvailability();
//       doctorAvailability.setStartTime(LocalTime.now());
//       doctorAvailability.setEndTime(LocalTime.now());
//       doctorAvailability.setWeekDays("Sunday");
//       doctorAvailability.setDoctor(getsingledoctor);
//       doctorAvailabilityRepository.save(doctorAvailability);

       getsingledoctor.setDoctorAvailabilities(collect);

        for(DoctorAvailability doctorAvailability : collect){
            LocalTime startTime = doctorAvailability.getStartTime();
            LocalTime endTime = doctorAvailability.getEndTime();
            String weekDays = doctorAvailability.getWeekDays().toUpperCase();

            List<LocalDate> localDates = SlotUtil.upcomingAllDates(weekDays);

            for(LocalDate localDate : localDates){
                LocalTime temp = startTime;
                LocalTime midstart = temp;
                while (midstart != endTime){
                    LocalTime slotStart = temp;
                    midstart = temp.plusHours(1);
                    temp = midstart;
                    Slot slot = new Slot();
                    slot.setStartTime(slotStart);
                    slot.setEndTime(midstart);
                    slot.setLocalDate(localDate);
                    slot.setDoctor(getsingledoctor);
                    slotRepository.save(slot);


                }
            }



        }




        DoctorDtos doctorDtos = DoctorMapper.doctorToDtos(getsingledoctor, new DoctorDtos());

        return new ResponseEntity<DoctorDtos>(doctorDtos,HttpStatus.OK);


    }


    @GetMapping("/doctor/getAllDoctorbySpecializationWithPge/{specialization}")
    public ResponseEntity<DoctorPagePost> getAlldoctorByspecialization(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "appliedTime") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String specialization ){


        DoctorPagePost doctorPagePost = doctorServices.getAlldoctorbySpecialization(specialization,pageNumber,pageSize,SortBy,SortDir);


        return new ResponseEntity<DoctorPagePost>(doctorPagePost,HttpStatus.OK);
    }

    @GetMapping("/doctor/getAllSpecialization")
    public ResponseEntity<List<String>> getAlldoctorByspecialization(){


        List<String> getallspecialization = doctorServices.getallspecialization();


        return new ResponseEntity<List<String>>(getallspecialization,HttpStatus.OK);
    }


    @DeleteMapping("/protect/deleteDoctor/{doctorid}")
    public ResponseEntity<GeneralResponse> deleteDoctor(@PathVariable Integer doctorid){

        boolean b = doctorServices.deleteDoctor(doctorid);

        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setSuccess(true);
        generalResponse.setMessage("doctor deleted successfully ");

        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);

    }











}
