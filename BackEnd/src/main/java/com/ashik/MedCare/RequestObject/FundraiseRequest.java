package com.ashik.MedCare.RequestObject;

import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import lombok.Data;

import java.util.List;

@Data
public class FundraiseRequest {

    private String title;
    private Integer amount;
    private String postContent;
    private List<PostImage> postImages;
    private List <ProvedDocument>proveDocuments;
}
