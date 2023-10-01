package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/getuserbyid/{userid}")
    public ResponseEntity<?> getUserByid(@PathVariable Integer userid ){

        Optional<User> byId = userRepository.findById(userid);

        User user = byId.get();

        UserDto userDto = Mapper.userToDto(user);

        userDto.setPassword("password not provided");

        return new ResponseEntity<>(userDto, HttpStatus.OK);

    }

}
