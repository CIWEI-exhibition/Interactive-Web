package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.dto.ArtistDto;
import com.example.aquaurore.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArtistController {

    private final ArtistService artistService;

    @GetMapping("/api/artists")
    public ApiResponse<List<ArtistDto.Response>> findAll() {
        return ApiResponse.ok(artistService.findAll());
    }

    @GetMapping("/api/artists/{id}")
    public ApiResponse<ArtistDto.Response> findById(@PathVariable Long id) {
        return ApiResponse.ok(artistService.findById(id));
    }

    @PostMapping("/api/admin/artists")
    public ApiResponse<ArtistDto.Response> create(@RequestBody ArtistDto.CreateRequest request) {
        return ApiResponse.ok(artistService.create(request));
    }
}
