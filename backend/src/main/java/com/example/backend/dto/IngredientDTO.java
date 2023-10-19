package com.example.backend.dto;

import java.time.LocalDate;

import com.example.backend.model.IngredientEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class IngredientDTO {
	private String id;
	private String ingredient;
	private int ingrcount;
	private LocalDate usebydate;
	
	public IngredientDTO(final IngredientEntity entity){
		this.id = entity.getId();
		this.ingredient = entity.getIngredient();
		this.ingrcount = entity.getIngrcount();
		this.usebydate = entity.getUsebydate();
	}
	public static IngredientEntity toEntity(final IngredientDTO dto){
		return IngredientEntity.builder()
				.id(dto.getId())
				.ingredient(dto.getIngredient())
				.ingrcount(dto.getIngrcount())
				.usebydate(dto.getUsebydate()).build();
	}
}