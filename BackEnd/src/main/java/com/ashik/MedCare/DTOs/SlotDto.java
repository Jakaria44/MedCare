package com.ashik.MedCare.DTOs;

import com.ashik.MedCare.Entities.Doctor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SlotDto {

    private int id;
    private LocalDate localDate;
    private LocalTime startTime;
    private LocalTime endTime;
    @JsonIgnore
    private Doctor doctor;

}
