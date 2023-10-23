package com.example.backend.controller;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.RecipeDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/")
public class RecipeController {
	private static WebDriver driver;
	private static String url;
	// 1. 드라이버 설치 경로
	public static String WEB_DRIVER_ID = "webdriver.chrome.driver";
	public static String WEB_DRIVER_PATH = "C:/chromedriver/chromedriver.exe";
	
	public static void Driver() {
		// WebDriver 경로 설정
		System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

		// 2. WebDriver 옵션 설정
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--headless"); 
		options.addArguments("--disable-popup-blocking"); // 팝업 무시
		options.addArguments("--disable-default-apps"); // 기본앱 사용안함

		driver = new ChromeDriver(options);
	}
	
	public static List<String> getImageUrl() {
		List<WebElement> elementImage;  // 이미지 URL
		elementImage = driver.findElements(
				By.cssSelector("#contents_area_full > ul > ul > li:nth-child(-n+8) > div.common_sp_thumb > a > img"));
		List<String> imageUrl = new ArrayList<>(); // 이미지 URL이 담긴 리스트
		for (int i = 0; i < elementImage.size(); i++) {
			imageUrl.add(elementImage.get(i).getAttribute("src"));
		}
		
		return imageUrl;
	}
	
	public static List<String> getNameList() {
		List<WebElement> elementName;  // 요리 이름
		elementName = driver.findElements
				(By.cssSelector("#contents_area_full > ul > ul > li:nth-child(-n+8) > div.common_sp_caption > div.common_sp_caption_tit.line2"));
		List<String> nameList = new ArrayList<>(); //요리가 담긴 리스트
		for (int i = 0; i < elementName.size(); i++) {
			nameList.add(elementName.get(i).getAttribute("innerText"));
		}
		
		return nameList;
	}

	public static List<RecipeDTO> Crawling() throws ParseException {
		Driver();

		url = "https://www.10000recipe.com/recipe/list.html";
		driver.get(url);
		driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
		
		List<String> imageUrl = new ArrayList<>(); // 이미지 URL이 담긴 리스트
		imageUrl = getImageUrl();

		List<String> nameList = new ArrayList<>(); // 요리가 담긴 리스트
		nameList = getNameList();

		List<WebElement> element;
		element = driver.findElements(By.xpath("//*[@id=\"contents_area_full\"]/ul/ul/li/div/a"));
		List<String> ingredientList = new ArrayList<>(); // 재료 리스트
		JSONArray JSONRecipeList = new JSONArray();
		List<String> recipeList = new ArrayList<>(); // 레시피 리스트
		String[] href = null;
		List<String> urlList = new ArrayList<>();
		
		for (int i = 0; i < 8; i++) {
			href = element.get(i).getAttribute("href").split("/");
			urlList.add("https://www.10000recipe.com/recipe/" + href[href.length - 1]);
		}
		for (int i = 0; i < 8; i++) {
			driver.get(urlList.get(i));
			driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
			WebElement elementRecipe;
			elementRecipe = driver.findElement(By.xpath("//script[@type='application/ld+json']"));

			String recipe = elementRecipe.getAttribute("innerText");
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParser.parse(recipe);

			JSONArray ingredientArray = (JSONArray) jsonObj.get("recipeIngredient");
			ingredientList.add(ingredientArray.toJSONString());
			JSONArray recipeArray = (JSONArray) jsonObj.get("recipeInstructions");
			for (int j = 0; j < recipeArray.size(); j++) {
				JSONObject recipeObject = (JSONObject) recipeArray.get(j);
				JSONRecipeList.add(recipeObject.get("text"));
			}
			recipeList.add(JSONRecipeList.toJSONString());
		}
		
		List<RecipeDTO> responseRecipeDTOList = new ArrayList<>();
		for(int i = 0; i < 8; i++) {
			final RecipeDTO responseRecipeDTO = RecipeDTO.builder()
					.imageUrl(imageUrl.get(i))
					.name(nameList.get(i))
					.ingredient(ingredientList.get(i))
					.recipe(recipeList.get(i))
					.build();
			responseRecipeDTOList.add(responseRecipeDTO);
		}
		
		return responseRecipeDTOList;
	}

	public static List<RecipeDTO> Crawling(String name) throws ParseException {
		Driver();

		url = "https://www.10000recipe.com/recipe/list.html?q=" + name;
		driver.get(url);
		driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
		
		List<String> imageUrl = new ArrayList<>(); // 이미지 URL이 담긴 리스트
		imageUrl = getImageUrl();

		List<String> nameList = new ArrayList<>(); // 요리가 담긴 리스트
		nameList = getNameList();
		
		List<WebElement> element;
		element = driver.findElements(By.xpath("//*[@id=\"contents_area_full\"]/ul/ul/li/div/a"));
		List<String> ingredientList = new ArrayList<>(); // 재료 리스트
		JSONArray JSONRecipeList = new JSONArray();
		List<String> recipeList = new ArrayList<>(); // 레시피 리스트
		String[] href = null;
		List<String> urlList = new ArrayList<>();
		
		for (int i = 0; i < 8; i++) {
			href = element.get(i).getAttribute("href").split("/");
			urlList.add("https://www.10000recipe.com/recipe/" + href[href.length - 1]);
		}
		for (int i = 0; i < 8; i++) {
			driver.get(urlList.get(i));
			driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
			WebElement elementRecipe;
			elementRecipe = driver.findElement(By.xpath("//script[@type='application/ld+json']"));

			String recipe = elementRecipe.getAttribute("innerText");
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParser.parse(recipe);

			JSONArray ingredientArray = (JSONArray) jsonObj.get("recipeIngredient");
			ingredientList.add(ingredientArray.toJSONString());
			JSONArray recipeArray = (JSONArray) jsonObj.get("recipeInstructions");
			if (recipeArray == null) {
				JSONRecipeList.add("[\"관련정보가 없습니다.\"]");
				recipeList.add(JSONRecipeList.toJSONString());
			} else {
				for (int j = 0; j < recipeArray.size(); j++) {
					JSONObject recipeObject = (JSONObject) recipeArray.get(j);
					JSONRecipeList.add(recipeObject.get("text"));
				}
				recipeList.add(JSONRecipeList.toJSONString());
			}
		}
		
		List<RecipeDTO> responseRecipeDTOList = new ArrayList<>();
		for(int i = 0; i < 8; i++) {
			final RecipeDTO responseRecipeDTO = RecipeDTO.builder()
					.imageUrl(imageUrl.get(i))
					.name(nameList.get(i))
					.ingredient(ingredientList.get(i))
					.recipe(recipeList.get(i))
					.build();
			responseRecipeDTOList.add(responseRecipeDTO);
		}
		
		return responseRecipeDTOList;
	}
	
	public static List<RecipeDTO> categoryCrawling(String number) throws ParseException {
		Driver();

		url = "https://www.10000recipe.com/recipe/list.html?q=&query=&cat1=&cat2=&cat3=&cat4="+number+"&fct=&order=reco&lastcate=cat4&dsearch=&copyshot=&scrap=&degree=&portion=&time=&niresource=";
		driver.get(url);
		driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
		
		List<String> imageUrl = new ArrayList<>(); // 이미지 URL이 담긴 리스트
		imageUrl = getImageUrl();

		List<String> nameList = new ArrayList<>(); // 요리가 담긴 리스트
		nameList = getNameList();
		
		List<WebElement> element;
		element = driver.findElements(By.xpath("//*[@id=\"contents_area_full\"]/ul/ul/li/div/a"));
		List<String> ingredientList = new ArrayList<>(); // 재료 리스트
		JSONArray JSONRecipeList = new JSONArray();
		List<String> recipeList = new ArrayList<>(); // 레시피 리스트
		String[] href = null;
		List<String> urlList = new ArrayList<>();
		
		for (int i = 0; i < 8; i++) {
			href = element.get(i).getAttribute("href").split("/");
			urlList.add("https://www.10000recipe.com/recipe/" + href[href.length - 1]);
		}
		for (int i = 0; i < 8; i++) {
			driver.get(urlList.get(i));
			driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
			WebElement elementRecipe;
			elementRecipe = driver.findElement(By.xpath("//script[@type='application/ld+json']"));

			String recipe = elementRecipe.getAttribute("innerText");
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParser.parse(recipe);

			JSONArray ingredientArray = (JSONArray) jsonObj.get("recipeIngredient");
			ingredientList.add(ingredientArray.toJSONString());
			JSONArray recipeArray = (JSONArray) jsonObj.get("recipeInstructions");
			if (recipeArray == null) {
				JSONRecipeList.add("[\"관련정보가 없습니다.\"]");
				recipeList.add(JSONRecipeList.toJSONString());
			} else {
				for (int j = 0; j < recipeArray.size(); j++) {
					JSONObject recipeObject = (JSONObject) recipeArray.get(j);
					JSONRecipeList.add(recipeObject.get("text"));
				}
				recipeList.add(JSONRecipeList.toJSONString());
			}
		}
		
		List<RecipeDTO> responseRecipeDTOList = new ArrayList<>();
		for(int i = 0; i < 8; i++) {
			final RecipeDTO responseRecipeDTO = RecipeDTO.builder()
					.imageUrl(imageUrl.get(i))
					.name(nameList.get(i))
					.ingredient(ingredientList.get(i))
					.recipe(recipeList.get(i))
					.build();
			responseRecipeDTOList.add(responseRecipeDTO);
		}
		
		return responseRecipeDTOList;
	}

	@GetMapping
	public ResponseEntity<?> recipeList() throws ParseException {
		List<RecipeDTO> recipe = new ArrayList<>();
		recipe = Crawling();
		
		return ResponseEntity.ok().body(recipe);
	}
	
	@PostMapping
	public ResponseEntity<?> searchRecipe(@RequestBody RecipeDTO RecipeDTO) throws ParseException {
		List<RecipeDTO> recipe = new ArrayList<>();
		recipe = Crawling(RecipeDTO.getName());
		
		return ResponseEntity.ok().body(recipe);
	}
	
	@PostMapping("/category")
	public ResponseEntity<?> categoryRecipe(@RequestBody RecipeDTO RecipeDTO) throws ParseException {
		List<RecipeDTO> recipe = new ArrayList<>();
		recipe = categoryCrawling(RecipeDTO.getName());
		
		return ResponseEntity.ok().body(recipe);
	}
}