package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.User;

public interface UserService {

    public UserDto RegisterUser(UserDto userDto);

    public User findUserByJwt(String jwt);

}
