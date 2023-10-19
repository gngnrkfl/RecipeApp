package com.example.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
	UserEntity findByEmail(String email);
	UserEntity findByPassword(String password);
	Boolean existsByEmail(String email);
	UserEntity findByEmailAndPassword(String email, String password);
}
