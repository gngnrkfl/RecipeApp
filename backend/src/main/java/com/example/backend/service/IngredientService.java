package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.IngredientEntity;
import com.example.backend.persistence.IngredientRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class IngredientService {
	
	@Autowired
	private IngredientRepository repository;
	
	public List<IngredientEntity> create(final IngredientEntity entity) {
		//Validations
		validate(entity);
		repository.save(entity);
		//return repository.findById(entity.getId());
		return repository.findByUserId(entity.getUserId());
	}
	
	public List<IngredientEntity> retrieve(final String userId) {
		return repository.findByUserId(userId);
	}
	
	public List<IngredientEntity> update(final IngredientEntity entity) {
		//Validations
		validate(entity);
		if (repository.existsById(entity.getId())) {
			repository.save(entity);
		}
		else
			throw new RuntimeException("Unknown id");
		
		//return repository.findById(entity.getId());
		return repository.findByUserId(entity.getUserId());		
	}
	
	public List<IngredientEntity> updateIngredient(final IngredientEntity entity) {
		// Validations
		validate(entity);

		// 테이블에서 id에 해당하는 데이타셋을 가져온다.
		final Optional<IngredientEntity> original = repository.findById(entity.getId());

		// original에 담겨진 내용을 todo에 할당하고 title, done 값을 변경한다.
		original.ifPresent(ingredient -> {
			ingredient.setIngrcount(entity.getIngrcount());
			ingredient.setIngredient(entity.getIngredient());
			ingredient.setUsebydate(entity.getUsebydate());
			repository.save(ingredient);
		});

		return repository.findByUserId(entity.getUserId());
	}
	
	public List<IngredientEntity> delete(final IngredientEntity entity) {
		if(repository.existsById(entity.getId()))
			repository.deleteById(entity.getId());
		else
			throw new RuntimeException("id does not exist");
		
		return repository.findByUserId(entity.getUserId());
	}
	public void validate(final IngredientEntity entity) {
		if(entity == null ) {
			log.warn("Entity cannot be null.");
			throw new RuntimeException("Entity cannot be null.");
		}
		if(entity.getUserId() == null) {
			log.warn("Unknown user.");
			throw new RuntimeException("Unknown user.");
		}
	}
}