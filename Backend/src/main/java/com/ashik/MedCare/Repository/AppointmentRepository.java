package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.AppointMents;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository  extends JpaRepository<AppointMents,Integer> {

    @Query("SELECT a FROM AppointMents a WHERE a.user.id =:userId AND a.startTime > :now")
    List<AppointMents>findUpcomingAppointmentsForPatient(@Param("userId") Integer userId, @Param("now")LocalDateTime now, Sort sort);

    @Query("SELECT a FROM AppointMents a WHERE a.user.id =:userId AND a.startTime <= :now AND a.endTime > :now")
    List<AppointMents>findOngoingAppointmentsForPatient(@Param("userId") Integer userId,  @Param("now")LocalDateTime now, Sort sort );


    @Query("SELECT a FROM AppointMents a WHERE a.doctor.id =:doctorId AND a.startTime > :now")
    List<AppointMents>findUpcomingAppointmentsForDoctor(@Param("doctorId") Integer doctorId, @Param("now")LocalDateTime now, Sort sort);


    @Query("SELECT a FROM AppointMents a WHERE a.doctor.id =:doctorId AND a.startTime <= :now AND a.endTime > :now")
    List<AppointMents>findOngoingAppointmentsForDoctor(@Param("doctorId") Integer doctorId, @Param("now")LocalDateTime now, Sort sort);
}
