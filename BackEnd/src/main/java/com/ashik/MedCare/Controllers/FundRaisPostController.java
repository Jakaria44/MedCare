package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.FundRaisePostRepository;
import com.ashik.MedCare.Repository.PostImageRepository;
import com.ashik.MedCare.Repository.ProveDocumentRepository;
import com.ashik.MedCare.RequestObject.BloodDonatePostReq;
import com.ashik.MedCare.RequestObject.FundraiseRequest;
import com.ashik.MedCare.Services.FundraisePostService;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundPostPage;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundRaisePostMapper;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundRaiseResponse;
import com.ashik.MedCare.Utils.GeneralResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FundRaisPostController {

    @Autowired
    private UserService userService;
    @Autowired
    private FundraisePostService fundraisePostService;
    @Autowired
    private FundRaisePostRepository fundRaisePostRepository;
    @Autowired
    private PostImageRepository postImageRepository;
    @Autowired
    private ProveDocumentRepository proveDocumentRepository;


    @PostMapping("/protect/fundpost/create")
    ResponseEntity<GeneralResponse>createPost(@RequestBody FundraiseRequest request,
                                              @RequestHeader ("Authorization") String jwt){

        User user = userService.findUserByJwt(jwt);
        List<PostImage> postImages = request.getPostImages();
        List<ProvedDocument> proveDocuments = request.getProveDocuments();

        request.setPostImages(null);
        request.setProveDocuments(null);

        FundRaisePostDto fundRaisePostDto = FundRaisePostMapper.requestTodto(new FundRaisePostDto(), request);
        fundRaisePostDto.setUser(user);
        FundRaisePostDto post = fundraisePostService.createPost(fundRaisePostDto);
        FundRaisePost fundRaisePost = FundRaisePostMapper.DtoToPost(new FundRaisePost(), post);
        int postId = post.getId();
        fundRaisePost.setId(post.getId());



        for (PostImage image : postImages){
            image.setFundRaisePost(fundRaisePost);
            postImageRepository.save(image);

        }

        for(ProvedDocument provedDocument : proveDocuments){
            provedDocument.setFundRaisePost(fundRaisePost);
            proveDocumentRepository.save(provedDocument);
        }




        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("succesfully created fundpost wait for approve");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse , HttpStatus.OK);


    }

    //done with admin
    @PutMapping("/protect/fundPost/approve/{postid}")
    public ResponseEntity<FundRaiseResponse> approvePost(@PathVariable Integer postid ){

        FundRaisePostDto fundRaisePostDto = fundraisePostService.approvedPost(postid);
        FundRaiseResponse fundRaiseResponse = FundRaisePostMapper.dtoToResponse(fundRaisePostDto, new FundRaiseResponse());

        return new ResponseEntity<FundRaiseResponse>(fundRaiseResponse,HttpStatus.OK);

    }




    @GetMapping("/fundpost/getallpost/{approve}")
    public ResponseEntity<List<FundRaiseResponse>> getAllbyApproveStatuswithSort(
//            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,
//
//            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,

            @RequestParam(name = "SortBy" ,defaultValue = "approveDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable("approve") boolean approve ){


        List<FundRaiseResponse> allbyApproveStatuswithSort = fundraisePostService.getAllbyApproveStatuswithSort(approve, SortBy, SortDir);

        return new ResponseEntity<List<FundRaiseResponse>>(allbyApproveStatuswithSort,HttpStatus.OK);


    }

    @GetMapping("/fundpost/getallpost/page/{approve}")
    public ResponseEntity<FundPostPage> getAllbyApproveStatuswithSortandPage(
            @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,

            @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,

            @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
            @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
            @PathVariable boolean approve
    ){

        FundPostPage allbyApproveStatuswithSort =
                fundraisePostService.getAllbyApproveStatuswithSort(approve, pageSize, pageNumber, SortBy, SortDir);

        return new ResponseEntity<FundPostPage>(allbyApproveStatuswithSort,HttpStatus.OK);


    }


















    @PutMapping("protect/fundpost/update/{id}")
    public ResponseEntity<GeneralResponse> updatePost(@PathVariable Integer id,
                                                      @RequestBody FundraiseRequest request,
                                                      @RequestHeader ("Authorization") String jwt){

        User user = userService.findUserByJwt(jwt);



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

//    @GetMapping("fundpost/getallpost")
//    public ResponseEntity<List<FundRaisePostDto>> getAllPost(){
//
//        List<FundRaisePostDto> allposts = fundraisePostService.getAllposts();
//
//        return new ResponseEntity<List <FundRaisePostDto>>(allposts,HttpStatus.OK);
//    }

//    @GetMapping("fundpost/getallpost/{id}")
//    public ResponseEntity<List<FundRaisePostDto>> getAllPostbyUser(@PathVariable Integer id ){
//
//        List<FundRaisePostDto> allpostsbyUser = fundraisePostService.getAllpostsbyUser(id);
//
//        return new ResponseEntity<List<FundRaisePostDto>>( allpostsbyUser,HttpStatus.OK);
//    }


    @PostMapping("/fundraisePost/donate/{postId}/{amount}")
    public  ResponseEntity<GeneralResponse>Donate(@PathVariable Integer postId , @PathVariable Integer amount ){

        Optional<FundRaisePost> byId = fundRaisePostRepository.findById(postId);
        FundRaisePost fundRaisePost = byId.get();

        fundRaisePost.setDonatedAmount(fundRaisePost.getDonatedAmount()+amount);

        fundRaisePostRepository.save(fundRaisePost);
        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("updated successfully");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);

    }


    @GetMapping("/getallPostByuserWithSortAndPage/{userId}/{approve}")
    public ResponseEntity<?> getallFundPostbyUserIdwithSortAndPage( @RequestParam(name = "pageNumber",defaultValue ="0") Integer pageNumber,

                                                                    @RequestParam(name = "pageSize",defaultValue = "1") Integer pageSize,

                                                                    @RequestParam(name = "SortBy" ,defaultValue = "createdDate") String SortBy,
                                                                    @RequestParam(name = "SortDir",defaultValue = "desc") String SortDir,
                                                                    @PathVariable boolean approve, @PathVariable Integer userId){


        FundPostPage allPostByUserIdAndApprove = fundraisePostService.getAllPostByUserIdAndApprove(userId, pageSize, pageNumber, SortBy, SortDir, approve);

        return new ResponseEntity<>(allPostByUserIdAndApprove,HttpStatus.OK);


    }



}
