package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Entities.AmbulancePost;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.AmbulancePostRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.AmbulancePostService;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceMapper;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulancePageResponse;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AmbulanceServiceImpl implements AmbulancePostService {

    @Autowired
    private AmbulancePostRepository ambulancePostRepository;

    @Override
    public AmbulancePostDTO cratePost(AmbulancePostDTO ambulancePostDTO) {


        AmbulancePost ambulancePost = AmbulanceMapper.DtoToPost(ambulancePostDTO);
        AmbulancePost save = ambulancePostRepository.save(ambulancePost);

        return AmbulanceMapper.postDTO(save);

    }

    @Override
    public AmbulancePostDTO updatePost(AmbulancePostDTO ambulancePostDTO, Integer id) {

        Optional<AmbulancePost> ambulancePostOptional = ambulancePostRepository.findById(id);


        AmbulancePost ambulancePost = ambulancePostOptional.orElse(null);

//        if(ambulancePostOptional.isPresent()){
//
//        }

        ambulancePost.setAmbulanceInfo(ambulancePostDTO.getAmbulanceInfo());
        ambulancePost.setContactInfo(ambulancePostDTO.getContactInfo());
        ambulancePost.setAmbulanceModel(ambulancePostDTO.getAmbulanceModel());
        ambulancePost.setAircon(ambulancePostDTO.isAircon());
        ambulancePost.setDriverName(ambulancePostDTO.getDriverName());
        ambulancePost.setAmbulanceImageName(ambulancePostDTO.getAmbulanceImageName());
        ambulancePost.setDistrict(ambulancePostDTO.getDistrict());
        ambulancePost.setDivision(ambulancePostDTO.getDivision());
        ambulancePost.setUpazila(ambulancePostDTO.getUpazila());



        AmbulancePost save = ambulancePostRepository.save(ambulancePost);



        return  AmbulanceMapper.postDTO(save);
    }



    @Override
    public void deletePost(Integer id) {

        Optional<AmbulancePost> ambulancePostOptional = ambulancePostRepository.findById(id);

        if(ambulancePostOptional.isPresent()){
            ambulancePostRepository.deleteById(id);
        }


    }



    @Override
    public  List<AmbulanceResponse> getAllambulancePost() {

        List<AmbulancePost> allAmbulancePosts = ambulancePostRepository.findAll();

        List<AmbulancePostDTO> ambulancePostDTOS =
                allAmbulancePosts.stream().map((ampost) -> AmbulanceMapper.postDTO(ampost)).collect(Collectors.toList());

        List<AmbulanceResponse> collect =
                ambulancePostDTOS.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        return collect;
    }




    @Override
    public List<AmbulanceResponse> getPostbyUserId(Integer id) {

        List<AmbulancePost> posts = ambulancePostRepository.findByUserId(id);

        List<AmbulancePostDTO> ambulancePostDTOS =
                posts.stream().map((post) ->AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect =
                ambulancePostDTOS.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        return collect;
    }




    @Override
    public AmbulancePageResponse allpostWithPagination(Integer pageNumber,
                                                       Integer pageSize,
                                                       String SortBy,
                                                       String SortDir) {

        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<AmbulancePost> posts = ambulancePostRepository.findAll(pageable);

        List<AmbulancePostDTO> collect =
                posts.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());

        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(posts.isLast());
        ambulancePageResponse.setPageNumber(posts.getNumber());
        ambulancePageResponse.setPageSize(posts.getSize());
        ambulancePageResponse.setTotaleElements((int) posts.getTotalElements());
        ambulancePageResponse.setTotalPages(posts.getTotalPages());



        return ambulancePageResponse;



    }






    @Override
    public AmbulancePageResponse getAllpostbyUserIdwithPage(int id,
                                                            Integer pageNumber,
                                                            Integer pageSize,
                                                            String SortBy,
                                                            String SortDir) {


        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<AmbulancePost> posts = ambulancePostRepository.findByUserId(id, pageable);
        List<AmbulancePostDTO> collect =
                posts.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());

        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(posts.isLast());
        ambulancePageResponse.setPageNumber(posts.getNumber());
        ambulancePageResponse.setPageSize(posts.getSize());
        ambulancePageResponse.setTotaleElements((int) posts.getTotalElements());
        ambulancePageResponse.setTotalPages(posts.getTotalPages());



        return ambulancePageResponse;
    }

    @Override
    public AmbulancePageResponse getpostbyDistrictOnly(String district, Integer pageNumber, Integer pageSize, String SortBy, String SortDir) {

        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<AmbulancePost> byDistrict = ambulancePostRepository.findByDistrict(district, pageable);

        List<AmbulancePostDTO> collect =
                byDistrict.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(byDistrict.isLast());
        ambulancePageResponse.setPageNumber(byDistrict.getNumber());
        ambulancePageResponse.setPageSize(byDistrict.getSize());
        ambulancePageResponse.setTotaleElements((int) byDistrict.getTotalElements());
        ambulancePageResponse.setTotalPages(byDistrict.getTotalPages());


        return ambulancePageResponse;
    }

    @Override
    public AmbulancePageResponse getpostbyDivisionOnly(String division, Integer pageNumber, Integer pageSize, String SortBy, String SortDir) {
        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<AmbulancePost> byDivision = ambulancePostRepository.findByDivision(division, pageable);

        List<AmbulancePostDTO> collect =
                byDivision.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(byDivision.isLast());
        ambulancePageResponse.setPageNumber(byDivision.getNumber());
        ambulancePageResponse.setPageSize(byDivision.getSize());
        ambulancePageResponse.setTotaleElements((int) byDivision.getTotalElements());
        ambulancePageResponse.setTotalPages(byDivision.getTotalPages());


        return ambulancePageResponse;
    }

    @Override
    public AmbulancePageResponse getpostbyUpazillaOnly(String upazila, Integer pageNumber, Integer pageSize, String SortBy, String SortDir) {
        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);


        Page<AmbulancePost> byUpazila = ambulancePostRepository.findByUpazila(upazila, pageable);

        List<AmbulancePostDTO> collect =
                byUpazila.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(byUpazila.isLast());
        ambulancePageResponse.setPageNumber(byUpazila.getNumber());
        ambulancePageResponse.setPageSize(byUpazila.getSize());
        ambulancePageResponse.setTotaleElements((int) byUpazila.getTotalElements());
        ambulancePageResponse.setTotalPages(byUpazila.getTotalPages());


        return ambulancePageResponse;

    }

    @Override
    public AmbulancePageResponse getpostbyDistrictandDivitionandUpazillah(String district, String division, String upazila, Integer pageNumber, Integer pageSize, String SortBy, String SortDir) {
        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<AmbulancePost> byDistrictAndDivisionAndUpazila = ambulancePostRepository.findByDistrictAndDivisionAndUpazila(district, division, upazila, pageable);

        List<AmbulancePostDTO> collect =
                byDistrictAndDivisionAndUpazila.stream().map((post) -> AmbulanceMapper.postDTO(post)).collect(Collectors.toList());

        List<AmbulanceResponse> collect1 =
                collect.stream().map((post) -> AmbulanceMapper.dtoToResponse(post)).collect(Collectors.toList());


        AmbulancePageResponse ambulancePageResponse = new AmbulancePageResponse();
        ambulancePageResponse.setContent(collect1);
        ambulancePageResponse.setLastPage(byDistrictAndDivisionAndUpazila.isLast());
        ambulancePageResponse.setPageNumber(byDistrictAndDivisionAndUpazila.getNumber());
        ambulancePageResponse.setPageSize(byDistrictAndDivisionAndUpazila.getSize());
        ambulancePageResponse.setTotaleElements((int) byDistrictAndDivisionAndUpazila.getTotalElements());
        ambulancePageResponse.setTotalPages(byDistrictAndDivisionAndUpazila.getTotalPages());


        return ambulancePageResponse;

    }


}
