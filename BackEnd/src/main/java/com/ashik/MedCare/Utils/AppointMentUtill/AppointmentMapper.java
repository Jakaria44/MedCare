package com.ashik.MedCare.Utils.AppointMentUtill;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Entities.Slot;
import com.ashik.MedCare.RequestObject.AppointmentRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AppointmentMapper {


    public  static AppointmentDtO PostToDto(AppointmentDtO appointmentDtO, AppointMents appointMents){

        appointmentDtO.setId(appointMents.getId());
        appointmentDtO.setUser(appointMents.getUser());
        appointmentDtO.setDoctor(appointMents.getDoctor());
        appointmentDtO.setStartTime(appointMents.getStartTime());
        appointmentDtO.setEndTime(appointMents.getEndTime());
        appointmentDtO.setDescription(appointMents.getDescription());

        return appointmentDtO;

    }

    public  static AppointMents DtoToPost(AppointmentDtO appointmentDtO, AppointMents appointMents){

//        appointmentDtO.setId(appointMents.getId());
        appointMents.setUser(appointmentDtO.getUser());
        appointMents.setDoctor(appointmentDtO.getDoctor());
        appointMents.setStartTime(appointmentDtO.getStartTime());
        appointMents.setEndTime(appointmentDtO.getEndTime());
        appointMents.setDescription(appointmentDtO.getDescription());

        return appointMents;

    }


    public  static AppointmentDtO  RequestToDto(AppointmentDtO appointmentDtO, AppointmentRequest request){

//        appointmentDtO.setId(appointMents.getId());

        LocalDate localDate = request.getLocalDate();
        LocalTime startTime = request.getStartTime();
        LocalTime endTime = request.getEndTime();

        LocalDateTime localDateTime = localDate.atTime(startTime);
        LocalDateTime localDateTime1 = localDate.atTime(endTime);

        appointmentDtO.setDescription(request.getDescription());
        appointmentDtO.setStartTime(localDateTime);
        appointmentDtO.setEndTime(localDateTime1);

        return appointmentDtO;


    }

    public  static  AppointmentResponse dtoToResponse(AppointmentDtO dtO, AppointmentResponse response){

        response.setDescription(dtO.getDescription());
        response.setDoctorid(dtO.getDoctor().getId());
        response.setId(dtO.getId());
        response.setEndTime(dtO.getEndTime());
        response.setStartTime(dtO.getStartTime());
        response.setDoctorLoginId(dtO.getDoctor().getLoginUserId());
        response.setUserid(dtO.getUser().getId());

        return response;

    }

}
