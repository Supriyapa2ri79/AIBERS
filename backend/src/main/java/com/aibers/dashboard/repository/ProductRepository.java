package com.aibers.dashboard.repository;

import com.aibers.dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
