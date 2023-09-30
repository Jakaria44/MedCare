package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.Entities.Address;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.RequestObject.BloodDonatePostReq;
import com.ashik.MedCare.Services.BloodDonatePostServices;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.*;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulancePageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class BloodDonatePostController {

 @Autowired
 private UserService userService;
 @Autowired
 private BloodDonatePostServices bloodDonatePostServices;


 @PostMapping("/protect/blooddonatepost/create")
 public ResponseEntity<BloodDonatePostResponse> createPost(@RequestBody BloodDonatePostReq bloodDonatePostReq,
                                                           @RequestHeader ("Authorization") String jwt){

             User user = userService.findUserByJwt(jwt);
             BloodDonatePostDto bloodDonatePostDto = new BloodDonatePostDto();
             bloodDonatePostDto.setUser(user);
             bloodDonatePostDto.setBloodGroup(bloodDonatePostReq.getBloodGroup());
//             bloodDonatePostDto.setLocation(bloodDonatePostReq.getLocation());
             bloodDonatePostDto.setContact(bloodDonatePostReq.getContact());
             bloodDonatePostDto.setAvailibility(bloodDonatePostReq.isAvailibility());

             Address address = user.getAddress();

             bloodDonatePostDto.setDivision(address.getDivision().toLowerCase());
             bloodDonatePostDto.setDistrict(address.getDistrict().toLowerCase());
             bloodDonatePostDto.setUpazila(address.getUpazila().toLowerCase());



     BloodDonatePostDto postDto = bloodDonatePostServices.createPost(bloodDonatePostDto);

     System.out.println(user.getImageUrl());

     BloodDonatePostResponse bloodDonatePostResponse = Mapper.bloodDonatePostResponseMapper(postDto,user);


     return new ResponseEntity<BloodDonatePostResponse>(bloodDonatePostResponse, HttpStatus.OK);


 }

 @PutMapping("/protect/blooddonatepost/update/{postid}")
 public ResponseEntity<BloodDonatePostResponse> updatePost(@PathVariable Integer postid,
                                                   @RequestBody BloodDonatePostReq bloodDonatePostReq,
                                                   @RequestHeader ("Authorization") String jwt){

     User user = userService.findUserByJwt(jwt);
     BloodDonatePostDto bloodDonatePostDto = new BloodDonatePostDto();
     bloodDonatePostDto.setUser(user);
     bloodDonatePostDto.setBloodGroup(bloodDonatePostReq.getBloodGroup());
//     bloodDonatePostDto.setLocation(bloodDonatePostReq.getLocation());
     bloodDonatePostDto.setContact(bloodDonatePostReq.getContact());
     bloodDonatePostDto.setAvailibility(bloodDonatePostReq.isAvailibility());

     Address address = user.getAddress();

     bloodDonatePostDto.setDivision(address.getDivision().toLowerCase());
     bloodDonatePostDto.setDistrict(address.getDistrict().toLowerCase());
     bloodDonatePostDto.setUpazila(address.getUpazila().toLowerCase());



     BloodDonatePostDto bloodDonatePostDto1 = bloodDonatePostServices.updatePost(bloodDonatePostDto, postid);

     BloodDonatePostResponse bloodDonatePostResponse = Mapper.bloodDonatePostResponseMapper(bloodDonatePostDto1,user);

     return new ResponseEntity<BloodDonatePostResponse>(bloodDonatePostResponse, HttpStatus.OK);


 }

 @DeleteMapping("/protect/blooddonatepost/delete/{postid}")
 public  ResponseEntity<GeneralResponse> deletePost(@PathVariable Integer postid){

     bloodDonatePostServices.deletePost(postid);

     GeneralResponse generalResponse = new GeneralResponse();
     generalResponse.setMessage("succesfully deleted post");
     generalResponse.setSuccess(true);

     return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);

 }


 @GetMapping("/blooddonatepost/getallpost")
 public ResponseEntity<List <BloodDonatePostDto>> getAllPost(){
     List<BloodDonatePostDto> allBloodDonatePost =
             bloodDonatePostServices.getAllBloodDonatePost();

     return new ResponseEntity<List <BloodDonatePostDto>>(allBloodDonatePost,HttpStatus.OK);
 }


    @GetMapping("/blooddonatepost/getallpost/{userid}")
    public ResponseEntity<List <BloodDonatePostDto>> getAllPostbyUser(@PathVariable Integer userid ){
        List<BloodDonatePostDto> allBloodDonatePost =
                bloodDonatePostServices.getAllBloodDonatePostbyUserId(userid);

        return new ResponseEntity<List <BloodDonatePostDto>>(allBloodDonatePost,HttpStatus.OK);
    }


    @GetMapping("/blooddonatepost/getallpostbySortandPage")
    public ResponseEntity<BloodDonatePostPageResponse> getAllPostbysortwithPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @RequestParam (name = "availability",defaultValue = "true") boolean availability


    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse =
                bloodDonatePostServices.allpostWithPagination(pageNumber, pageSize, SortBy, SortDir,availability);


        return new ResponseEntity<BloodDonatePostPageResponse>(bloodDonatePostPageResponse,HttpStatus.OK);
    }



    @GetMapping("/blooddonatepost/getallpostbySortwithoutPage")
    public ResponseEntity<List <BloodDonatePostResponse>> getAllPost(@RequestParam("availability") boolean availability){

        List<BloodDonatePostDto> allpostDescSortbyCreatedDate =
                bloodDonatePostServices.getAllpostDescSortbyCreatedDate(availability);

        List<BloodDonatePostResponse> collect =
                allpostDescSortbyCreatedDate.stream().map((post) -> Mapper.bloodDonatePostResponseMapper(post, post.getUser())).collect(Collectors.toList());

        return new ResponseEntity<List <BloodDonatePostResponse>>(collect,HttpStatus.OK);
    }


    @GetMapping("/blooddonatepost/getuserpostbySort/{userId}")
    public ResponseEntity<List <BloodDonatePostResponse>> getAllPostbyUserId(
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable Integer userId ){

        List<BloodDonatePostDto> allpostbyUserId = bloodDonatePostServices.getAllpostbyUserId(userId, SortBy, SortDir);

        List<BloodDonatePostResponse> collect =
                allpostbyUserId.stream().map((post) -> Mapper.bloodDonatePostResponseMapper(post, post.getUser())).collect(Collectors.toList());

        return new ResponseEntity<List <BloodDonatePostResponse>>(collect,HttpStatus.OK);
    }


    @GetMapping("/protect/blooddonatepost/getuserpostbyPage/{userId}")
    public ResponseEntity<BloodDonatePostPageResponse> getAllPostbyUserIdwithPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable Integer userId ){

        BloodDonatePostPageResponse allpostbyUserIdwithPage =
                bloodDonatePostServices.getAllpostbyUserIdwithPage(userId, pageNumber, pageSize, SortBy, SortDir);



        return new ResponseEntity<BloodDonatePostPageResponse>(allpostbyUserIdwithPage,HttpStatus.OK);
    }



    @GetMapping("/bloodDonatepost/filterByDistrict/{district}")
    public ResponseEntity<BloodDonatePostPageResponse> FilterBloodDonatePostByDistrict(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String district



    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse = bloodDonatePostServices.getallbyDistrictOnly(district.toLowerCase(), pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<BloodDonatePostPageResponse>( bloodDonatePostPageResponse,HttpStatus.OK);
    }



    @GetMapping("/bloodDonatePost/filterByDivision/{division}")
    public ResponseEntity<BloodDonatePostPageResponse> FilterBloodPostByDivision(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String division



    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse = bloodDonatePostServices.getallbydivisionOnly(division.toLowerCase(), pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<BloodDonatePostPageResponse>(bloodDonatePostPageResponse,HttpStatus.OK);
    }


    @GetMapping("/bloodDonatePost/filterByupazila/{upazila}")
    public ResponseEntity<BloodDonatePostPageResponse> FilterBloodDonatePostByUpazila(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String upazila



    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse = bloodDonatePostServices.getallbyupazilaOnly(upazila.toLowerCase(), pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<BloodDonatePostPageResponse>(bloodDonatePostPageResponse,HttpStatus.OK);
    }




    @PostMapping("/bloodDonatePost/filterByAll")
    public ResponseEntity<BloodDonatePostPageResponse> FilterBloodDonatePostByDistricAndDivisionAndUpazillah(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @RequestBody FilterRequest filterRequest



    ){

        BloodDonatePostPageResponse bloodDonatePostPageResponse = bloodDonatePostServices.getallbyDistrictDivisionUpazilla(filterRequest.getDistrict().toLowerCase(),
                filterRequest.getDivision().toLowerCase(), filterRequest.getUpazila().toLowerCase(), pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<BloodDonatePostPageResponse>(bloodDonatePostPageResponse,HttpStatus.OK);
    }


















}
