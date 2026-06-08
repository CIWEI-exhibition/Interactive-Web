package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.dto.OrderDto;
import com.example.aquaurore.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/api/orders")
    public ApiResponse<OrderDto.Response> create(@RequestBody OrderDto.CreateRequest request) {
        return ApiResponse.ok(orderService.create(request));
    }

    @GetMapping("/api/admin/orders")
    public ApiResponse<List<OrderDto.Response>> findAll() {
        return ApiResponse.ok(orderService.findAll());
    }
}
