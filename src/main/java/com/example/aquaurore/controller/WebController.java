package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WebController {

    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.ok("AQUAURORE API is running");
    }
}
