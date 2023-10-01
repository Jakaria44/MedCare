package com.ashik.MedCare.Services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryFileuploadService {

    public Map upload(MultipartFile file);


}
