package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository  extends JpaRepository<Doctor,Integer> {

    public List<Doctor> findByApproveOrderByAppliedTimeDesc(boolean approve);

     Page<Doctor> findByApprove(boolean approve, Pageable pageable);



}
