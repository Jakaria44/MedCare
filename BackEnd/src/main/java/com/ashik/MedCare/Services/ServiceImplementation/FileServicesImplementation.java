package com.ashik.MedCare.Services.ServiceImplementation;


import com.ashik.MedCare.Services.FileServices;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
@Service
public class FileServicesImplementation implements FileServices {

    private Path foundFile;


    @Override
    public String saveFile(String fileName, MultipartFile file) throws IOException {

        Path uploadPath = Paths.get("Upload-file");

        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        String filecode = RandomStringUtils.randomAlphanumeric(8);
        try {
            InputStream inputStream = file.getInputStream();
            Path filePath = uploadPath.resolve(filecode+"-"+fileName);
            Files.copy(inputStream,filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException e){
            throw  new IOException("could not save file " + fileName,e);
        }


        return filecode;
    }

    @Override
    public Resource getFileasResource(String fileCode) throws IOException {

        Path dirpath = Paths.get("Upload-file");

        Files.list(dirpath).forEach(file->{
            if(file.getFileName().toString().startsWith(fileCode)){
                foundFile = file;
                return;
            }
        });

        if(foundFile != null){
            return new UrlResource(foundFile.toUri());
        }

        return null;







    }
}
