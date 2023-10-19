package com.example.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecipeDTO {
	private String imageUrl;
	private String name;
	private String ingredient;
	private String recipe;
}
