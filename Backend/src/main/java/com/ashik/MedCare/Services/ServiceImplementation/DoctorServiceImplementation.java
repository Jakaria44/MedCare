package com.ashik.MedCare.Services.ServiceImplementation;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Repository.DoctorRepository;
import com.ashik.MedCare.Services.DoctorServices;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorMapper;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorPagePost;
import com.ashik.MedCare.Utils.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImplementation implements DoctorServices {

    @Autowired
    private DoctorRepository doctorRepository;


    @Override
    public DoctorDtos applydoctor(DoctorDtos doctorDtos) {

        Doctor doctor = new Doctor();

        Doctor doctor1 = DoctorMapper.dtoToDoctor(doctorDtos, doctor);
        Doctor save = doctorRepository.save(doctor1);

        DoctorDtos doctorDtos1 = new DoctorDtos();
        DoctorMapper.doctorToDtos(save,doctorDtos1);

        return doctorDtos1;

    }

    @Override
    public Doctor approveDoctor(int id) {

        Optional<Doctor> byId = doctorRepository.findById(id);
        Doctor doctor = byId.get();

        doctor.setApprove(true);
        doctor.setAppliedTime(new Date());

        Doctor save = doctorRepository.save(doctor);


        return save;
    }

    @Override
    public List<DoctorDtos> getAllApprovedDoctor(boolean approve) {


        List<Doctor> byApproveOrderByAppliedTimeDesc = doctorRepository.findByApproveOrderByAppliedTimeDesc(approve);
//        DoctorDtos doctorDtos = new DoctorDtos();
        List<DoctorDtos> collect =
                byApproveOrderByAppliedTimeDesc.stream().map((doctor) -> DoctorMapper.doctorToDtos(doctor, new DoctorDtos())).collect(Collectors.toList());


        return collect;
    }

    @Override
    public DoctorPagePost allDoctorPage(Integer pageNumber,
                                        Integer pageSize,
                                        String SortBy,
                                        String SortDir,
                                        boolean approve) {


        Sort sort = SortDir.equalsIgnoreCase("asc")? Sort.by(SortBy).ascending():Sort.by(SortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber,pageSize,sort);

        Page<Doctor> byApprove = doctorRepository.findByApprove(approve, pageable);

        List<DoctorDtos> collect =
                byApprove.stream().map((doctor) -> DoctorMapper.doctorToDtos(doctor, new DoctorDtos())).collect(Collectors.toList());

        DoctorPagePost doctorPagePost = new DoctorPagePost();
        doctorPagePost.setContent(collect);
        doctorPagePost.setLastPage(byApprove.isLast());
        doctorPagePost.setPageSize(byApprove.getSize());
        doctorPagePost.setPageNumber(byApprove.getNumber());
        doctorPagePost.setTotalPages(byApprove.getTotalPages());
        doctorPagePost.setTotaleElements(byApprove.getNumberOfElements());

        return doctorPagePost;

    }


}
