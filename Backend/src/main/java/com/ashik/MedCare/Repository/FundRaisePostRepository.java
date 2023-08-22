package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.FundRaisePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundRaisePostRepository extends JpaRepository<FundRaisePost,Integer> {
      public List<FundRaisePost>findByUserId(Integer id);
}
