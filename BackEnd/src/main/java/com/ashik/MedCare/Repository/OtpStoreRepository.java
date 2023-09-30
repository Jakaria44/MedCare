package com.ashik.MedCare.Repository;


import com.ashik.MedCare.Entities.Doctor;
import com.ashik.MedCare.Entities.OtpStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpStoreRepository  extends JpaRepository<OtpStore,Integer> {

    public OtpStore findByUserId(Integer id);
    public OtpStore findByOtp(Integer otp);

    public OtpStore findByTemptoken(String tempToken);

}
