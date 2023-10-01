package com.ashik.MedCare.RequestObject;

import lombok.Data;

import java.util.Date;
@Data
public class BloodDonatePostReq {
    private String bloodGroup;

    private boolean availibility;

    private String contact;



}
