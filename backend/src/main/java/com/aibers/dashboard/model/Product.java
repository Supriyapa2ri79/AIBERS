package com.aibers.dashboard.model;

import jakarta.persistence.*;

@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maker; // username of the Maker
    private String product_name;
    private String product_code;
    private Double roi;

    public Long getId() { return id; }
    public String getMaker() { return maker; }
    public String getProduct_name() { return product_name; }
    public String getProduct_code() { return product_code; }
    public Double getRoi() { return roi; }
    public void setId(Long id) { this.id = id; }
    public void setMaker(String maker) { this.maker = maker; }
    public void setProduct_name(String product_name) { this.product_name = product_name; }
    public void setProduct_code(String product_code) { this.product_code = product_code; }
    public void setRoi(Double roi) { this.roi = roi; }
}
