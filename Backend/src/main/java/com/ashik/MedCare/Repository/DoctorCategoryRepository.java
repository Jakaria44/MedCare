package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.DoctorCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorCategoryRepository extends JpaRepository<DoctorCategory,Integer> {
}
