package Goods_Page.ecommerce.src.main.java.Goods_Page.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import happygram.ecommerce.jpa.domain.Product;
import happygram.ecommerce.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private Goods_Page.ecommerce.src.main.java.Goods_Page.ecommerce.service.ProductService productService;

    //상품 상세 조회
    @RequestMapping(value = "/view/detail")
    public String viewProductDetail(Model model){
        model.addAttribute("template", "fragments/content/product/detail");
        return "index";
    }

    //상품 목록 조회
    //@param id
    //@param model
    //@return

    @RequestMapping(value = "/view/list/{id}")
    public String viewProductList(@PathVariable Long id, Model model){

        //data
        List<Product> productList = productService.getProductList(id);
        model.addAttribute("productList", productList);

        //view
        model.addAttribute("template", "fragments/content/product/list");
        return "index";
    }
}
