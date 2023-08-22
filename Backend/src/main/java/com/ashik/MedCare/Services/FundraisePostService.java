package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;

import java.util.List;

public interface FundraisePostService {

    public FundRaisePostDto createPost(FundRaisePostDto fundRaisePostDto);
    public FundRaisePostDto updatePost(FundRaisePostDto fundRaisePostDto, Integer id);
    public void deletePost(Integer id);
    public List<FundRaisePostDto> getAllposts();
    public List<FundRaisePostDto> getAllpostsbyUser(Integer id);




}
