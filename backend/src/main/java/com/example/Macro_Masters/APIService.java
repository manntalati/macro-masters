package com.example.Macro_Masters;

import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

// creating separate class that handles calling API for nutrition facts
// sample request: http://localhost:8080/api/nutrition?food=FOODNAME
@Service
public class APIService {
    // initialize variables
    private static final String API_URL = "https://api.calorieninjas.com/v1/nutrition";
    private static final String API_KEY = "wnZik/2FKrYUuo3IXbiIpw==2aPSqkXCgOyiCOwd";

    // initialize client to call API
    private final OkHttpClient client = new OkHttpClient();

    // IMPORTANT:
    // when calling on single food item there is no problem
    // for example, saying food= = banana
    // but if you want to do 10 bananas, food cannot have a space inbetween
    // this causes food to be parsed as 10 since whitespace delimits parameters
    // therefore, preformat it such that whitespaces are replaced with %20
    // For example, food = 10%20bananas

    // method to get info
    public String getNutritionInfo(String food) throws IOException{
        // create GET request based on parameters
        
        // encode parameter and encode using %20
        String encodedFood = URLEncoder.encode(food, StandardCharsets.UTF_8.toString());
        System.out.println(encodedFood);
        Request request = new Request.Builder()
            .url(API_URL+"?query="+encodedFood)
            .addHeader(("X-Api-Key"), API_KEY)
            .get().build();

        // execute request within try-catch blocks
        // gets the response for calling the API from the client
        try (Response response = client.newCall(request).execute()){
            // if failed
            if(!response.isSuccessful()){
                return "APISERVICEERROR: " + response.code() + response.message();
            }

            if(response.body() != null){
                return response.body().string();
            } else {
                return "Response not recorded from API based on query";
            }
        }
        
    }

    
}
