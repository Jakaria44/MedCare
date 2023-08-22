package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.FundRaisePostRepository;
import com.ashik.MedCare.RequestObject.BloodDonatePostReq;
import com.ashik.MedCare.RequestObject.FundraiseRequest;
import com.ashik.MedCare.Services.FundraisePostService;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.GeneralResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class FundRaisPostController {

    @Autowired
    private UserService userService;
    @Autowired
    private FundraisePostService fundraisePostService;
    @Autowired
    private FundRaisePostRepository fundRaisePostRepository;


    @PostMapping("/fundpost/create")
    ResponseEntity<GeneralResponse>createPost(@RequestBody FundraiseRequest request,
                                              @RequestHeader ("Authorization") String jwt){

        User user = userService.findUserByJwt(jwt);

        FundRaisePostDto fundRaisePostDto = new FundRaisePostDto();
        fundRaisePostDto.setPostContent(request.getPostContent());
        fundRaisePostDto.setTitle(request.getTitle());
        fundRaisePostDto.setAmount(request.getAmount());
        fundRaisePostDto.setUser(user);
        fundRaisePostDto.setPostImages(null);
        fundRaisePostDto.setProveDocuments(null);

        fundraisePostService.createPost(fundRaisePostDto);

        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully created fundpost");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);


    }

    @PutMapping("fundpost/update/{id}")
    public ResponseEntity<GeneralResponse> updatePost(@PathVariable Integer id,
                                                      @RequestBody FundraiseRequest request,
                                                      @RequestHeader ("Authorization") String jwt){

        User user = userService.findUserByJwt(jwt);

        Optional<FundRaisePost> byId = fundRaisePostRepository.findById(id);
        FundRaisePost fundRaisePost = byId.orElse(null);
        FundRaisePostDto fundRaisePostDto = Mapper.fundraisepostTodto(fundRaisePost);
        fundRaisePostDto.setPostContent(request.getPostContent());
        fundRaisePostDto.setTitle(request.getTitle());
        fundRaisePostDto.setAmount(request.getAmount());

        fundraisePostService.updatePost(fundRaisePostDto,id);


        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully updated post");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);


    }

    @DeleteMapping("fundpost/delete/{id}")
    public  ResponseEntity<GeneralResponse> deletePost(@PathVariable Integer id){

        fundraisePostService.deletePost(id);

        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully deleted post");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse, HttpStatus.OK);

    }

    @GetMapping("fundpost/getallpost")
    public ResponseEntity<List<FundRaisePostDto>> getAllPost(){

        List<FundRaisePostDto> allposts = fundraisePostService.getAllposts();

        return new ResponseEntity<List <FundRaisePostDto>>(allposts,HttpStatus.OK);
    }

    @GetMapping("fundpost/getallpost/{id}")
    public ResponseEntity<List<FundRaisePostDto>> getAllPostbyUser(@PathVariable Integer id ){

        List<FundRaisePostDto> allpostsbyUser = fundraisePostService.getAllpostsbyUser(id);

        return new ResponseEntity<List<FundRaisePostDto>>( allpostsbyUser,HttpStatus.OK);
    }



}
