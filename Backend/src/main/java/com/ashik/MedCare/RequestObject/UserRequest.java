package com.ashik.MedCare.RequestObject;

import com.ashik.MedCare.Entities.Address;
import lombok.Data;

@Data
public class UserRequest {

    private String firstName;
    private String lastName;
    private String email;
    private AddressReq addressReq;
    private String password;

}
