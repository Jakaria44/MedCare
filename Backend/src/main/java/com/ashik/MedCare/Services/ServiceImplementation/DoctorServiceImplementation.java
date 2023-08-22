package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Services.DoctorServices;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImplementation implements DoctorServices {

    @Autowired
    private DoctorRepository doctorRepository;


    @Override
    public DoctorDtos applydoctor(DoctorDtos doctorDtos) {

        Doctor doctor = Mapper.doctordtoToPost(doctorDtos);

        Doctor save = doctorRepository.save(doctor);

        DoctorDtos doctorDtos1 = Mapper.doctorPostTodto(save);


        return doctorDtos1;
    }
}
