package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.FundRaisePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundRaisePostRepository extends JpaRepository<FundRaisePost,Integer> {
      public List<FundRaisePost>findByUserId(Integer id);

      public List<FundRaisePost>findByIsApprove(boolean isApprove, Sort sort);
      public Page<FundRaisePost> findByIsApprove(boolean isApprove, Pageable pageable);

      public Page<FundRaisePost> findByUserId(Integer userid,Pageable pageable);
}
