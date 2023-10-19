package com.example.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.IngredientDTO;
import com.example.backend.model.IngredientEntity;
import com.example.backend.service.IngredientService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ingredient")
public class IngredientController {
	
	@Autowired
	private IngredientService service;
	
	@PostMapping
	public ResponseEntity<?> createIngredient(@AuthenticationPrincipal String userId, @RequestBody IngredientDTO dto) {
		try {
		// dto 를 이용해 테이블에 저장하기 위한 entity를 생성한다.
		IngredientEntity entity = IngredientDTO.toEntity(dto);
		// entity userId를 임시로 지정한다.
		entity.setId(null);
		entity.setUserId(userId);
		
		// service.create 를 통해 repository 에 entity를 저장한다.
		// 이때 넘어노는 값이 없을 수도 있으므로 List가 아닌 Optional 로 한다.
		List<IngredientEntity> entities = service.create(entity);
		
		// entities 를 dtos 로 스트림 변환한다.
		List<IngredientDTO> dtos = entities.stream().map(IngredientDTO::new).collect(Collectors.toList());
		log.info("Log:entities => dtos ok!");		

		ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().data(dtos).build();
		log.info("Log:responsedto ok!");
		
		// HTTP Status 200 상태로 response 를 전송한다.
		return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			String error = e.getMessage();
			ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@GetMapping
	public ResponseEntity<?> retrieveIngredientList(@AuthenticationPrincipal String userId) {
		List<IngredientEntity> entities = service.retrieve(userId);
		List<IngredientDTO> dtos = entities.stream().map(IngredientDTO::new).collect(Collectors.toList());
		ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().data(dtos).build();

		return ResponseEntity.ok().body(response);
	}
	
	@PutMapping
	public ResponseEntity<?> updateIngredient(@AuthenticationPrincipal String userId, @RequestBody IngredientDTO dto) {
		try {
			// dto를 이용해 테이블에 저장하기 위한 entity를 생성한다.
			IngredientEntity entity = IngredientDTO.toEntity(dto);
			entity.setUserId(userId);

			// service.create를 통해 repository에 entity를 저장한다.
			// 이때 넘어오는 값이 없을수도 있으므로 List가 아닌 Optional을 쓴다.
			List<IngredientEntity> entities = service.updateIngredient(entity);

			// entities를 dtos로 스트림 변환한다.
			List<IngredientDTO> dtos = entities.stream().map(IngredientDTO::new).collect(Collectors.toList());
			// Response DTO를 생성한다
			ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().data(dtos).build();

			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			String error = e.getMessage();
			ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<?> delete(@AuthenticationPrincipal String userId, @RequestBody IngredientDTO dto) {
		try {
			IngredientEntity entity = IngredientDTO.toEntity(dto);
			entity.setUserId(userId);
			List<IngredientEntity> entities = service.delete(entity);
			List<IngredientDTO> dtos = entities.stream().map(IngredientDTO::new).collect(Collectors.toList());
			ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().data(dtos).build();

			System.out.println(response);
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			String error = e.getMessage();
			ResponseDTO<IngredientDTO> response = ResponseDTO.<IngredientDTO>builder().error(error).build();
			return ResponseEntity.badRequest().body(response);
		}
	}
}