package com.ashik.MedCare.Repository;

import com.ashik.MedCare.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    public User findByEmail(String email);


}
