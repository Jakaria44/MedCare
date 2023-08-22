package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.Configuration.JwTokenProvider;
import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.Address;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.RequestObject.AddressReq;
import com.ashik.MedCare.RequestObject.LoginRequest;
import com.ashik.MedCare.RequestObject.UserRequest;
import com.ashik.MedCare.Services.ServiceImplementation.CustomUserServiceImple;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private JwTokenProvider jwTokenProvider;
    @Autowired
    private CustomUserServiceImple customUserServiceImple;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody UserRequest userRequest){

        String email = userRequest.getEmail();
        String name = userRequest.getFirstName() + " "+ userRequest.getLastName();
        AddressReq address = userRequest.getAddressReq();
        Address address1 = new Address();
        address1.setDistrict(address.getDistrict());
        address1.setDivision(address.getDivision());
        address1.setUpazila(address.getUpazila());
        String password = userRequest.getPassword();

        User checkuser = userRepository.findByEmail(email);

        if(checkuser != null){
            throw  new BadCredentialsException("already use this email by an account ");
        }

        UserDto userDto = new UserDto();

        userDto.setName(name);
        userDto.setEmail(email);
        userDto.setAddress(address1);
        userDto.setPassword(password);
        userDto.setAmbulancePostList(new ArrayList<>());
        userDto.setBloodDonatePostList(new ArrayList<>());
        userDto.setAppointMents(new ArrayList<>());
        userDto.setFundRaisePostList(new ArrayList<>());
        userDto.setRole("ROLE_Normal");

        UserDto userDto1 =  userService.RegisterUser(userDto);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDto1.getEmail(),userDto1.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = jwTokenProvider.generateToken(authentication);


        AuthResponse authResponse = new AuthResponse();
        authResponse.setAuth(true);
        authResponse.setJwtToken(jwtToken);

        return  new ResponseEntity<AuthResponse>(authResponse, HttpStatus.ACCEPTED);

    }

    @GetMapping("/ashik")
    public  String hello(){
        return "hello world";
    }


    public Authentication authentication(String email, String password){

        UserDetails userDetails = customUserServiceImple.loadUserByUsername(email);

        if(userDetails == null){
            throw  new BadCredentialsException("Invalid userName ...");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }


    @PostMapping("/login")
    public  ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest){

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authenticationuser = authentication(email,password);
        SecurityContextHolder.getContext().setAuthentication(authenticationuser);

        String jwtToken = jwTokenProvider.generateToken(authenticationuser);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAuth(true);
        authResponse.setJwtToken(jwtToken);


        return  new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);

    }




}
