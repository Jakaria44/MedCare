package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Repository.AppointmentRepository;
import com.ashik.MedCare.Services.AppointmentServices;
import com.ashik.MedCare.Utils.AppointMentUtill.AppointmentMapper;
import com.ashik.MedCare.Utils.AppointMentUtill.AppointmentResponse;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImple  implements AppointmentServices {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public AppointmentDtO createAppoinMent(AppointmentDtO appointmentDtO) {

        AppointMents appointMents = AppointmentMapper.DtoToPost(appointmentDtO,new AppointMents());
        AppointMents save = appointmentRepository.save(appointMents);



        return AppointmentMapper.PostToDto(new AppointmentDtO(),save);
    }

    @Override
    public List<AppointmentResponse> upcomingAppointmentForPatient(Integer id,String SortBy, String Sortdir) {

        Sort sort = Sortdir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        LocalDateTime now  = LocalDateTime.now();
        List<AppointMents> upcomingAppointmentsForPatient = appointmentRepository.findUpcomingAppointmentsForPatient(id, now,sort);
        List<AppointmentDtO> collect =
                upcomingAppointmentsForPatient.stream().map((post) -> AppointmentMapper.PostToDto(new AppointmentDtO(), post)).collect(Collectors.toList());

        List<AppointmentResponse> collect1 =
                collect.stream().map((post) -> AppointmentMapper.dtoToResponse(post, new AppointmentResponse())).collect(Collectors.toList());


        return collect1;
    }

    @Override
    public List<AppointmentResponse> ongoingAppointmentForPatient(Integer id, String SortBy, String Sortdir) {
        Sort sort = Sortdir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        LocalDateTime now  = LocalDateTime.now();

        List<AppointMents> ongoingAppointmentsForPatient = appointmentRepository.findOngoingAppointmentsForPatient(id, now, sort);

        List<AppointmentDtO> collect =
                ongoingAppointmentsForPatient.stream().map((post) -> AppointmentMapper.PostToDto(new AppointmentDtO(), post)).collect(Collectors.toList());

        List<AppointmentResponse> collect1 =
                collect.stream().map((post) -> AppointmentMapper.dtoToResponse(post, new AppointmentResponse())).collect(Collectors.toList());



        return collect1;
    }

    @Override
    public List<AppointmentResponse> upcomingAppointmentForDoctor(Integer id, String SortBy, String Sortdir) {

        Sort sort = Sortdir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        LocalDateTime now  = LocalDateTime.now();

        List<AppointMents> upcomingAppointmentsForDoctor = appointmentRepository.findUpcomingAppointmentsForDoctor(id, now, sort);

        List<AppointmentDtO> collect =
                upcomingAppointmentsForDoctor.stream().map((post) -> AppointmentMapper.PostToDto(new AppointmentDtO(), post)).collect(Collectors.toList());

        List<AppointmentResponse> collect1 =
                collect.stream().map((post) -> AppointmentMapper.dtoToResponse(post, new AppointmentResponse())).collect(Collectors.toList());



        return collect1;
    }

    @Override
    public List<AppointmentResponse> ongoingAppointmentForDoctor(Integer id, String SortBy, String Sortdir) {

        Sort sort = Sortdir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        LocalDateTime now  = LocalDateTime.now();

        List<AppointMents> ongoingAppointmentsForDoctor = appointmentRepository.findOngoingAppointmentsForDoctor(id, now, sort);

        List<AppointmentDtO> collect =
                ongoingAppointmentsForDoctor.stream().map((post) -> AppointmentMapper.PostToDto(new AppointmentDtO(), post)).collect(Collectors.toList());

        List<AppointmentResponse> collect1 =
                collect.stream().map((post) -> AppointmentMapper.dtoToResponse(post, new AppointmentResponse())).collect(Collectors.toList());



        return collect1;

    }
}
