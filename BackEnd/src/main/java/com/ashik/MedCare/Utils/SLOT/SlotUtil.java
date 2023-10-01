package com.ashik.MedCare.Utils.SLOT;

import com.ashik.MedCare.DTOs.SlotDto;
import com.ashik.MedCare.Entities.Slot;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SlotUtil {


    public static List<LocalDate> upcomingAllDates(String weekDay){

        String wkDay = weekDay.toUpperCase();
        LocalDate localDate = LocalDate.now();
        int year = localDate.getYear();
        int month = localDate.getMonthValue();

        List<LocalDate> upsomingweekday = new ArrayList<>();

        LocalDate firstday =
                LocalDate.of(year,month,1)
                        .with(TemporalAdjusters.nextOrSame(DayOfWeek.valueOf(wkDay)));

        LocalDate nextday = firstday;

        while (nextday.getMonthValue()<= month+1){
            upsomingweekday.add(nextday);
            nextday = nextday.plusWeeks(1);
        }


        return upsomingweekday;
    }


    public static SlotDto  SlotToDtoMapper(Slot slot, SlotDto slotDto){

        slotDto.setDoctor(slot.getDoctor());
        slotDto.setEndTime(slot.getEndTime());
        slotDto.setLocalDate(slot.getLocalDate());
        slotDto.setStartTime(slot.getStartTime());
        slotDto.setId(slot.getId());

        return slotDto;

    }








}
