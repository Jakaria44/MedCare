package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.AppointMents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository  extends JpaRepository<AppointMents,Integer> {
}
