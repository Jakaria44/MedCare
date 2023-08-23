package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Entities.AmbulancePost;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.AmbulancePostRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.RequestObject.AmbulanceRequest;
import com.ashik.MedCare.Services.AmbulancePostService;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceMapper;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceResponse;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AmbulanceController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AmbulancePostService ambulancePostService;
    @Autowired
    private AmbulancePostRepository ambulancePostRepository;





    @PostMapping("/createPost")
    public ResponseEntity<AmbulanceResponse> createAmbulancePost(
            @RequestBody AmbulanceRequest ambulanceRequest,
            @RequestHeader ("Authorization") String jwt
            ){


                User user = userService.findUserByJwt(jwt);

        AmbulancePostDTO ambulancePostDTO = AmbulanceMapper.requestToDto(ambulanceRequest);
        ambulancePostDTO.setUser(user);
        ambulancePostDTO.setCreatedDate(new Date());
        AmbulancePostDTO ambulancePostDTO1 = ambulancePostService.cratePost(ambulancePostDTO);
        AmbulanceResponse response = AmbulanceMapper.dtoToResponse(ambulancePostDTO1);


        return new ResponseEntity<AmbulanceResponse>(response, HttpStatus.CREATED);


    }




    @PutMapping("/updateambulance/{id}")
    public ResponseEntity<AmbulanceResponse> updatePost(@PathVariable Integer id,
                                                        @RequestBody AmbulanceRequest ambulanceRequest,
                                                        @RequestHeader ("Authorization") String jwt){


        User user = userService.findUserByJwt(jwt);

        AmbulancePostDTO ambulancePostDTO = AmbulanceMapper.requestToDto(ambulanceRequest);
        AmbulancePostDTO ambulancePostDTO1 = ambulancePostService.updatePost(ambulancePostDTO, id);
        AmbulanceResponse response = AmbulanceMapper.dtoToResponse(ambulancePostDTO1);





       return new ResponseEntity<AmbulanceResponse>(response,HttpStatus.CREATED);


    }




    @DeleteMapping("/deleteambulance/{id}")
    public ResponseEntity<GeneralResponse> deletePost(@PathVariable Integer id,
                                                      @RequestHeader ("Authorization") String jwt){


        ambulancePostService.deletePost(id);

          GeneralResponse response = new GeneralResponse();

          response.setMessage("Deleted Successfully");
          response.setSuccess(true);


        return new ResponseEntity<GeneralResponse>(response,HttpStatus.OK);



    }


    @GetMapping("/ambulance/{id}")
    public ResponseEntity<AmbulanceResponse>getPostById(@PathVariable Integer id){


        Optional<AmbulancePost> byId = ambulancePostRepository.findById(id);

        if(!byId.isPresent()){
            throw  new BadCredentialsException("post not found");
        }

        AmbulancePost ambulancePost = byId.get();
        AmbulancePostDTO ambulancePostDTO = AmbulanceMapper.postDTO(ambulancePost);
        AmbulanceResponse response = AmbulanceMapper.dtoToResponse(ambulancePostDTO);


        return new ResponseEntity<AmbulanceResponse>(response,HttpStatus.OK);


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
