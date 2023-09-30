package com.ashik.MedCare.RequestObject;

import com.ashik.MedCare.Entities.Slot;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequest {

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private LocalDate localDate;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime startTime;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime endTime;
    private String description;





}
