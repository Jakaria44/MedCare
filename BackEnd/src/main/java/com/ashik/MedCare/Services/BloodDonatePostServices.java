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

    BloodDonatePostPageResponse allpostWithPagination(Integer pageNumber,
                                                      Integer pageSize,
                                                      String SortBy,
                                                      String SortDir,
                                                      boolean availability);


    List<BloodDonatePostDto> getAllpostDescSortbyCreatedDate(boolean availibility);
    List<BloodDonatePostDto>getAllpostbyUserId(int id,String SortBy,String SortDir);

    BloodDonatePostPageResponse getAllpostbyUserIdwithPage(int id, Integer pageNumber,
                                                       Integer pageSize,String SortBy,String SortDir);


    BloodDonatePostPageResponse getallbyDistrictOnly(String district,Integer pageNumber, Integer pageSize,String sortBy, String sortDir);

    BloodDonatePostPageResponse getallbydivisionOnly(String division,Integer pageNumber, Integer pageSize,String sortBy, String sortDir);

    BloodDonatePostPageResponse getallbyupazilaOnly(String upazila,Integer pageNumber, Integer pageSize,String sortBy, String sortDir);

    BloodDonatePostPageResponse getallbyDistrictDivisionUpazilla(String district,String division,String upazila,Integer pageNumber, Integer pageSize,String sortBy, String sortDir);



}
