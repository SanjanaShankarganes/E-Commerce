package com.example.ecombackend.service;

import com.example.ecombackend.DAO.ProductRepository;

import com.example.ecombackend.model.Product;
import com.example.ecombackend.model.ProductIndex;
import com.example.ecombackend.repository.elastic.ElasticProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ElasticProductService {
	
	  @Autowired
	    private ElasticProductRepository productRepository;

	    @Autowired
	    private ProductRepository mysqlProductRepository;

	    @Transactional
	    public void syncProductsToElasticSearch() {
	        List<Product> products = mysqlProductRepository.findAll();

	        for (Product product : products) {
	            ProductIndex productIndex = new ProductIndex();
	            productIndex.setId(String.valueOf(product.getId())); 
	            productIndex.setName(product.getName());
	            productIndex.setMrp(product.getMrp()); 
	            productIndex.setDiscount(product.getDiscount()); 
	            productIndex.setQuantity(product.getQuantity());
	            productIndex.setDescription(product.getDescription());
	            productIndex.setCategory(product.getCategory().getCategory());
	            productRepository.save(productIndex);
	        }
	    }

	    @PostConstruct
	    public void init() {
	        syncProductsToElasticSearch();
	    }

	    public List<ProductIndex> searchAllFields(String searchTerm) {
	        Double priceLimit = null;
	        boolean isUnder = false;
	        boolean isAbove = false;
	        if (searchTerm.toLowerCase().contains("under")) {
	            String[] parts = searchTerm.split("under");
	            searchTerm = parts[0].trim();
	            try {
	                priceLimit = Double.valueOf(parts[1].trim());
	                isUnder = true;
	            } catch (NumberFormatException e) {
	                priceLimit = null;
	            }
	        } else if (searchTerm.toLowerCase().contains("above")) {
	            String[] parts = searchTerm.split("above");
	            searchTerm = parts[0].trim();
	            try {
	                priceLimit = Double.valueOf(parts[1].trim());
	                isAbove = true;
	            } catch (NumberFormatException e) {
	                priceLimit = null;
	            }
	        }
	        String hyphenVariant = searchTerm.contains("-") ? searchTerm.replace("-", " ") : searchTerm;

	        List<ProductIndex> combinedResults = productRepository.searchByNameOrDescriptionOrCategory(searchTerm, hyphenVariant);

	        List<ProductIndex> finalResults = applyPriceFilters(combinedResults, priceLimit, isUnder, isAbove);

	        return finalResults;
	    }

	    private List<ProductIndex> applyPriceFilters(List<ProductIndex> products, Double priceLimit, boolean isUnder, boolean isAbove) {
	        if (priceLimit != null) {
	            List<ProductIndex> filteredProducts;
	            if (isUnder) {
	                filteredProducts = products.stream()
	                        .filter(product -> product.getMrp().compareTo(priceLimit) < 0)
	                        .collect(Collectors.toList());
	            } else if (isAbove) {
	                filteredProducts = products.stream()
	                        .filter(product -> product.getMrp().compareTo(priceLimit) > 0)
	                        .collect(Collectors.toList());
	            } else {
	                filteredProducts = products;
	            }
	            filteredProducts.sort(Comparator.comparing(product -> Math.abs(product.getMrp() - priceLimit)));
	            return filteredProducts;
	        }
	        return products;
	    }

	    public List<ProductIndex> getAllProductsFromElastic() {
	        return (List<ProductIndex>) productRepository.findAll();
	    }
	}


