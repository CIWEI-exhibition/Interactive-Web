package Goods_Page.ecommerce.src.main.java.Goods_Page.ecommerce.jpa.domain;

import java.lang.annotation.Inherited;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Getter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long price;

    private String description;

    private String imageUrl;

    @CreationTimestamp
    private LocalDateTime createTimestamp;
    
    @UpdateTimestamp
    private LocalDateTime updateTimestamp;

    @Builder
    public Product(String name, Long price, String description, String imageUrl){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
