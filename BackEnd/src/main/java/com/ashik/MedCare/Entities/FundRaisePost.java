package com.ashik.MedCare.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class FundRaisePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private Integer amount;
    private Integer donatedAmount;
    @Column(length = 10000)
    private String postContent;
    private boolean isApprove;
    private Date createdDate;
    private Date approveDate;
    @OneToMany(mappedBy = "fundRaisePost")
    private List<PostImage>postImages;
    @OneToMany(mappedBy = "fundRaisePost")
    private List <ProvedDocument>proveDocuments;
    @ManyToOne
    @JsonBackReference
    private User user;

}
