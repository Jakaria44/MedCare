package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundPostPage;
import com.ashik.MedCare.Utils.FundRaisePostUtils.FundRaiseResponse;

import java.util.List;

public interface FundraisePostService {

    public FundRaisePostDto createPost(FundRaisePostDto fundRaisePostDto);
    public FundRaisePostDto updatePost(FundRaisePostDto fundRaisePostDto, Integer id);
    public void deletePost(Integer id);
    public List<FundRaisePostDto> getAllposts();
    public List<FundRaisePostDto> getAllpostsbyUser(Integer id);

    public FundRaisePostDto approvedPost(Integer postid);

    public List<FundRaiseResponse> getAllbyApproveStatuswithSort(boolean approve, String sortBy, String sortDir);
    public FundPostPage getAllbyApproveStatuswithSort(boolean approve , Integer pageSize, Integer pageNumber, String sortBy, String sortDir);




}
