package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.dto.GoodsDto;
import com.example.aquaurore.service.GoodsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GoodsController {

    private final GoodsService goodsService;

    @GetMapping("/api/goods")
    public ApiResponse<List<GoodsDto.Response>> findAll() {
        return ApiResponse.ok(goodsService.findAll());
    }

    @GetMapping("/api/goods/{id}")
    public ApiResponse<GoodsDto.Response> findById(@PathVariable Long id) {
        return ApiResponse.ok(goodsService.findById(id));
    }

    @PostMapping("/api/admin/goods")
    public ApiResponse<GoodsDto.Response> create(@RequestBody GoodsDto.CreateRequest request) {
        return ApiResponse.ok(goodsService.create(request));
    }
}
