package com.ashik.MedCare.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PostImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String imageName;
    @ManyToOne
    private FundRaisePost fundRaisePost;
}
