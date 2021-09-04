package Goods_Page.ecommerce.src.main.java.Goods_Page.ecommerce.dto;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Setter
@Getter
public class ProductDto {
    
    private String name;

    private Long price;

    private String description;

    private String imageUrl;

    private LocalDateTime createTimestamp;

    private LocalDateTime updateTimestamp;

    // private Long discountPrice;
}
