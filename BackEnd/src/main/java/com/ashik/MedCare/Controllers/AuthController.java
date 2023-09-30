package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.ApiResponse.DoctorLoginresponse;
import com.ashik.MedCare.ApiResponse.LoginResponse;
import com.ashik.MedCare.ApiResponse.SignUpResponse;
import com.ashik.MedCare.Configuration.JwTokenProvider;
import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.DTOs.UserDto;
import com.ashik.MedCare.Entities.Address;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.OtpStore;
import com.ashik.MedCare.Entities.User;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Repository.OtpStoreRepository;
import com.ashik.MedCare.Repository.UserRepository;
import com.ashik.MedCare.RequestObject.AddressReq;
import com.ashik.MedCare.RequestObject.LoginRequest;
import com.ashik.MedCare.RequestObject.UserRequest;
import com.ashik.MedCare.Services.ServiceImplementation.CustomUserServiceImple;
import com.ashik.MedCare.Services.ServiceImplementation.EmailServiceImpl;
import com.ashik.MedCare.Services.UserService;
import com.ashik.MedCare.Utils.AuthResponse;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorMapper;
import com.ashik.MedCare.Utils.GeneralResponse;
import com.ashik.MedCare.Utils.Mapper;
import com.ashik.MedCare.Utils.OTPresponse;
import org.apache.commons.lang3.RandomStringUtils;
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
import java.util.Optional;
import java.util.Random;

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
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private OtpStoreRepository otpStoreRepository;





    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody UserRequest userRequest){

        String email = userRequest.getEmail();
        String name = userRequest.getFirstName() + " "+ userRequest.getLastName();
        AddressReq address = userRequest.getAddressReq();
        Address address1 = new Address();
        address1.setDistrict(address.getDistrict());
        address1.setDivision(address.getDivision());
        address1.setUpazila(address.getUpazila());
        String password = userRequest.getPassword();

        User checkuser = userRepository.findByEmail(email);

        SignUpResponse signUpResponse = new SignUpResponse();

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
        userDto.setImageUrl(userRequest.getImageUrl());

        UserDto userDto1 =  userService.RegisterUser(userDto);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDto1.getEmail(),userDto1.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = jwTokenProvider.generateToken(authentication);


//        AuthResponse authResponse = new AuthResponse();
//        authResponse.setAuth(true);
//        authResponse.setJwtToken(jwtToken);
        userDto1.setPassword(null);


        signUpResponse.setUserDto(userDto1);
        signUpResponse.setJwtToken(jwtToken);
        signUpResponse.setAuthenticate(true);

        return  new ResponseEntity<SignUpResponse>(signUpResponse, HttpStatus.ACCEPTED);

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
    public  ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authenticationuser = authentication(email,password);
        SecurityContextHolder.getContext().setAuthentication(authenticationuser);


        String jwtToken = jwTokenProvider.generateToken(authenticationuser);

        String name = authenticationuser.getName();
        User loggedUser = userRepository.findByEmail(name);

        String role = loggedUser.getRole();


        if(role.equals("ROLE_DOCTOR")){



            Doctor byLoginUserId = doctorRepository.findByLoginUserId(loggedUser.getId());


            DoctorDtos doctorDtos = DoctorMapper.doctorToDtos(byLoginUserId, new DoctorDtos());

            DoctorLoginresponse doctorLoginresponse = new DoctorLoginresponse();
            doctorLoginresponse.setJwtToken(jwtToken);
            doctorLoginresponse.setAuthenticated(true);
            doctorLoginresponse.setDoctorDtos(doctorDtos);

            return new ResponseEntity<DoctorLoginresponse>(doctorLoginresponse,HttpStatus.OK);

        }

        UserDto userDto = Mapper.userToDto(loggedUser);

//        userDto.getAddress().setUser(null);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setJwtToken(jwtToken);
        loginResponse.setAuthenticate(true);
        loginResponse.setUserDto(userDto);

//       System.out.println(loginResponse);


//        System.out.println(name);
//        if(loggedUser != null) {
//            System.out.println(loggedUser.getAddress());
//        }
//        System.out.println(userDto);

        return  new ResponseEntity<LoginResponse>(loginResponse,HttpStatus.OK);

    }


    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<?> sendOtpForPasswordReset(@PathVariable String email){

        User user = userRepository.findByEmail(email);

        GeneralResponse generalResponse = new GeneralResponse();

        if(user == null){
           generalResponse.setMessage("user not found");
           generalResponse.setSuccess(false);

            return new  ResponseEntity<>(generalResponse,HttpStatus.BAD_REQUEST);

        }

        Random random = new Random();

        int min = 10000;
        int max = 99999;
        int randomInt = random.nextInt(max-min+1)+min;

//        System.out.println(randomInt);

        Integer otp = randomInt;
        String subject = " Otp for reset password";

        String mssg = "YOUR otp is : "+ Integer.toString(otp);



        emailService.SendEmail(email,subject,mssg);
        generalResponse.setMessage("top send on mail successfully");
        generalResponse.setSuccess(true);

        OtpStore byUserId = otpStoreRepository.findByUserId(user.getId());

        if(byUserId != null){
            otpStoreRepository.delete(byUserId);
        }

        String s = RandomStringUtils.randomAlphanumeric(8);

        OtpStore otpStore = new OtpStore();
        otpStore.setOtp(otp);
        otpStore.setUserId(user.getId());
        otpStore.setTemptoken(s);

        otpStoreRepository.save(otpStore);


        return new ResponseEntity<>(generalResponse,HttpStatus.OK);


    }



    @GetMapping("/validateOtp/{otp}")
    public  ResponseEntity<?>validateOtp(@PathVariable Integer otp){

        OtpStore byOtp = otpStoreRepository.findByOtp(otp);

        GeneralResponse generalResponse = new GeneralResponse();

        if(byOtp == null){
            generalResponse.setMessage("Invalid Otp");
            generalResponse.setSuccess(false);

            return  new ResponseEntity<>(generalResponse,HttpStatus.NOT_FOUND);
        }

        generalResponse.setMessage(byOtp.getTemptoken());
        generalResponse.setSuccess(true);

        return new ResponseEntity<>(generalResponse,HttpStatus.ACCEPTED);

    }


    @PostMapping("/resetpassword/{newpassword}")
    public ResponseEntity<GeneralResponse> ResetPassword(
                                                         @PathVariable String newpassword,
                                                         @RequestHeader ("Authorization") String jwt){


        User byEmail = userService.findUserByJwt(jwt);

//        User byEmail = userRepository.findByEmail(email);
        GeneralResponse generalResponse = new GeneralResponse();

        byEmail.setPassword(passwordEncoder.encode(newpassword));

        userRepository.save(byEmail);

        generalResponse.setMessage("password updated");
        generalResponse.setSuccess(true);
        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);


    }





    @PostMapping("/forgotPassword/resetpassword/{tempToken}/{newpassword}")
    public ResponseEntity<GeneralResponse> ForgotResetPassword(@PathVariable String tempToken,
                                                         @PathVariable String newpassword
                                                         ){






//        User byEmail = userRepository.findByEmail(email);
        GeneralResponse generalResponse = new GeneralResponse();

        OtpStore byOtp= otpStoreRepository.findByTemptoken(tempToken);


        if(byOtp == null){
            generalResponse.setMessage("Invalid Otp");
            generalResponse.setSuccess(false);
            return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.BAD_REQUEST);
        }

        Integer userid = byOtp.getUserId();
        Optional<User> byId = userRepository.findById(userid);

        if(byId.get() == null){
            generalResponse.setMessage("Invalid tempToekn");
            generalResponse.setSuccess(false);
            return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.BAD_REQUEST);

        }

        User user = byId.get();

        user.setPassword(passwordEncoder.encode(newpassword));


        userRepository.save(user);


//        userRepository.save(byEmail);

        generalResponse.setMessage("password updated");
        generalResponse.setSuccess(true);
        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);


    }








    @GetMapping("/makeAdmin")
    public ResponseEntity<GeneralResponse>makeAdmin(){

        User user = new User();
        user.setName("admin");
        user.setImageUrl("admin.jpg");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setRole("ROLE_ADMIN");
        user.setEmail("admin@gmail.com");

        userRepository.save(user);

        GeneralResponse generalResponse = new GeneralResponse();
        generalResponse.setMessage("admin created successfully");
        generalResponse.setSuccess(true);

        return new ResponseEntity<GeneralResponse>(generalResponse,HttpStatus.OK);

    }




}
