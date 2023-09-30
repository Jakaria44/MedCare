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
                                                               String SortBy, String SortDir,boolean availability) {


        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byAvailibilityOrderByCreatedDateDesc =
                bloodDonatePostRepository.findByAvailibilityOrderByCreatedDateDesc(availability, pageable);

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

    @Override
    public List<BloodDonatePostDto> getAllpostDescSortbyCreatedDate(boolean availibility) {


        List<BloodDonatePost> postList =
                bloodDonatePostRepository.findByAvailibilityOrderByCreatedDateDesc(availibility);

        List<BloodDonatePostDto> collect =
                postList.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());


        return collect;
    }

    @Override
    public List<BloodDonatePostDto> getAllpostbyUserId(int id,String SortBy, String SortDir) {

        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();

        List<BloodDonatePost> byUserId = bloodDonatePostRepository.findByUserId(id,sort);

        List<BloodDonatePostDto> collect = byUserId.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());


        return collect;
    }

    @Override
    public BloodDonatePostPageResponse getAllpostbyUserIdwithPage(int id,
                                                               Integer pageNumber,
                                                               Integer pageSize,
                                                               String SortBy,
                                                               String SortDir) {

        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byUserId = bloodDonatePostRepository.findByUserId(id, pageable);

        List<BloodDonatePostDto> collect = byUserId.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());

        List<BloodDonatePostResponse> collect1 =
                collect.stream().map((post) -> Mapper.bloodDonatePostResponseMapper(post, post.getUser())).collect(Collectors.toList());


        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();
        bloodDonatePostPageResponse.setContent(collect1);
        bloodDonatePostPageResponse.setPageNumber(byUserId.getNumber());
        bloodDonatePostPageResponse.setPageSize(byUserId.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byUserId.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byUserId.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byUserId.isLast());



        return bloodDonatePostPageResponse;
    }

    @Override
    public BloodDonatePostPageResponse getallbyDistrictOnly(String district, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);


        Page<BloodDonatePost> byDistrict = bloodDonatePostRepository.findByDistrict(district, pageable);

        List<BloodDonatePostDto> collectdto = byDistrict.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());

        List<BloodDonatePostResponse> res = collectdto.stream().map((postdto) -> Mapper.bloodDonatePostResponseMapper(postdto, postdto.getUser())).collect(Collectors.toList());

        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();

        bloodDonatePostPageResponse.setContent(res);
        bloodDonatePostPageResponse.setPageNumber(byDistrict.getNumber());
        bloodDonatePostPageResponse.setPageSize(byDistrict.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byDistrict.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byDistrict.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byDistrict.isLast());



        return bloodDonatePostPageResponse;
    }

    @Override
    public BloodDonatePostPageResponse getallbydivisionOnly(String division, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byDivision = bloodDonatePostRepository.findByDivision(division, pageable);

        List<BloodDonatePostDto> collectdto = byDivision.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());
        List<BloodDonatePostResponse> res = collectdto.stream().map((postdto) -> Mapper.bloodDonatePostResponseMapper(postdto, postdto.getUser())).collect(Collectors.toList());

        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();

        bloodDonatePostPageResponse.setContent(res);
        bloodDonatePostPageResponse.setPageNumber(byDivision.getNumber());
        bloodDonatePostPageResponse.setPageSize(byDivision.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byDivision.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byDivision.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byDivision.isLast());


        return bloodDonatePostPageResponse;
    }

    @Override
    public BloodDonatePostPageResponse getallbyupazilaOnly(String upazila, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byUpazila = bloodDonatePostRepository.findByUpazila(upazila, pageable);

        List<BloodDonatePostDto> collectdto = byUpazila.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());
        List<BloodDonatePostResponse> res = collectdto.stream().map((postdto) -> Mapper.bloodDonatePostResponseMapper(postdto, postdto.getUser())).collect(Collectors.toList());

        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();

        bloodDonatePostPageResponse.setContent(res);
        bloodDonatePostPageResponse.setPageNumber(byUpazila.getNumber());
        bloodDonatePostPageResponse.setPageSize(byUpazila.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byUpazila.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byUpazila.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byUpazila.isLast());


        return bloodDonatePostPageResponse;

    }

    @Override
    public BloodDonatePostPageResponse getallbyDistrictDivisionUpazilla(String district, String division, String upazila, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<BloodDonatePost> byDistrictAndDivisionUpazila = bloodDonatePostRepository.findByDistrictAndDivisionAndUpazila(district, division, upazila, pageable);

        List<BloodDonatePostDto> collect = byDistrictAndDivisionUpazila.stream().map((post) -> Mapper.postToDto(post)).collect(Collectors.toList());

        List<BloodDonatePostResponse> res = collect.stream().map((postdto) -> Mapper.bloodDonatePostResponseMapper(postdto, postdto.getUser())).collect(Collectors.toList());

        BloodDonatePostPageResponse bloodDonatePostPageResponse = new BloodDonatePostPageResponse();

        bloodDonatePostPageResponse.setContent(res);
        bloodDonatePostPageResponse.setPageNumber(byDistrictAndDivisionUpazila.getNumber());
        bloodDonatePostPageResponse.setPageSize(byDistrictAndDivisionUpazila.getSize());
        bloodDonatePostPageResponse.setTotaleElements((int) byDistrictAndDivisionUpazila.getTotalElements());
        bloodDonatePostPageResponse.setTotalPages(byDistrictAndDivisionUpazila.getTotalPages());
        bloodDonatePostPageResponse.setLastPage(byDistrictAndDivisionUpazila.isLast());



        return bloodDonatePostPageResponse;
    }





}
