package com.example.backend.model;

import java.time.LocalDate;

//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name ="Ingredient")
public class IngredientEntity {
	@Id
	@GeneratedValue(generator="system-uuid")  // 자동으로 id 생성
	@GenericGenerator(name="system-uuid",strategy="uuid")
	private String id;
	private String ingredient;
	private int ingrcount;
	private LocalDate usebydate;
	private String userId;
}