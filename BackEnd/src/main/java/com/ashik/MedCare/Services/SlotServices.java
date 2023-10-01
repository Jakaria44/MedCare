package com.ashik.MedCare.Services;

import com.ashik.MedCare.DTOs.SlotDto;

import java.util.List;

public interface SlotServices {

     public List<SlotDto> getAllSlotofSingleDoctor(Integer id);

}
