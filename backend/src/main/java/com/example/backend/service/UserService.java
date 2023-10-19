package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.model.UserEntity;
import com.example.backend.persistence.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public UserEntity create(final UserEntity userEntity){
		if(userEntity ==null || userEntity.getEmail()==null){
			throw new RuntimeException("Invalid arguments");
		}
		final String email = userEntity.getEmail();
		if(userRepository.existsByEmail(email)){
			log.warn("Email already exists {}",email);
			throw new RuntimeException("Email already exists");
		}
		
		return userRepository.save(userEntity);
	}
	public UserEntity getByCredentials(final String email, final String password, final PasswordEncoder encoder){
		final UserEntity originalUser = userRepository.findByEmail(email);
		
		if(originalUser !=null &&
				encoder.matches(password,
						originalUser.getPassword())){
			System.out.println(originalUser);
			return originalUser;
		}
		return null;
	}
	
	public UserEntity getUserEntity(final String email) {
		return userRepository.findByEmail(email);
	}
	
	public UserEntity getUserEntitybyps(final String password) {
		return userRepository.findByPassword(password);
	}
	
	public void userEdit(final UserEntity userEntity) {
		userRepository.save(userEntity);
	}
	
	public void userRemove(final UserEntity userEntity) {
		userRepository.delete(userEntity);
	}
}