package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.Configuration.JwTokenProvider;
import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.RequestObject.AmbulanceRequest;
import com.ashik.MedCare.Services.AmbulancePostService;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.AmbulanceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AmbulanceController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AmbulancePostService ambulancePostService;





    @PostMapping("/createPost")
    public ResponseEntity<AmbulanceResponse> createAmbulancePost(
            @RequestBody AmbulanceRequest ambulanceRequest,
            @RequestHeader ("Authorization") String jwt
            ){


                User user = userService.findUserByJwt(jwt);

            AmbulancePostDTO ambulancePostDTO = new AmbulancePostDTO();

            ambulancePostDTO.setAmbulanceInfo(ambulanceRequest.getAmbulanceInfo());
            ambulancePostDTO.setAmbulanceModel(ambulanceRequest.getAmbulanceModel());
            ambulancePostDTO.setAircon(ambulanceRequest.isAircon());
            ambulancePostDTO.setContactInfo(ambulanceRequest.getContactInfo());
            ambulancePostDTO.setDriverName(ambulanceRequest.getDriverName());
            ambulancePostDTO.setLocation(ambulanceRequest.getLocation());
            ambulancePostDTO.setUser(user);

            ambulancePostService.cratePost(ambulancePostDTO);

        AmbulanceResponse ambulanceResponse = new AmbulanceResponse();
        ambulanceResponse.setMessage("craeted successfully");
        ambulanceResponse.setIsCreated("true");


            return new ResponseEntity<AmbulanceResponse>(ambulanceResponse, HttpStatus.CREATED);


    }


    @PutMapping("/updateambulance/{id}")
    public ResponseEntity<AmbulanceResponse> updatePost(@PathVariable Integer id,
                                                        @RequestBody AmbulanceRequest ambulanceRequest,
                                                        @RequestHeader ("Authorization") String jwt){


        User user = userService.findUserByJwt(jwt);

        AmbulancePostDTO ambulancePostDTO = new AmbulancePostDTO();

        ambulancePostDTO.setAmbulanceInfo(ambulanceRequest.getAmbulanceInfo());
        ambulancePostDTO.setAmbulanceModel(ambulanceRequest.getAmbulanceModel());
        ambulancePostDTO.setAircon(ambulanceRequest.isAircon());
        ambulancePostDTO.setContactInfo(ambulanceRequest.getContactInfo());
        ambulancePostDTO.setDriverName(ambulanceRequest.getDriverName());
        ambulancePostDTO.setLocation(ambulanceRequest.getLocation());
        ambulancePostDTO.setUser(user);

        AmbulancePostDTO ambulancePostDTO1 = ambulancePostService.updatePost(ambulancePostDTO,id);


        AmbulanceResponse ambulanceResponse = new AmbulanceResponse();
        ambulanceResponse.setMessage("updated  successfully");
        ambulanceResponse.setIsCreated("true");


       return new ResponseEntity<AmbulanceResponse>(ambulanceResponse,HttpStatus.CREATED);


    }

    @DeleteMapping("/deleteambulance/{id}")
    public ResponseEntity<AmbulanceResponse> deletePost(@PathVariable Integer id,
                                                        @RequestHeader ("Authorization") String jwt){


        ambulancePostService.deletePost(id);

        AmbulanceResponse ambulanceResponse = new AmbulanceResponse();
        ambulanceResponse.setMessage("Deleted  successfully");
        ambulanceResponse.setIsCreated("true");


        return new ResponseEntity<AmbulanceResponse>(ambulanceResponse,HttpStatus.OK);



    }


    @GetMapping("/getallambulancepost")
    public  ResponseEntity<List<AmbulancePostDTO>> getallPost(){
        List<AmbulancePostDTO> allambulancePost = ambulancePostService.getAllambulancePost();

        return new ResponseEntity<List<AmbulancePostDTO>>(allambulancePost,HttpStatus.OK);
    }


    @GetMapping("/getallambulancepost/{id}")
    public  ResponseEntity<List<AmbulancePostDTO>> getallPostbyUser(@PathVariable Integer id){
        List<AmbulancePostDTO> allambulancePost = ambulancePostService.getPostbyUserId(id);

        return new ResponseEntity<List<AmbulancePostDTO>>(allambulancePost,HttpStatus.OK);
    }





}
