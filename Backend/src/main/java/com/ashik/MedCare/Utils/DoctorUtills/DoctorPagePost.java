package com.ashik.MedCare.Utils.DoctorUtills;

import com.ashik.MedCare.DTOs.DoctorDtos;
import lombok.Data;


import java.util.List;

@Data
public class DoctorPagePost {

    private List<DoctorDtos> content;
    private int PageNumber;
    private int PageSize;
    private int TotaleElements;
    private int TotalPages;
    private boolean isLastPage;

}
