package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import com.ashik.MedCare.Repository.FundRaisePostRepository;
import com.ashik.MedCare.Repository.PostImageRepository;
import com.ashik.MedCare.Repository.ProveDocumentRepository;
import com.ashik.MedCare.Services.FundraisePostService;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundPostPage;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundRaisePostMapper;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundRaiseResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FundRaisePostServiceImpl implements FundraisePostService {

    @Autowired
    private FundRaisePostRepository fundRaisePostRepository;
    @Autowired
    private PostImageRepository postImageRepository;
    @Autowired
    private ProveDocumentRepository proveDocumentRepository;

    @Override
    public FundRaisePostDto createPost(FundRaisePostDto fundRaisePostDto) {

        FundRaisePost fundRaisePost = FundRaisePostMapper.DtoToPost(new FundRaisePost(),fundRaisePostDto);
        FundRaisePost save = fundRaisePostRepository.save(fundRaisePost);
        FundRaisePostDto fundRaisePostDto1 = FundRaisePostMapper.PostToDto(save,new FundRaisePostDto());


        return fundRaisePostDto1;
    }

    @Override
    public FundRaisePostDto updatePost(FundRaisePostDto fundRaisePostDto, Integer id) {

//        FundRaisePost fundRaisePost = Mapper.fundraisedtoTopost(fundRaisePostDto);
//        fundRaisePost.setId(id);
//        FundRaisePost save = fundRaisePostRepository.save(fundRaisePost);
//        return Mapper.fundraisepostTodto(save);

        return null;
    }

    @Override
    public void deletePost(Integer id) {

        Optional<FundRaisePost> byId = fundRaisePostRepository.findById(id);

        List<PostImage> postImages = byId.get().getPostImages();

        List<ProvedDocument> proveDocuments = byId.get().getProveDocuments();



        for(PostImage postImage : postImages){
                postImageRepository.deleteById(postImage.getId());
        }

        for(ProvedDocument provedDocument : proveDocuments){
            proveDocumentRepository.deleteById(provedDocument.getId());
        }



        fundRaisePostRepository.deleteById(id);

    }

    @Override
    public List<FundRaisePostDto> getAllposts() {
//        List<FundRaisePost> all = fundRaisePostRepository.findAll();
//        List<FundRaisePostDto> collect =
//                all.stream().map((post) -> Mapper.fundraisepostTodto(post)).collect(Collectors.toList());
//
//        return collect;
        return null;
    }

    @Override
    public List<FundRaisePostDto> getAllpostsbyUser(Integer id) {

//        List<FundRaisePost> byUserId = fundRaisePostRepository.findByUserId(id);
//        List<FundRaisePostDto> collect =
//                byUserId.stream().map((post) -> Mapper.fundraisepostTodto(post)).collect(Collectors.toList());
//
//        return collect;
        return null;
    }

    @Override
    public FundRaisePostDto approvedPost(Integer postid) {

        FundRaisePost fundRaisePost = fundRaisePostRepository.findById(postid).get();
        fundRaisePost.setApprove(true);
        fundRaisePost.setApproveDate(new Date());
        FundRaisePost save = fundRaisePostRepository.save(fundRaisePost);
        FundRaisePostDto fundRaisePostDto = FundRaisePostMapper.PostToDto(save, new FundRaisePostDto());

        return fundRaisePostDto;

    }

    @Override
    public List<FundRaiseResponse> getAllbyApproveStatuswithSort(boolean approve, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();


        List<FundRaisePost> byIsApprove = fundRaisePostRepository.findByIsApprove(approve, sort);
        List<FundRaisePostDto> collect =
                byIsApprove.stream().map((post) -> FundRaisePostMapper.PostToDto(post, new FundRaisePostDto())).collect(Collectors.toList());

        List<FundRaiseResponse> collect1 =
                collect.stream().map((post) -> FundRaisePostMapper.dtoToResponse(post, new FundRaiseResponse())).collect(Collectors.toList());

        return collect1;
    }

    @Override
    public FundPostPage getAllbyApproveStatuswithSort(boolean approve,
                                                      Integer pageSize,
                                                      Integer pageNumber,
                                                      String sortBy, String sortDir) {


        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<FundRaisePost> byIsApprove = fundRaisePostRepository.findByIsApprove(approve, pageable);

//        if(byIsApprove==null){
//            System.out.println("null value got from repository");
//
//        }
//        else {
//            System.out.println(byIsApprove);
//        }

        List<FundRaisePostDto> collect = byIsApprove.stream().map((post) -> FundRaisePostMapper.PostToDto(post, new FundRaisePostDto())).collect(Collectors.toList());

        List<FundRaiseResponse> collect1 =
                collect.stream().map((post) -> FundRaisePostMapper.dtoToResponse(post, new FundRaiseResponse())).collect(Collectors.toList());

        FundPostPage fundPostPage = new FundPostPage();
        fundPostPage.setContent(collect1);
        fundPostPage.setPageNumber(byIsApprove.getNumber());
        fundPostPage.setLastPage(byIsApprove.isLast());
        fundPostPage.setPageSize(byIsApprove.getSize());
        fundPostPage.setTotalPages(byIsApprove.getTotalPages());
        fundPostPage.setTotaleElements(byIsApprove.getNumberOfElements());



        return fundPostPage;
    }

    @Override
    public FundPostPage getAllPostByUserIdAndApprove(Integer userid, Integer pageSize, Integer pageNumber, String sortBy, String sortDir, Boolean approved) {

        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<FundRaisePost> byUserId = fundRaisePostRepository.findByUserId(userid, pageable);

        List<FundRaisePost> collect = byUserId.stream().filter((post) -> post.isApprove() == approved).collect(Collectors.toList());

        List<FundRaisePostDto> collect1 = collect.stream().map((post) -> FundRaisePostMapper.PostToDto(post, new FundRaisePostDto())).collect(Collectors.toList());

        List<FundRaiseResponse> collect2 = collect1.stream().map((post) -> FundRaisePostMapper.dtoToResponse(post, new FundRaiseResponse())).collect(Collectors.toList());


        FundPostPage fundPostPage = new FundPostPage();
        fundPostPage.setContent(collect2);
        fundPostPage.setPageNumber( byUserId .getNumber());
        fundPostPage.setLastPage( byUserId .isLast());
        fundPostPage.setPageSize( byUserId .getSize());
        fundPostPage.setTotalPages( byUserId .getTotalPages());
        fundPostPage.setTotaleElements( byUserId .getNumberOfElements());


        return fundPostPage;
    }
}
