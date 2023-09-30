package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.Services.CloudinaryFileuploadService;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryFileServiceImpl implements CloudinaryFileuploadService {
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Map upload(MultipartFile file) {

        try {
            Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
            return data;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
