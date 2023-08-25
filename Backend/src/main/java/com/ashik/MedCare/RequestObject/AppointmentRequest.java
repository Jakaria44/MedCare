package com.ashik.MedCare.RequestObject;

import com.ashik.MedCare.Entities.Slot;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd ")
    private LocalDate localDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime startTime;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime endTime;
    private String description;





}
