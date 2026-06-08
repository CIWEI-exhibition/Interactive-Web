package com.example.aquaurore.dto;

import com.example.aquaurore.domain.Order;
import lombok.Getter;

import java.time.LocalDateTime;

public class OrderDto {

    @Getter
    public static class Response {
        private final Long id;
        private final Long goodsId;
        private final String goodsName;
        private final Integer quantity;
        private final Integer totalPrice;
        private final String buyerName;
        private final String buyerEmail;
        private final String status;
        private final LocalDateTime createdAt;

        public Response(Order order) {
            this.id = order.getId();
            this.goodsId = order.getGoods().getId();
            this.goodsName = order.getGoods().getName();
            this.quantity = order.getQuantity();
            this.totalPrice = order.getGoods().getPrice() * order.getQuantity();
            this.buyerName = order.getBuyerName();
            this.buyerEmail = order.getBuyerEmail();
            this.status = order.getStatus().name();
            this.createdAt = order.getCreatedAt();
        }
    }

    @Getter
    public static class CreateRequest {
        private Long goodsId;
        private Integer quantity;
        private String buyerName;
        private String buyerEmail;
    }
}
