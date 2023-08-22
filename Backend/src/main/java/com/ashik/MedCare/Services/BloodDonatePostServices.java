package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.BloodDonatePostResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BloodDonatePostServices {

    public BloodDonatePostDto createPost(BloodDonatePostDto bloodDonatePostDto);
    public BloodDonatePostDto updatePost(BloodDonatePostDto bloodDonatePostDto,Integer id);
    public void deletePost(Integer id);

    public List<BloodDonatePostDto> getAllBloodDonatePost();
    public List<BloodDonatePostDto> getAllBloodDonatePostbyUserId(Integer id);

    public BloodDonatePostPageResponse allpostWithPagination(Integer pageNumber, Integer pageSize,
                                                             String SortBy, String SortDir);




}
