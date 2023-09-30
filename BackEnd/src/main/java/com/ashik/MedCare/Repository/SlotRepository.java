package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.AppointMents;
import com.ashik.MedCare.Entities.Slot;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public interface SlotRepository extends JpaRepository<Slot,Integer> {

    public List<Slot>findByDoctorId(Integer doctorid);





}
