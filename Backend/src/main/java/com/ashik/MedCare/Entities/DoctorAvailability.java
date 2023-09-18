package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Data
@Entity
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

//    @JsonSerialize(using = LocalTimeSerializer.class)
//    @JsonDeserialize(using = LocalTimeDeserializer.class)
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime startTime;
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern = "HH:mm:ss")
    private LocalTime endTime;
    private String weekDays;
    @ManyToOne()
    @JsonBackReference
    private Doctor doctor;


}
