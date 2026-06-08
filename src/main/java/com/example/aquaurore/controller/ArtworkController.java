package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.dto.ArtworkDto;
import com.example.aquaurore.service.ArtworkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ArtworkController {

    private final ArtworkService artworkService;

    @GetMapping("/api/artworks")
    public ApiResponse<List<ArtworkDto.Response>> findAll(
            @RequestParam(required = false) Long artistId) {
        if (artistId != null) {
            return ApiResponse.ok(artworkService.findByArtist(artistId));
        }
        return ApiResponse.ok(artworkService.findAll());
    }

    @GetMapping("/api/artworks/{id}")
    public ApiResponse<ArtworkDto.Response> findById(@PathVariable Long id) {
        return ApiResponse.ok(artworkService.findById(id));
    }

    @PostMapping("/api/admin/artworks")
    public ApiResponse<ArtworkDto.Response> create(@RequestBody ArtworkDto.CreateRequest request) {
        return ApiResponse.ok(artworkService.create(request));
    }
}
