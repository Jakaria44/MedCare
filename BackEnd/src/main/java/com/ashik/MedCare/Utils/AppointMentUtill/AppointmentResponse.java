package com.ashik.MedCare.Utils.AppointMentUtill;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentResponse {

    private int id;
    private int doctorid;
    private int doctorLoginId;
    private int userid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;



}
