package com.example.aquaurore.dto;

import com.example.aquaurore.domain.Goods;
import lombok.Getter;

public class GoodsDto {

    @Getter
    public static class Response {
        private final Long id;
        private final String name;
        private final String description;
        private final Integer price;
        private final Integer stock;
        private final String imageUrl;

        public Response(Goods goods) {
            this.id = goods.getId();
            this.name = goods.getName();
            this.description = goods.getDescription();
            this.price = goods.getPrice();
            this.stock = goods.getStock();
            this.imageUrl = goods.getImageUrl();
        }
    }

    @Getter
    public static class CreateRequest {
        private String name;
        private String description;
        private Integer price;
        private Integer stock;
        private String imageUrl;
    }
}
