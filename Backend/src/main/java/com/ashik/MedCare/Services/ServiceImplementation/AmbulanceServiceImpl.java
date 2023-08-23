package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.AmbulancePostDTO;
import com.ashik.MedCare.Entities.AmbulancePost;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.AmbulancePostRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.AmbulancePostService;
import com.ashik.MedCare.Utils.AmbulanceUtil.AmbulanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<AmbulancePostDTO> getAllambulancePost() {

        List<AmbulancePost> allAmbulancePosts = ambulancePostRepository.findAll();

        List<AmbulancePostDTO> ambulancePostDTOS =
                allAmbulancePosts.stream().map((ampost) -> postToDto(ampost)).collect(Collectors.toList());


        return ambulancePostDTOS;
    }

    @Override
    public List<AmbulancePostDTO> getPostbyUserId(Integer id) {

        List<AmbulancePost> posts = ambulancePostRepository.findByUserId(id);

        List<AmbulancePostDTO> ambulancePostDTOS =
                posts.stream().map((post) -> postToDto(post)).collect(Collectors.toList());


        return ambulancePostDTOS;
    }

    public AmbulancePostDTO  postToDto(AmbulancePost post){

        AmbulancePostDTO ambulancePostDTO = new AmbulancePostDTO();
        ambulancePostDTO.setAmbulanceInfo(post.getAmbulanceInfo());
        ambulancePostDTO.setId(post.getId());
        ambulancePostDTO.setAmbulanceModel(post.getAmbulanceModel());
//        ambulancePostDTO.setLocation(post.getLocation());
        ambulancePostDTO.setUser(post.getUser());
        ambulancePostDTO.setAircon(post.isAircon());
        ambulancePostDTO.setDriverName(post.getDriverName());
        ambulancePostDTO.setContactInfo(post.getContactInfo());

        return ambulancePostDTO;
    }


}
