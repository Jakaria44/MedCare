package com.ashik.MedCare.Utils.FundRaisePostUtils;

import com.ashik.MedCare.Entities.PostImage;
import com.ashik.MedCare.Entities.ProvedDocument;
import com.ashik.MedCare.Entities.User;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FundRaiseResponse {

    private int id;
    private Integer userid;
    private String userRole;
    private String userName;
    private String title;
    private Integer amount;
    private Integer donatedAmount;
    private String postContent;
    private boolean isApprove;
    private Date createdDate;
    private Date approveDate;
    private List<PostImage> postImages;
    private List <ProvedDocument>proveDocuments;


}
