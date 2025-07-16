package com.aibers.dashboard.model;

import jakarta.persistence.*;

@Entity
public class Request {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maker;
    private String description;
    private String status; // Pending, Approved, Rejected

    public Long getId() { return id; }
    public String getMaker() { return maker; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public void setId(Long id) { this.id = id; }
    public void setMaker(String maker) { this.maker = maker; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(String status) { this.status = status; }
}
