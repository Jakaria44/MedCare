package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;

import java.util.List;

public interface AmbulancePostService {

    public AmbulancePostDTO cratePost(AmbulancePostDTO ambulancePostDTO);
    public AmbulancePostDTO updatePost(AmbulancePostDTO ambulancePostDTO,Integer id);
    public void  deletePost(Integer id);

    public List<AmbulancePostDTO>getAllambulancePost();
    public List<AmbulancePostDTO>getPostbyUserId(Integer id);
}
