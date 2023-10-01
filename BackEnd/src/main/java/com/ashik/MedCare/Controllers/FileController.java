package com.ashik.MedCare.Controllers;

import com.ashik.MedCare.Services.CloudinaryFileuploadService;
import com.ashik.MedCare.Services.FileServices;
import com.ashik.MedCare.Utils.FileUploadResponse;
import jakarta.servlet.http.HttpServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class FileController {

    @Autowired
    private FileServices fileServices;
    @Autowired
    private CloudinaryFileuploadService fileuploadService;


//    @PostMapping("/upload")
//   public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam ("file")MultipartFile file) throws IOException {
//
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        long size = file.getSize();
//
//        String fileCode = fileServices.saveFile(fileName,file);
//
//        FileUploadResponse response = new FileUploadResponse();
//        response.setFileName(fileName);
//        response.setSize(size);
//        response.setDownloadUrl("/downloadFile/"+fileCode);
//
//        return new ResponseEntity<FileUploadResponse>(response, HttpStatus.CREATED);
//
//    }



    @PostMapping("/upload/upload")
    public ResponseEntity<Map> uploadImage(@RequestParam("image") MultipartFile file){

        Map data = fileuploadService.upload(file);

        return  new ResponseEntity<>(data,HttpStatus.OK);

    }


    @GetMapping("/download/{filecode}")
    public ResponseEntity<?> downloadFile(@PathVariable String filecode) throws IOException {

        Resource fileasResource = null;

        try {
            fileasResource =  fileServices.getFileasResource(filecode);
        }catch (IOException e){
            throw  new IOException("there is a problem from download controller");
        }

        if(fileasResource == null){
            return new ResponseEntity<>("File not found ",HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headervalue = "attachment; filename=\""+fileasResource.getFilename()+"\"";

        return  ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,headervalue)
                .body(fileasResource);


    }





}
