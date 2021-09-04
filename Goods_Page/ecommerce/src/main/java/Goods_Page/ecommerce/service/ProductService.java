package Goods_Page.ecommerce.src.main.java.Goods_Page.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import happygram.ecommerce.jpa.domain.Product;
import happygram.ecommerce.jpa.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    //메뉴 아이디로 상품 목록 조회
    //@param categoryId
    //@return

    public List<Product> getProductList(Long categoryId){
        return productRepository.findAllByCategoryId(categoryId);
    }

    //상품 상세 조회
    //@param categoryId
    //@return

    public ProductDto getProduct(Long categoryId){
        ProductDto productDto = modelMapper.map(productRepository.findById(categoryId).get(), ProductDto.class);
        productDto.setDiscountPrice(productDto.getPrice() * (100 - productDto.getDiscount())/100);
        return productDto;
    }
    
}
