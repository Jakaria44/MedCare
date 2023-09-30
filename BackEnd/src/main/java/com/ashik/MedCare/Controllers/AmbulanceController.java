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
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulancePageResponse;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceResponse;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.FilterRequest;
import com.ashik.MedCare.Utils.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AmbulanceController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AmbulancePostService ambulancePostService;
    @Autowired
    private AmbulancePostRepository ambulancePostRepository;





    @PostMapping("/createAmbulancePost")
    public ResponseEntity<AmbulanceResponse> createAmbulancePost(
            @RequestBody AmbulanceRequest ambulanceRequest,
            @RequestHeader ("Authorization") String jwt
            ){


                User user = userService.findUserByJwt(jwt);
        ambulanceRequest.setDistrict(ambulanceRequest.getDistrict().toLowerCase());
        ambulanceRequest.setDivision(ambulanceRequest.getDivision().toLowerCase());
        ambulanceRequest.setUpazila(ambulanceRequest.getUpazila().toLowerCase());
        AmbulancePostDTO ambulancePostDTO = AmbulanceMapper.requestToDto(ambulanceRequest);
        ambulancePostDTO.setUser(user);
        ambulancePostDTO.setCreatedDate(new Date());
        AmbulancePostDTO ambulancePostDTO1 = ambulancePostService.cratePost(ambulancePostDTO);
        AmbulanceResponse response = AmbulanceMapper.dtoToResponse(ambulancePostDTO1);


        return new ResponseEntity<AmbulanceResponse>(response, HttpStatus.CREATED);


    }




    @PutMapping("/updateAmbulancePost/{postid}")
    public ResponseEntity<AmbulanceResponse> updatePost(@PathVariable Integer postid,
                                                        @RequestBody AmbulanceRequest ambulanceRequest,
                                                        @RequestHeader ("Authorization") String jwt){


        User user = userService.findUserByJwt(jwt);

        AmbulancePostDTO ambulancePostDTO = AmbulanceMapper.requestToDto(ambulanceRequest);
        AmbulancePostDTO ambulancePostDTO1 = ambulancePostService.updatePost(ambulancePostDTO, postid);
        AmbulanceResponse response = AmbulanceMapper.dtoToResponse(ambulancePostDTO1);





       return new ResponseEntity<AmbulanceResponse>(response,HttpStatus.CREATED);


    }




    @DeleteMapping("protect/deleteambulancePost/{postid}")
    public ResponseEntity<GeneralResponse> deletePost(@PathVariable Integer postid,
                                                      @RequestHeader ("Authorization") String jwt){


        ambulancePostService.deletePost(postid);

          GeneralResponse response = new GeneralResponse();

          response.setMessage("Deleted Successfully");
          response.setSuccess(true);


        return new ResponseEntity<GeneralResponse>(response,HttpStatus.OK);



    }


    @GetMapping("/getambulancepostByid/{id}")
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
    public  ResponseEntity<List<AmbulanceResponse>> getallPost(){
        List<AmbulanceResponse> allambulancePost = ambulancePostService.getAllambulancePost();

        return new ResponseEntity<List<AmbulanceResponse>>(allambulancePost,HttpStatus.OK);
    }


    @GetMapping("/getallambulancepostByUserid/{id}")
    public  ResponseEntity<List<AmbulanceResponse>> getallPostbyUser(@PathVariable Integer id){
        List<AmbulanceResponse> postbyUserId = ambulancePostService.getPostbyUserId(id);

        return new ResponseEntity<List<AmbulanceResponse>>(postbyUserId,HttpStatus.OK);
    }


    @GetMapping("/ambulance/getallpostbySortAndPage")
    public ResponseEntity<AmbulancePageResponse> getAllPostbysortwithPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir



    ){

        AmbulancePageResponse ambulancePageResponse =
                ambulancePostService.allpostWithPagination(pageNumber, pageSize, SortBy, SortDir);


        return new ResponseEntity<AmbulancePageResponse>(ambulancePageResponse,HttpStatus.OK);
    }

    @GetMapping("/ambulance/getallpostbyuserbySortAndPage/{id}")
    public ResponseEntity<AmbulancePageResponse> getAllPostuserbysortwithPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable Integer id



    ){

        AmbulancePageResponse allpostbyUserIdwithPage =
                ambulancePostService.getAllpostbyUserIdwithPage(id, pageNumber, pageSize, SortBy, SortDir);


        return new ResponseEntity<AmbulancePageResponse>( allpostbyUserIdwithPage,HttpStatus.OK);
    }


    @GetMapping("/ambulancePost/filterByDistrictwithPage/{district}")
    public ResponseEntity<AmbulancePageResponse> FilterAmbulancePostByDistrict(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String district



    ){

        district = district.toLowerCase();

        AmbulancePageResponse ambulancePageResponse = ambulancePostService.getpostbyDistrictOnly(district, pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<AmbulancePageResponse>( ambulancePageResponse,HttpStatus.OK);
    }



    @GetMapping("/ambulancePost/filterByDivisionwithPage/{division}")
    public ResponseEntity<AmbulancePageResponse> FilterAmbulancePostByDivision(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String division



    ){

        division = division.toLowerCase();

        AmbulancePageResponse ambulancePageResponse = ambulancePostService.getpostbyDivisionOnly(division, pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<AmbulancePageResponse>( ambulancePageResponse,HttpStatus.OK);
    }


    @GetMapping("/ambulancePost/filterByupazilawithPage/{upazila}")
    public ResponseEntity<AmbulancePageResponse> FilterAmbulancePostByUpazila(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable String upazila



    ){

        upazila = upazila.toLowerCase();

        AmbulancePageResponse ambulancePageResponse = ambulancePostService.getpostbyUpazillaOnly(upazila, pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<AmbulancePageResponse>( ambulancePageResponse,HttpStatus.OK);
    }




    @PostMapping("/ambulancePost/filterByAllwithpage")
    public ResponseEntity<AmbulancePageResponse> FilterAmbulancePostByDistricAndDivisionAndUpazillah(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,
            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @RequestBody FilterRequest filterRequest



            ){

        AmbulancePageResponse ambulancePageResponse = ambulancePostService.getpostbyDistrictandDivitionandUpazillah(filterRequest.getDistrict().toLowerCase(),
                filterRequest.getDivision().toLowerCase(), filterRequest.getUpazila().toLowerCase(), pageNumber, pageSize, SortBy, SortDir);

        return new ResponseEntity<AmbulancePageResponse>( ambulancePageResponse,HttpStatus.OK);
    }




}
