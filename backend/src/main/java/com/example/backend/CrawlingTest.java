package com.example.backend;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import javax.imageio.ImageIO;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import com.example.backend.dto.RecipeDTO;

public class CrawlingTest {
	private static WebDriver driver;
	private static String url;
	// 1. 드라이버 설치 경로
	public static String WEB_DRIVER_ID = "webdriver.chrome.driver";
	public static String WEB_DRIVER_PATH = "C:/chromedriver/chromedriver.exe";

	public static void URL(String name) throws ParseException {
		// WebDriver 경로 설정
		System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

		// 2. WebDriver 옵션 설정
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--disable-popup-blocking"); // 팝업 무시
		options.addArguments("--disable-default-apps"); // 기본앱 사용안함

		driver = new ChromeDriver(options);

		url = "https://www.10000recipe.com/recipe/list.html?q=" + name;
		driver.get(url);
		driver.manage().timeouts().implicitlyWait(Duration.ofMillis(5000));
		List<WebElement> element2;
		element2 = driver.findElements(
				By.cssSelector("#contents_area_full > ul > ul > li:nth-child(-n+5) > div.common_sp_thumb > a > img"));
		List<String> a = new ArrayList<>();
		for (int i = 0; i < element2.size(); i++) {
			a.add(element2.get(i).getAttribute("src"));
		}

		List<WebElement> elementName; // 요리 이름
		elementName = driver.findElements(By.cssSelector(
				"#contents_area_full > ul > ul > li:nth-child(-n+5) > div.common_sp_caption > div.common_sp_caption_tit.line2"));
		List<String> nameList = new ArrayList<>();
		for (int i = 0; i < elementName.size(); i++) {
			nameList.add(elementName.get(i).getAttribute("innerText"));
		}

		List<WebElement> element;
		element = driver.findElements(By.xpath("//*[@id=\"contents_area_full\"]/ul/ul/li/div/a"));
		List<String> ingredientList = new ArrayList<>();
		JSONArray JSONRecipeList = new JSONArray();
		List<String> recipeList = new ArrayList<>();
		String[] href = null;
		List<String> urlList = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			href = element.get(i).getAttribute("href").split("/");
			urlList.add("https://www.10000recipe.com/recipe/" + href[href.length - 1]);
		}
		for (int i = 0; i < 5; i++) {
			driver.get(urlList.get(i));
			driver.manage().timeouts().implicitlyWait(Duration.ofMillis(5000));
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
		for(int i = 0; i < 5; i++) {
			final RecipeDTO responseRecipeDTO = RecipeDTO.builder()
					.imageUrl(a.get(i))
					.name(nameList.get(i))
					.ingredient(ingredientList.get(i))
					.recipe(recipeList.get(i))
					.build();
			responseRecipeDTOList.add(responseRecipeDTO);
		}
		System.out.println(responseRecipeDTOList);

		String[] href2 = element.get(0).getAttribute("href").split("/");
		url = "https://www.10000recipe.com/recipe/" + href2[href2.length - 1];
	}

	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		try {
			System.out.print("요리 검색 : ");
			String food = scan.next();
			URL(food);
			driver.get(url);
			driver.manage().timeouts().implicitlyWait(Duration.ofMillis(5000));

			WebElement element;
			element = driver.findElement(By.xpath("//script[@type='application/ld+json']"));

			String a = element.getAttribute("innerText");
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParser.parse(a);
			JSONArray ingredientArray = (JSONArray) jsonObj.get("recipeIngredient");
			JSONArray recipeArray = (JSONArray) jsonObj.get("recipeInstructions");
			System.out.println("======재료======");
			for (int i = 0; i < ingredientArray.size(); i++) {
				if (i == ingredientArray.size() - 1)
					System.out.println(ingredientArray.get(i));
				else
					System.out.print(ingredientArray.get(i) + ", ");
			}
			System.out.println("======레시피======");
			for (int i = 0; i < recipeArray.size(); i++) {
				JSONObject recipeObject = (JSONObject) recipeArray.get(i);
				System.out.println(recipeObject.get("text"));
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			driver.close(); // 5. 브라우저 종료
		}
	}
}
