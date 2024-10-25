//package com.example.ecombackend.controller;
//
//import com.example.ecombackend.service.ElasticProductService;
//import com.example.ecombackend.model.ProductIndex;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import java.util.List;
//@RestController
//public class ProductSearchController {
//
//    @Autowired
//    private ElasticProductService productSearchService;
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/auth/search")
//    public List<ProductIndex> searchProducts(@RequestParam String query) {
//        return productSearchService.searchProducts(query);
//    }
//}


package com.example.ecombackend.controller;

import com.example.ecombackend.service.ElasticProductService;
import com.example.ecombackend.model.ProductIndex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductSearchController {

    @Autowired
    private ElasticProductService productSearchService;

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/auth/search")
//    public List<ProductIndex> searchProducts(
//        @RequestParam(value = "search", defaultValue = "") String query,
//        @RequestParam(value = "minPrice", defaultValue = "0") double minPrice,
//        @RequestParam(value = "maxPrice", defaultValue = "1000000") double maxPrice,
//        @RequestParam(defaultValue = "0") int page,
//        @RequestParam(defaultValue = "10") int size
//    ) {
//        return productSearchService.searchProducts(query, minPrice, maxPrice, page, size);
//    }
    
    
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/auth/all")
    public List<ProductIndex> getProducts(
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
        ) {
            return productSearchService.getAllProductsFromElastic();
        }
    
    @GetMapping("/search")
    public List<ProductIndex> searchAllProducts(@RequestParam String searchTerm) {
        return productSearchService.searchAllFields(searchTerm);
    }
}

