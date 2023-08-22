package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import com.ashik.MedCare.Entities.User;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;
@Data
public class FundRaisePostDto {

    private int id;
    private String title;
    private String amount;
    private String postContent;
    private List<PostImage> postImages;
    private List <ProvedDocument>proveDocuments;
    private User user;
}
