package com.ashik.MedCare.Utils.FundRaisePostUtils;

import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.RequestObject.FundraiseRequest;

import java.util.Date;

public class FundRaisePostMapper {

    public static FundRaisePost DtoToPost(FundRaisePost post, FundRaisePostDto dto){
        post.setPostContent(dto.getPostContent());
        post.setPostImages(dto.getPostImages());
        post.setAmount(dto.getAmount());
        post.setTitle(dto.getTitle());
        post.setProveDocuments(dto.getProveDocuments());
        post.setUser(dto.getUser());
        post.setApprove(dto.isApprove());
        post.setCreatedDate(dto.getCreatedDate());
        post.setApproveDate(dto.getApproveDate());
        post.setDonatedAmount(dto.getDonatedAmount());

        return post;
    }

    public static FundRaisePostDto PostToDto(FundRaisePost post, FundRaisePostDto dto){
        dto.setPostContent(post.getPostContent());
        dto.setPostImages(post.getPostImages());
        dto.setAmount(post.getAmount());
        dto.setTitle(post.getTitle());
        dto.setProveDocuments(post.getProveDocuments());
        dto.setUser(post.getUser());
        dto.setApprove(post.isApprove());
        dto.setCreatedDate(post.getCreatedDate());
        dto.setApproveDate(post.getApproveDate());
        dto.setId(post.getId());
        dto.setDonatedAmount(post.getDonatedAmount());

        return dto;
    }

    public static FundRaisePostDto requestTodto(FundRaisePostDto dto, FundraiseRequest request) {

        dto.setPostContent(request.getPostContent());
        dto.setPostImages(request.getPostImages());
        dto.setAmount(request.getAmount());
        dto.setTitle(request.getTitle());
        dto.setProveDocuments(request.getProveDocuments());

        dto.setApprove(false);
        dto.setCreatedDate(new Date());

        dto.setDonatedAmount(0);


        return dto;

    }

    public static FundRaiseResponse dtoToResponse(FundRaisePostDto dto,FundRaiseResponse response) {

        response.setPostContent(dto.getPostContent());
        response.setPostImages(dto.getPostImages());
        response.setAmount(dto.getAmount());
        response.setTitle(dto.getTitle());
        response.setProveDocuments(dto.getProveDocuments());

        response.setApprove(dto.isApprove());
        response.setCreatedDate(dto.getCreatedDate());
        response.setApproveDate(dto.getApproveDate());
        response.setDonatedAmount(dto.getDonatedAmount());

        response.setUserid(dto.getUser().getId());
        response.setUserRole(dto.getUser().getRole());
        response.setUserName(dto.getUser().getName());
        response.setId(dto.getId());



        return response;

    }




}
