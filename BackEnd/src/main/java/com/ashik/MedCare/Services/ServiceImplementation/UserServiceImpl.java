package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.Configuration.JwTokenProvider;
import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwTokenProvider jwTokenProvider;

    @Override
    public UserDto RegisterUser(UserDto userDto) {

        User user = new User();
        user.setAddress(userDto.getAddress());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setAppointMents(userDto.getAppointMents());
        user.setAmbulancePostList(userDto.getAmbulancePostList());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setBloodDonatePostList(userDto.getBloodDonatePostList());
        user.setFundRaisePostList(userDto.getFundRaisePostList());
        user.setRole(userDto.getRole());
        user.setImageUrl(userDto.getImageUrl());


        User save = userRepository.save(user);
        userDto.setId(save.getId());


        return userDto;
    }

    public User findUserByJwt(String jwt){

        String email = jwTokenProvider.getEmailFromToken(jwt);

        User user = userRepository.findByEmail(email);

        if(user == null) {
            throw  new BadCredentialsException("user not found against this jwt");
        }

        return user;

    }


}
