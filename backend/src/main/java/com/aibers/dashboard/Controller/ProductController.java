package com.aibers.dashboard.controller;

import com.aibers.dashboard.model.Product;
import com.aibers.dashboard.repository.ProductRepository;
import com.aibers.dashboard.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired private ProductRepository productRepo;
    @Autowired private JwtUtil jwtUtil;

    // Extract JWT from Authorization header
    private String getJwt(HttpServletRequest req) {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    @GetMapping
    public List<Product> getAll(HttpServletRequest req) {
        String jwt = getJwt(req);
        jwtUtil.extractUsername(jwt); // Validate token
        return productRepo.findAll();
    }

    @PostMapping
    public Product create(HttpServletRequest req, @RequestBody Map<String, String> body) {
        String jwt = getJwt(req);
        String role = jwtUtil.extractRole(jwt);
        String username = jwtUtil.extractUsername(jwt);
        if (!"Maker".equals(role)) throw new RuntimeException("Only Makers can create products");
        Product p = new Product();
        p.setMaker(username);
        p.setProduct_name(body.get("product_name"));
        p.setProduct_code(body.get("product_code"));
        p.setRoi(Double.valueOf(body.get("roi")));
        return productRepo.save(p);
    }
}
