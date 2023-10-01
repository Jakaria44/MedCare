package com.ashik.MedCare.Services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileServices {

    public String saveFile(String fileName, MultipartFile file) throws  IOException;
    public Resource getFileasResource(String fileCode) throws IOException;

}
