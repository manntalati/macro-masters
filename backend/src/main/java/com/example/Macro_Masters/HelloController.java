package com.example.Macro_Masters;


import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
// broadly map http requests to api
@RequestMapping("/api")
public class HelloController {
    // setting up private variable for API service, then using class to initalize it
    private final APIService service;

    public HelloController(APIService service){
        this.service = service;
    }
    
    // further map request to nutrition and obtain parameter
    @GetMapping("/nutrition")
    public String getNutrition(@RequestParam String food){
        try {
            // call function in APIService
            return service.getNutritionInfo(food);
        } catch (IOException e){
            return "CONTROLLERERROR: " + e.getMessage();
        }
    }    
}
