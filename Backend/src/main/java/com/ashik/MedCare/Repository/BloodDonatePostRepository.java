package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.BloodDonatePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodDonatePostRepository extends JpaRepository<BloodDonatePost,Integer> {

    public List<BloodDonatePost> findByUserId(Integer userid);
    Page <BloodDonatePost> findByAvailibilityOrderByCreatedDateDesc(boolean available, Pageable pageable);


}
