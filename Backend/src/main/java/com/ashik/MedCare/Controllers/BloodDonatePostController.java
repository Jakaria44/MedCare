package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.Entities.Address;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.RequestObject.BloodDonatePostReq;
import com.ashik.MedCare.Services.BloodDonatePostServices;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.BloodDonatePostResponse;
import com.ashik.MedCare.Utils.GeneralResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bloodpost")
public class BloodDonatePostController {

 @Autowired
 private UserService userService;
 @Autowired
 private BloodDonatePostServices bloodDonatePostServices;


 @PostMapping("/create")
 public ResponseEntity<BloodDonatePostResponse> createPost(@RequestBody BloodDonatePostReq bloodDonatePostReq,
                                                           @RequestHeader ("Authorization") String jwt){

             User user = userService.findUserByJwt(jwt);
             BloodDonatePostDto bloodDonatePostDto = new BloodDonatePostDto();
             bloodDonatePostDto.setUser(user);
             bloodDonatePostDto.setBloodGroup(bloodDonatePostReq.getBloodGroup());
//             bloodDonatePostDto.setLocation(bloodDonatePostReq.getLocation());
             bloodDonatePostDto.setContact(bloodDonatePostReq.getContact());

             Address address = user.getAddress();

             bloodDonatePostDto.setDivision(address.getDivision());
             bloodDonatePostDto.setDistrict(address.getDistrict());
             bloodDonatePostDto.setUpazila(address.getUpazila());
             bloodDonatePostDto.setAvailibility(bloodDonatePostReq.isAvailibility());


     BloodDonatePostDto postDto = bloodDonatePostServices.createPost(bloodDonatePostDto);

     BloodDonatePostResponse bloodDonatePostResponse = Mapper.bloodDonatePostResponseMapper(postDto,user);


     return new ResponseEntity<BloodDonatePostResponse>(bloodDonatePostResponse, HttpStatus.OK);


 }

 @PutMapping("/update/{id}")
 public ResponseEntity<BloodDonatePostResponse> updatePost(@PathVariable Integer id,
                                                   @RequestBody BloodDonatePostReq bloodDonatePostReq,
                                                   @RequestHeader ("Authorization") String jwt){

     User user = userService.findUserByJwt(jwt);
     BloodDonatePostDto bloodDonatePostDto = new BloodDonatePostDto();
     bloodDonatePostDto.setUser(user);
     bloodDonatePostDto.setBloodGroup(bloodDonatePostReq.getBloodGroup());
//     bloodDonatePostDto.setLocation(bloodDonatePostReq.getLocation());
     bloodDonatePostDto.setContact(bloodDonatePostReq.getContact());

     BloodDonatePostDto bloodDonatePostDto1 = bloodDonatePostServices.updatePost(bloodDonatePostDto, id);

     BloodDonatePostResponse bloodDonatePostResponse = Mapper.bloodDonatePostResponseMapper(bloodDonatePostDto1,user);

     return new ResponseEntity<BloodDonatePostResponse>(bloodDonatePostResponse, HttpStatus.OK);


 }

 @DeleteMapping("/delete/{id}")
 public  ResponseEntity<GeneralResponse> deletePost(@PathVariable Integer id){

     bloodDonatePostServices.deletePost(id);

     GeneralResponse generalResponse = new GeneralResponse();
     generalResponse.setMessage("succesfully deleted post");
     generalResponse.setSuccess(true);

     return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);

 }


 @GetMapping("/getallpost")
 public ResponseEntity<List <BloodDonatePostDto>> getAllPost(){
     List<BloodDonatePostDto> allBloodDonatePost =
             bloodDonatePostServices.getAllBloodDonatePost();

     return new ResponseEntity<List <BloodDonatePostDto>>(allBloodDonatePost,HttpStatus.OK);
 }


    @GetMapping("/getallpost/{id}")
    public ResponseEntity<List <BloodDonatePostDto>> getAllPostbyUser(@PathVariable Integer id ){
        List<BloodDonatePostDto> allBloodDonatePost =
                bloodDonatePostServices.getAllBloodDonatePostbyUserId(id);

        return new ResponseEntity<List <BloodDonatePostDto>>(allBloodDonatePost,HttpStatus.OK);
    }


    @GetMapping("/getallpostbySort")
    public ResponseEntity<BloodDonatePostPageResponse> getAllPostbysort(
            @RequestParam("pageNumber") Integer pageNumber,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam("SortBy") String SortBy,
            @RequestParam("SortDir") String SortDir


    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse = bloodDonatePostServices.allpostWithPagination(pageNumber, pageSize, SortBy, SortDir);


        return new ResponseEntity<BloodDonatePostPageResponse>(bloodDonatePostPageResponse,HttpStatus.OK);
    }








}
