package com.ashik.MedCare.Utils.DoctorUtills;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.DoctorAvailability;

import java.util.Date;

public class DoctorMapper {

    public static Doctor dtoToDoctor(DoctorDtos doctorDtos, Doctor doctor){
        doctor.setDoctorAvailabilities(doctorDtos.getDoctorAvailabilities());
        doctor.setDescription(doctorDtos.getDescription());
        doctor.setAppointMents(doctorDtos.getAppointMents());
        doctor.setName(doctorDtos.getName());
        doctor.setApprove(doctorDtos.isApprove());
        doctor.setCvUrl(doctorDtos.getCvUrl());
        doctor.setProfileImageUrl(doctorDtos.getProfileImageUrl());
        doctor.setSpecialization(doctorDtos.getSpecialization());
        doctor.setAppliedTime(doctorDtos.getAppliedTime());
        doctor.setAppointmentFee(doctorDtos.getAppointmentFee());
        doctor.setEmail(doctorDtos.getEmail());

        return doctor;
    }

    public static DoctorDtos doctorToDtos(Doctor doctor, DoctorDtos doctorDtos){

        doctorDtos.setDoctorAvailabilities(doctor.getDoctorAvailabilities());
        doctorDtos.setDescription(doctor.getDescription());
        doctorDtos.setAppointMents(doctor.getAppointMents());
        doctorDtos.setName(doctor.getName());
        doctorDtos.setApprove(doctor.isApprove());
        doctorDtos.setCvUrl(doctor.getCvUrl());
        doctorDtos.setProfileImageUrl(doctor.getProfileImageUrl());
        doctorDtos.setSpecialization(doctor.getSpecialization());
        doctorDtos.setId(doctor.getId());
        doctorDtos.setAppliedTime(doctor.getAppliedTime());
        doctorDtos.setAppointmentFee(doctor.getAppointmentFee());
        doctorDtos.setEmail(doctor.getEmail());


        return doctorDtos;

    }

    public static DoctorDtos applyRequestToDto(DoctorApplyRequest applyRequest){

        DoctorDtos doctorDtos = new DoctorDtos();

        doctorDtos.setDoctorAvailabilities(applyRequest.getDoctorAvailabilities());
        doctorDtos.setDescription(applyRequest.getDescription());
        doctorDtos.setName(applyRequest.getName());
        doctorDtos.setCvUrl(applyRequest.getCvUrl());
        doctorDtos.setProfileImageUrl(applyRequest.getProfileImageUrl());
        doctorDtos.setSpecialization(applyRequest.getSpecialization());
        doctorDtos.setAppliedTime(new Date());
        doctorDtos.setEmail(applyRequest.getEmail());
        doctorDtos.setAppointmentFee(applyRequest.getAppointmentFee());

        return doctorDtos;
    }



}
