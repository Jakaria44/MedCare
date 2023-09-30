package com.ashik.MedCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class MedCareApplication {

	public static void main(String[] args) {

		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Almaty"));

		SpringApplication.run(MedCareApplication.class, args);
	}

}
//auqnycynimcplvmx