package com.example.aquaurore.service;

import com.example.aquaurore.domain.Goods;
import com.example.aquaurore.dto.GoodsDto;
import com.example.aquaurore.repository.GoodsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GoodsService {

    private final GoodsRepository goodsRepository;

    public List<GoodsDto.Response> findAll() {
        return goodsRepository.findAll().stream()
                .map(GoodsDto.Response::new)
                .toList();
    }

    public GoodsDto.Response findById(Long id) {
        Goods goods = goodsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Goods not found: " + id));
        return new GoodsDto.Response(goods);
    }

    @Transactional
    public GoodsDto.Response create(GoodsDto.CreateRequest request) {
        Goods goods = Goods.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .build();
        return new GoodsDto.Response(goodsRepository.save(goods));
    }

    @Transactional
    public GoodsDto.Response update(Long id, GoodsDto.UpdateRequest request) {
        Goods goods = goodsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Goods not found: " + id));
        goods.update(request.getName(), request.getDescription(),
                request.getPrice(), request.getStock(), request.getImageUrl());
        return new GoodsDto.Response(goods);
    }

    @Transactional
    public void delete(Long id) {
        goodsRepository.deleteById(id);
    }
}
