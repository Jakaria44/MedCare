package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.BloodDonatePostDto;
import com.ashik.MedCare.Entities.BloodDonatePost;
import com.ashik.MedCare.Repository.BloodDonatePostRepository;
import com.ashik.MedCare.Services.BloodDonatePostServices;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.BloodDonatePostResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodDonatePostServiceImpl implements BloodDonatePostServices {

    @Autowired
    private BloodDonatePostRepository bloodDonatePostRepository;

    @Override
    public BloodDonatePostDto createPost(BloodDonatePostDto bloodDonatePostDto) {

        BloodDonatePost bloodDonatePost = Mapper.dtoToPost(bloodDonatePostDto);
        BloodDonatePost save = bloodDonatePostRepository.save(bloodDonatePost);
        BloodDonatePostDto bloodDonatePostDto1 = Mapper.postToDto(save);


        return bloodDonatePostDto1;



    }

    @Override
    public BloodDonatePostDto updatePost(BloodDonatePostDto bloodDonatePostDto,Integer id) {

        BloodDonatePost bloodDonatePost = Mapper.dtoToPost(bloodDonatePostDto);
        bloodDonatePost.setId(id);

        BloodDonatePost save = bloodDonatePostRepository.save(bloodDonatePost);

        return Mapper.postToDto(save);


    }

    @Override
    public void deletePost(Integer id) {

        bloodDonatePostRepository.deleteById(id);

    }

    @Override
    public List<BloodDonatePostDto> getAllBloodDonatePost() {

        List<BloodDonatePost> all = bloodDonatePostRepository.findAll();

        List<BloodDonatePostDto> collect =
                all.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());


        return collect;
    }

    @Override
    public List<BloodDonatePostDto> getAllBloodDonatePostbyUserId(Integer id) {

        List<BloodDonatePost> byUserId = bloodDonatePostRepository.findByUserId(id);

        List<BloodDonatePostDto> collect =
                byUserId.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());


        return collect;
    }

    @Override
    public BloodDonatePostPageResponse allpostWithPagination(Integer pageNumber,
                                                               Integer pageSize,
                                                               String SortBy, String SortDir) {


        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byAvailibilityOrderByCreatedDateDesc =
                bloodDonatePostRepository.findByAvailibilityOrderByCreatedDateDesc(false, pageable);

        List<BloodDonatePostDto> collect = byAvailibilityOrderByCreatedDateDesc.stream().map((post) -> Mapper.postToDto(post))
                .collect(Collectors.toList());

        List<BloodDonatePostResponse> collect1 =
                collect.stream().map((post) -> Mapper.bloodDonatePostResponseMapper( post,post.getUser())).collect(Collectors.toList());

        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();
        bloodDonatePostPageResponse.setContent(collect1);
        bloodDonatePostPageResponse.setPageNumber(byAvailibilityOrderByCreatedDateDesc.getNumber());
        bloodDonatePostPageResponse.setPageSize(byAvailibilityOrderByCreatedDateDesc.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byAvailibilityOrderByCreatedDateDesc.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byAvailibilityOrderByCreatedDateDesc.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byAvailibilityOrderByCreatedDateDesc.isLast());

        return  bloodDonatePostPageResponse;
    }


}
