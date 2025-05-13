package com.example.aquaurore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String redirectToIndex() {
        return "redirect:/index.html";
    }
}