package com.ashik.MedCare.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ProvedDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String documentName;
    @ManyToOne
    private FundRaisePost fundRaisePost;

}
