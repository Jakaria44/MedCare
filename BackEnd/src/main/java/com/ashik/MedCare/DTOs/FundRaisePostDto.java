package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import com.ashik.MedCare.Entities.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class FundRaisePostDto {

    private int id;
    private String title;
    private Integer amount;
    private Integer donatedAmount;
    private String postContent;
    private boolean isApprove;
    private Date createdDate;
    private Date approveDate;
    private List<PostImage>postImages;
    private List <ProvedDocument>proveDocuments;
    private User user;
}
