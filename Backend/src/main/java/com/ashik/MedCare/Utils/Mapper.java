package com.ashik.MedCare.Utils;

import com.ashik.MedCare.DTOs.*;
import com.ashik.MedCare.Entities.*;

public class Mapper {

    public static BloodDonatePostDto postToDto(BloodDonatePost bloodDonatePost){
        BloodDonatePostDto bloodDonatePostDto = new BloodDonatePostDto();
        bloodDonatePostDto.setBloodGroup(bloodDonatePost.getBloodGroup());
        bloodDonatePostDto.setAvailibility(bloodDonatePost.isAvailibility());
        bloodDonatePostDto.setContact(bloodDonatePost.getContact());
        bloodDonatePostDto.setCreatedDate(bloodDonatePost.getCreatedDate());
//        bloodDonatePostDto.setLocation(bloodDonatePost.getLocation());
        bloodDonatePostDto.setDistrict(bloodDonatePost.getDistrict());
        bloodDonatePostDto.setDivision(bloodDonatePost.getDivision());
        bloodDonatePostDto.setUpazila(bloodDonatePost.getUpazila());
        bloodDonatePostDto.setId(bloodDonatePost.getId());
        bloodDonatePostDto.setUser(bloodDonatePost.getUser());

        return bloodDonatePostDto;
    }


    public static BloodDonatePost dtoToPost(BloodDonatePostDto postDto){

        BloodDonatePost bloodDonatePost = new BloodDonatePost();
        bloodDonatePost.setBloodGroup(postDto.getBloodGroup());
        bloodDonatePost.setAvailibility(postDto.isAvailibility());
        bloodDonatePost.setContact(postDto.getContact());
        bloodDonatePost.setCreatedDate(postDto.getCreatedDate());
        bloodDonatePost.setUser(postDto.getUser());
//        bloodDonatePost.setLocation(postDto.getLocation());
        bloodDonatePost.setDistrict(postDto.getDistrict());
        bloodDonatePost.setDivision(postDto.getDivision());
        bloodDonatePost.setUpazila(postDto.getUpazila());

        return bloodDonatePost;




    }

//    public  static FundRaisePostDto fundraisepostTodto(FundRaisePost fundRaisePost){
//        FundRaisePostDto fundRaisePostDto = new FundRaisePostDto();
//
//        fundRaisePostDto.setId(fundRaisePost.getId());
//        fundRaisePostDto.setPostContent(fundRaisePost.getPostContent());
//        fundRaisePostDto.setPostImages(fundRaisePost.getPostImages());
//        fundRaisePostDto.setUser(fundRaisePost.getUser());
//        fundRaisePostDto.setAmount(fundRaisePost.getAmount());
//        fundRaisePostDto.setTitle(fundRaisePost.getTitle());
//        fundRaisePostDto.setProveDocuments(fundRaisePost.getProveDocuments());
//
//        return fundRaisePostDto;
//    }

//    public  static FundRaisePost fundraisedtoTopost(FundRaisePostDto fundRaisePostDto){
//       FundRaisePost fundRaisePost = new FundRaisePost();
//
//
//        fundRaisePost.setPostContent(fundRaisePostDto.getPostContent());
//        fundRaisePost.setPostImages(fundRaisePostDto.getPostImages());
//        fundRaisePost.setUser(fundRaisePostDto.getUser());
//        fundRaisePost.setAmount(fundRaisePostDto.getAmount());
//        fundRaisePost.setTitle(fundRaisePostDto.getTitle());
//        fundRaisePost.setProveDocuments(fundRaisePostDto.getProveDocuments());
//
//        return fundRaisePost;
//    }



//    public static AppointMents appointmentDtOToPost(AppointmentDtO appointmentDtO){
//        AppointMents appointMents = new AppointMents();
//        appointMents.setDescription(appointmentDtO.getDescription());
//        appointMents.setUser(appointmentDtO.getUser());
//        appointMents.setDate(appointmentDtO.getDate());
//        appointMents.setDoctor(appointmentDtO.getDoctor());
//
//        return appointMents;
//    }

//    public static AppointmentDtO appointmentpostToDTO(AppointMents appointMents){
//       AppointmentDtO appointMentdto = new AppointmentDtO();
//        appointMentdto.setDescription(appointMents.getDescription());
//        appointMentdto.setUser(appointMents.getUser());
//        appointMentdto.setDate(appointMents.getDate());
//        appointMentdto.setDoctor(appointMents.getDoctor());
//
//        return appointMentdto;
//    }


    public  static  BloodDonatePostResponse bloodDonatePostResponseMapper(BloodDonatePostDto bloodDonatePostDto, User user){

        BloodDonatePostResponse bloodDonatePostResponse = new BloodDonatePostResponse();

        bloodDonatePostResponse.setId(bloodDonatePostDto.getId());
        bloodDonatePostResponse.setUserId(user.getId());
        bloodDonatePostResponse.setBloodGroup(bloodDonatePostDto.getBloodGroup());
        bloodDonatePostResponse.setAvailibility(bloodDonatePostDto.isAvailibility());
        bloodDonatePostResponse.setContact(bloodDonatePostDto.getContact());
        bloodDonatePostResponse.setDistrict(bloodDonatePostDto.getDistrict());
        bloodDonatePostResponse.setDivision(bloodDonatePostDto.getDivision());
        bloodDonatePostResponse.setUpazila(bloodDonatePostDto.getUpazila());
        bloodDonatePostResponse.setCreatedDate(bloodDonatePostDto.getCreatedDate());
        bloodDonatePostResponse.setUserName(user.getName());
        bloodDonatePostResponse.setUserRole(user.getRole());

        return bloodDonatePostResponse;

    }


    public static UserDto userToDto(User user){
        UserDto userDto = new UserDto();
        userDto.setAddress(user.getAddress());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setAppointMents(user.getAppointMents());
        userDto.setAmbulancePostList(user.getAmbulancePostList());
        userDto.setPassword(null);
        userDto.setBloodDonatePostList(user.getBloodDonatePostList());
        userDto.setFundRaisePostList(user.getFundRaisePostList());
        userDto.setRole(user.getRole());
        userDto.setId(user.getId());

        return userDto;
    }





}
