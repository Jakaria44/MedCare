package com.ashik.MedCare.Utils.AmbulanceUtil;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Entities.AmbulancePost;
import com.ashik.MedCare.RequestObject.AmbulanceRequest;

public class AmbulanceMapper {


    public static AmbulancePostDTO postDTO(AmbulancePost post){

        AmbulancePostDTO ambulancePostDTO = new AmbulancePostDTO();
        ambulancePostDTO.setAmbulanceInfo(post.getAmbulanceInfo());
        ambulancePostDTO.setAmbulanceModel(post.getAmbulanceModel());
        ambulancePostDTO.setContactInfo(post.getContactInfo());
        ambulancePostDTO.setAircon(post.isAircon());
        ambulancePostDTO.setUser(post.getUser());
        ambulancePostDTO.setId(post.getId());
        ambulancePostDTO.setDriverName(post.getDriverName());
        ambulancePostDTO.setAmbulanceImageName(post.getAmbulanceImageName());
        ambulancePostDTO.setDistrict(post.getDistrict());
        ambulancePostDTO.setDivision(post.getDivision());
        ambulancePostDTO.setUpazila(post.getUpazila());
        ambulancePostDTO.setCreatedDate(post.getCreatedDate());

        return  ambulancePostDTO;

    }

    public static AmbulancePost DtoToPost(AmbulancePostDTO postDTO){

        AmbulancePost ambulancePost = new AmbulancePost();
        ambulancePost.setAmbulanceInfo(postDTO.getAmbulanceInfo());
        ambulancePost.setContactInfo(postDTO.getContactInfo());
        ambulancePost.setAmbulanceModel(postDTO.getAmbulanceModel());
        ambulancePost.setAircon(postDTO.isAircon());
        ambulancePost.setUser(postDTO.getUser());
        ambulancePost.setDriverName(postDTO.getDriverName());
        ambulancePost.setAmbulanceImageName(postDTO.getAmbulanceImageName());
        ambulancePost.setDistrict(postDTO.getDistrict());
        ambulancePost.setDivision(postDTO.getDivision());
        ambulancePost.setUpazila(postDTO.getUpazila());
        ambulancePost.setCreatedDate(postDTO.getCreatedDate());

        return  ambulancePost;

    }

    public static AmbulanceResponse dtoToResponse(AmbulancePostDTO dto){

        AmbulanceResponse response = new AmbulanceResponse();

        response.setAircon(dto.isAircon());
        response.setAmbulanceInfo(dto.getAmbulanceInfo());
        response.setAmbulanceModel(dto.getAmbulanceModel());
        response.setAmbulanceImageName(dto.getAmbulanceImageName());
        response.setDistrict(dto.getDistrict());
        response.setDivision(dto.getDivision());
        response.setContactInfo(dto.getContactInfo());
        response.setId(dto.getId());
        response.setUserId(dto.getUser().getId());
        response.setUpazila(dto.getUpazila());
        response.setUserName(dto.getUser().getName());
        response.setUserRole(dto.getUser().getRole());
        response.setDriverName(dto.getDriverName());
        response.setCreatedDate(dto.getCreatedDate());

        return  response;

    }


    public static AmbulancePostDTO requestToDto( AmbulanceRequest request){

        AmbulancePostDTO dto = new AmbulancePostDTO();

        dto.setAmbulanceInfo(request.getAmbulanceInfo());
        dto.setAmbulanceModel(request.getAmbulanceModel());
        dto.setContactInfo(request.getContactInfo());
        dto.setAircon(request.isAircon());
        dto.setDriverName(request.getDriverName());
        dto.setAmbulanceImageName(request.getAmbulanceImageName());
        dto.setDistrict(request.getDistrict());
        dto.setDivision(request.getDivision());
        dto.setUpazila(request.getUpazila());

        return  dto;


    }


}
