package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Utils.AppointMentUtill.AppointmentResponse;

import java.util.List;

public interface AppointmentServices {

    public AppointmentDtO createAppoinMent(AppointmentDtO appointmentDtO);
    public List<AppointmentResponse> upcomingAppointmentForPatient(Integer id,String SortBy, String Sortdir);
    public List<AppointmentResponse> ongoingAppointmentForPatient(Integer id,String SortBy, String Sortdir);

    public List<AppointmentResponse> upcomingAppointmentForDoctor(Integer id,String SortBy, String Sortdir);

    public List<AppointmentResponse> ongoingAppointmentForDoctor(Integer id,String SortBy, String Sortdir);
}
