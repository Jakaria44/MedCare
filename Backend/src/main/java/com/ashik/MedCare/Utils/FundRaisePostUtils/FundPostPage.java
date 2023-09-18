package com.ashik.MedCare.Utils.FundRaisePostUtils;

import com.ashik.MedCare.Utils.BloodDonatePostResponse;
import lombok.Data;

import java.util.List;

@Data
public class FundPostPage {

    private List<FundRaiseResponse> content;
    private int PageNumber;
    private int PageSize;
    private int TotaleElements;
    private int TotalPages;
    private boolean isLastPage;

}
