//package com.example.ecombackend.model;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;
//
//@Document(indexName = "products") // Specify the index name
//public class ProductIndex {
//
//    @Id
//    private String id;
//    private String name;
//    private double mrp;
//    private double discount;
//    private String category; // Change to String for Elasticsearch
//
//    // Getters and Setters
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public double getMrp() {
//        return mrp;
//    }
//
//    public void setMrp(double mrp) {
//        this.mrp = mrp;
//    }
//
//    public double getDiscount() {
//        return discount;
//    }
//
//    public void setDiscount(double discount) {
//        this.discount = discount;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//}

//package com.example.ecombackend.model;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//@Document(indexName = "products") // This specifies the index name in ElasticSearch
//public class ProductIndex {
//    @Id
//    private String id;
//    @Field(type = FieldType.Text)
//    private String name;
//    @Field(type = FieldType.Double)
//    private Double mrp;
//    @Field(type = FieldType.Double)
//    private Double discount;
//    @Field(type = FieldType.Integer)
//    private Integer quantity;
//    @Field(type = FieldType.Text)
//    private String category;
//    @Field(type = FieldType.Text) // New description field
//    private String description;
//    // No-args constructor
//    public ProductIndex() {
//    }
//    // All-args constructor
//    public ProductIndex(String  id, String name, Double mrp, Double discount, Integer quantity, String category, String description) {
//        this.id = id;
//        this.name = name;
//        this.mrp = mrp;
//        this.discount = discount;
//        this.quantity = quantity;
//        this.category = category;
//        this.description = description; // Initialize description
//    }
//    // Getters and Setters
//    public String getId() {
//        return id;
//    }
//    public void setId(String id) {
//        this.id = id;
//    }
//    public String getName() {
//        return name;
//    }
//    public void setName(String name) {
//        this.name = name;
//    }
//    public Double getMrp() {
//        return mrp;
//    }
//    public void setMrp(Double mrp) {
//        this.mrp = mrp;
//    }
//    public Double getDiscount() {
//        return discount;
//    }
//    public void setDiscount(Double discount) {
//        this.discount = discount;
//    }
//    public Integer getQuantity() {
//        return quantity;
//    }
//    public void setQuantity(Integer quantity) {
//        this.quantity = quantity;
//    }
//    public String getCategory() {
//        return category;
//    }
//    public void setCategory(String category) {
//        this.category = category;
//    }
//    public String getDescription() { // Getter for description
//        return description;
//    }
//    public void setDescription(String description) { // Setter for description
//        this.description = description;
//    }
//    @Override
//    public String toString() {
//        return "ProductIndex{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", mrp=" + mrp +
//                ", discount=" + discount +
//                ", quantity=" + quantity +
//                ", category='" + category + '\'' +
//                ", description='" + description + '\'' + // Include description in toString
//                '}';
//    }
//}

package com.example.ecombackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "products")
public class ProductIndex {

    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Double)
    private Double mrp;
    
    @Field(type = FieldType.Integer)
    private Integer quantity;

    @Field(type = FieldType.Double)
    private Double discount;

    public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	@Field(type = FieldType.Text)
    private String category;
    
    @Field(type = FieldType.Text) 
    private String description;

    
    public ProductIndex() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMrp() {
        return mrp;
    }

    public void setMrp(Double mrp) {
        this.mrp = mrp;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {  
        return description;
    }

    public void setDescription(String description) {  
        this.description = description;
    }

    public double getFinalPrice() {
        return mrp - (mrp * discount / 100);
    }

    @Override
    public String toString() {
        return "ProductIndex{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", mrp=" + mrp +
                ", discount=" + discount +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}

