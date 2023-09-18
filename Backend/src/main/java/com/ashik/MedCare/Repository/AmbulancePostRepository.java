package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.AmbulancePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AmbulancePostRepository extends JpaRepository<AmbulancePost,Integer> {

    public List<AmbulancePost> findByUserId(Integer userid);

    public Page<AmbulancePost> findByUserId(Integer userid, Pageable pageable);



}
