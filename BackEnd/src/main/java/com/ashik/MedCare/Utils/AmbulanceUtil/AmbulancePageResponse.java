package com.ashik.MedCare.Utils.AmbulanceUtil;

import lombok.Data;

import java.util.List;

@Data
public class AmbulancePageResponse {

    private List<AmbulanceResponse> content;
    private int PageNumber;
    private int PageSize;
    private int TotaleElements;
    private int TotalPages;
    private boolean isLastPage;



}
