package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.DoctorDtos;
import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Utils.BloodDonatePostPageResponse;
import com.ashik.MedCare.Utils.DoctorUtills.DoctorPagePost;

import java.util.List;

public interface DoctorServices {
    public DoctorDtos applydoctor(DoctorDtos doctorDtos);

    //Doctor approve by admin

    public Doctor approveDoctor(int id);

    public  List<DoctorDtos> getAllApprovedDoctor(boolean approve);

    DoctorPagePost allDoctorPage(Integer pageNumber,
                                         Integer pageSize,
                                         String SortBy,
                                         String SortDir,
                                          boolean approve);


    public  Doctor getsingledoctor(Integer id);

    DoctorPagePost getAlldoctorbySpecialization(String specialization,Integer pageNumber,Integer pageSize,
                                                String SortBy,
                                                String SortDir);

    List<String> getallspecialization();

    public boolean deleteDoctor(Integer id);







}
