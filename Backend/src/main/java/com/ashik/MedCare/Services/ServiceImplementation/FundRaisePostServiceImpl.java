package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.FundRaisePostDto;
import com.ashik.MedCare.Entities.FundRaisePost;
import com.ashik.MedCare.Repository.FundRaisePostRepository;
import com.ashik.MedCare.Services.FundraisePostService;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FundRaisePostServiceImpl implements FundraisePostService {

    @Autowired
    private FundRaisePostRepository fundRaisePostRepository;

    @Override
    public FundRaisePostDto createPost(FundRaisePostDto fundRaisePostDto) {

        FundRaisePost fundRaisePost = Mapper.fundraisedtoTopost(fundRaisePostDto);
        FundRaisePost save = fundRaisePostRepository.save(fundRaisePost);
        FundRaisePostDto fundRaisePostDto1 = Mapper.fundraisepostTodto(save);


        return fundRaisePostDto1;
    }

    @Override
    public FundRaisePostDto updatePost(FundRaisePostDto fundRaisePostDto, Integer id) {

        FundRaisePost fundRaisePost = Mapper.fundraisedtoTopost(fundRaisePostDto);
        fundRaisePost.setId(id);
        FundRaisePost save = fundRaisePostRepository.save(fundRaisePost);
        return Mapper.fundraisepostTodto(save);
    }

    @Override
    public void deletePost(Integer id) {

        fundRaisePostRepository.deleteById(id);

    }

    @Override
    public List<FundRaisePostDto> getAllposts() {
        List<FundRaisePost> all = fundRaisePostRepository.findAll();
        List<FundRaisePostDto> collect =
                all.stream().map((post) -> Mapper.fundraisepostTodto(post)).collect(Collectors.toList());

        return collect;
    }

    @Override
    public List<FundRaisePostDto> getAllpostsbyUser(Integer id) {

        List<FundRaisePost> byUserId = fundRaisePostRepository.findByUserId(id);
        List<FundRaisePostDto> collect =
                byUserId.stream().map((post) -> Mapper.fundraisepostTodto(post)).collect(Collectors.toList());

        return collect;
    }
}
