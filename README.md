# 2023 웹킷 개인프로젝트
> 프론트엔드는 React, 백엔드는 Spring 사용
> 냉장고의 재료를 리스트로 관리하고 레시피를 추천받는 사이트

## 개요
- 회원가입 시 재료의 개수와 유통기한을 등록해 리스트로 관리할 수 있다.
- 재료를 클릭할경우 재료로 만들 수 있는 요리를 검색해 크롤링 해와 레시피들을 보여준다.

## 개발기간 및 환경
- 기간 : 2023.10.11 ~ 2023.10.21 (10일)
- OS : Windows10
- 메인 언어 : Java, JavaScript
- 태그 : ```Java```, ```JavaScript```

## 개발내용
- 회원관리 : UserEntity.java, UserDTO.java, UserRepository.java, UserService.java, UserController.java, Signup.js
- 로그인 : Login.js, WebSecurityConfig.java, TokenProvider.java
- 메인화면 : App.js
- 재료관리 : IngredientEntity.java, IngredientDTO.java, IngredientRepository.java, IngredientService.java, IngredientController.java, Ingredient.js, IngredientList.js
- 레시피 : Recipe.js, RecipeController.java, RecipeDTO.java
- 크롤링 파일 : Crawling.java
