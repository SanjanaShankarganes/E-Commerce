////package com.example.ecombackend.model;
////
////import jakarta.persistence.*;
////
////@Entity
////public class Product {
////
////    @Id
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    private Long id;
////    private String name;
////    private double mrp;
////    private double discount;
////    private int quantity;
////
////    @ManyToOne(fetch = FetchType.EAGER)	
////    @JoinColumn(name = "category_id")
////    private Category category;
////
////    // Getters and Setters
////    public Long getId() {	
////        return id;
////    }
////
////    public void setId(Long id) {
////        this.id = id;
////    }
////
////    public String getName() {
////        return name;
////    }
////
////    public void setName(String name) {
////        this.name = name;
////    }
////
////    public double getMrp() {
////        return mrp;
////    }
////
////    public void setMrp(double mrp) {
////        this.mrp = mrp;
////    }
////
////    public double getDiscount() {
////        return discount;
////    }
////
////    public void setDiscount(double discount) {
////        this.discount = discount;
////    }
////
////    public int getQuantity() {
////        return quantity;
////    }
////
////    public void setQuantity(int quantity) {
////        this.quantity = quantity;
////    }
////
////    public Category getCategory() {
////        return category;
////    }
////
////    public void setCategory(Category category) {
////        this.category = category;
////    }
////}
//
//
//
//
//
//package com.example.ecombackend.model;
//import jakarta.persistence.*;
//@Entity
//@Table(name = "products")
//public class Product {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//    private double mrp;
//    private double discount;
//    private int quantity;
//    private String description;  // New description field
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "category_id")
//    private Category category;
//    // Default constructor
//    public Product() {
//    }
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//    public void setId(Long id) {
//        this.id = id;
//    }
//    public String getName() {
//        return name;
//    }
//    public void setName(String name) {
//        this.name = name;
//    }
//    public double getMrp() {
//        return mrp;
//    }
//    public void setMrp(double mrp) {
//        this.mrp = mrp;
//    }
//    public double getDiscount() {
//        return discount;
//    }
//    public void setDiscount(double discount) {
//        this.discount = discount;
//    }
//    public int getQuantity() {
//        return quantity;
//    }
//    public void setQuantity(int quantity) {
//        this.quantity = quantity;
//    }
//    public String getDescription() {  // Getter for description
//        return description;
//    }
//    public void setDescription(String description) {  // Setter for description
//        this.description = description;
//    }
//    public Category getCategory() {
//        return category;
//    }
//    public void setCategory(Category category) {
//        this.category = category;
//    }
//    // Method to calculate final price
//    public double getFinalPrice() {
//        return mrp - (mrp * discount / 100);
//    }
//    @Override
//    public String toString() {
//        return "Product{" +
//                "id=" + id +
//                ", name='" + name + '\'' +
//                ", mrp=" + mrp +
//                ", discount=" + discount +
//                ", quantity=" + quantity +
//                ", description='" + description + '\'' +  // Include description in toString
//                ", category=" + (category != null ? category.getCategory() : "None") +
//                '}';
//    }
//}


package com.example.ecombackend.model;
import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private double mrp;
    private double discount;
    private int quantity;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
    public Product() {
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
    public double getMrp() {
        return mrp;
    }
    public void setMrp(double mrp) {
        this.mrp = mrp;
    }
    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {  
        return description;
    }
    public void setDescription(String description) {  
        this.description = description;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public double getFinalPrice() {
        return mrp - (mrp * discount / 100);
    }
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mrp=" + mrp +
                ", discount=" + discount +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +  
                ", category=" + (category != null ? category.getCategory() : "None") +
                '}';
    }
}
