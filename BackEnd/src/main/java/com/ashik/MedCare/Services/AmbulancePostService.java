package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulancePageResponse;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceResponse;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;

import java.util.List;

public interface AmbulancePostService {

    public AmbulancePostDTO cratePost(AmbulancePostDTO ambulancePostDTO);
    public AmbulancePostDTO updatePost(AmbulancePostDTO ambulancePostDTO,Integer id);
    public void  deletePost(Integer id);

    public  List<AmbulanceResponse> getAllambulancePost();
    public List<AmbulanceResponse>  getPostbyUserId(Integer id);

    AmbulancePageResponse allpostWithPagination(Integer pageNumber,
                                                Integer pageSize,
                                                String SortBy,
                                                String SortDir);

    AmbulancePageResponse getAllpostbyUserIdwithPage(int id, Integer pageNumber,
                                                           Integer pageSize,String SortBy,String SortDir);


    AmbulancePageResponse getpostbyDistrictOnly(String district, Integer pageNumber,
                                                Integer pageSize,
                                                String SortBy,
                                                String SortDir);

    AmbulancePageResponse getpostbyDivisionOnly(String division, Integer pageNumber,
                                                Integer pageSize,
                                                String SortBy,
                                                String SortDir);

    AmbulancePageResponse getpostbyUpazillaOnly(String upazila, Integer pageNumber,
                                                Integer pageSize,
                                                String SortBy,
                                                String SortDir);

    AmbulancePageResponse getpostbyDistrictandDivitionandUpazillah(String district,String division, String upazila ,Integer pageNumber,
                                                Integer pageSize,
                                                String SortBy,
                                                String SortDir);





}
