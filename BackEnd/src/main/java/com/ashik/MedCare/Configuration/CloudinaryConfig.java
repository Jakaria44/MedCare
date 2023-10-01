package com.ashik.MedCare.Configuration;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary getcloudinary(){

        Map map = new HashMap();

        map.put("cloud_name","daa9vvvey");
        map.put("api_key","841399476693736");
        map.put("api_secret","HJcFtw5oFOSGq1Gd4bax5agADos");
        map.put("secure",true);


        return new Cloudinary(map);
    }
}
