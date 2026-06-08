package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.dto.MemoDto;
import com.example.aquaurore.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @GetMapping("/api/memos")
    public ApiResponse<List<MemoDto.Response>> findAll() {
        return ApiResponse.ok(memoService.findAll());
    }

    @PostMapping("/api/memos")
    public ApiResponse<MemoDto.Response> create(@RequestBody MemoDto.CreateRequest request) {
        return ApiResponse.ok(memoService.create(request));
    }

    @DeleteMapping("/api/memos/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        memoService.delete(id);
        return ApiResponse.ok(null);
    }
}
