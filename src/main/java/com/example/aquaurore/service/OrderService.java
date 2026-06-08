package com.example.aquaurore.service;

import com.example.aquaurore.domain.Goods;
import com.example.aquaurore.domain.Order;
import com.example.aquaurore.dto.OrderDto;
import com.example.aquaurore.repository.GoodsRepository;
import com.example.aquaurore.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final GoodsRepository goodsRepository;

    public List<OrderDto.Response> findAll() {
        return orderRepository.findAll().stream()
                .map(OrderDto.Response::new)
                .toList();
    }

    @Transactional
    public OrderDto.Response create(OrderDto.CreateRequest request) {
        Goods goods = goodsRepository.findById(request.getGoodsId())
                .orElseThrow(() -> new IllegalArgumentException("Goods not found: " + request.getGoodsId()));
        Order order = Order.builder()
                .goods(goods)
                .quantity(request.getQuantity())
                .buyerName(request.getBuyerName())
                .buyerEmail(request.getBuyerEmail())
                .build();
        return new OrderDto.Response(orderRepository.save(order));
    }
}
