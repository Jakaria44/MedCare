package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class FundRaisePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String amount;
    private String postContent;
    @OneToMany(mappedBy = "fundRaisePost")
    private List<PostImage>postImages;
    @OneToMany(mappedBy = "fundRaisePost")
    private List <ProvedDocument>proveDocuments;
    @ManyToOne
    @JsonBackReference
    private User user;

}
