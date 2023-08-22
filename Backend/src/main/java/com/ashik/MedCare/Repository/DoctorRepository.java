package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository  extends JpaRepository<Doctor,Integer> {

}
