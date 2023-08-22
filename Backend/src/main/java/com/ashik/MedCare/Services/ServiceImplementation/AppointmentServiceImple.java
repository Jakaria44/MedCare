package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.AppointmentDtO;
import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Repository.AppointmentRepository;
import com.ashik.MedCare.Services.AppointmentServices;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentServiceImple  implements AppointmentServices {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public AppointmentDtO createAppoinMent(AppointmentDtO appointmentDtO) {

        AppointMents appointMents = Mapper.appointmentDtOToPost(appointmentDtO);
        AppointMents save = appointmentRepository.save(appointMents);



        return Mapper.appointmentpostToDTO(save);
    }
}
