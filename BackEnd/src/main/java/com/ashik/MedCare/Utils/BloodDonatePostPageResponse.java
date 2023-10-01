package com.ashik.MedCare.Utils;

import lombok.Data;

import java.util.List;

@Data
public class BloodDonatePostPageResponse {

    private List<BloodDonatePostResponse> content;
    private int PageNumber;
    private int PageSize;
    private int TotaleElements;
    private int TotalPages;
    private boolean isLastPage;


}
