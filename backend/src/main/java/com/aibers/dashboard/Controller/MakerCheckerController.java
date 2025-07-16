package com.aibers.dashboard.controller;

import com.aibers.dashboard.model.Request;
import com.aibers.dashboard.repository.RequestRepository;
import com.aibers.dashboard.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
public class MakerCheckerController {
    @Autowired private RequestRepository requestRepo;
    @Autowired private JwtUtil jwtUtil;

    private String getJwt(HttpServletRequest req) {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }

    @GetMapping
    public List<Request> getAll(HttpServletRequest req) {
        String jwt = getJwt(req);
        jwtUtil.extractUsername(jwt); // Validate token
        return requestRepo.findAll();
    }

    @PostMapping
    public Request create(HttpServletRequest req, @RequestBody Map<String, String> body) {
        String jwt = getJwt(req);
        String role = jwtUtil.extractRole(jwt);
        String username = jwtUtil.extractUsername(jwt);
        if (!"Maker".equals(role)) throw new RuntimeException("Only Makers can create requests");
        Request r = new Request();
        r.setMaker(username);
        r.setDescription(body.get("description"));
        r.setStatus("Pending");
        return requestRepo.save(r);
    }

    @PutMapping("/{id}")
    public Request updateStatus(HttpServletRequest req, @PathVariable Long id, @RequestBody Map<String, String> body) {
        String jwt = getJwt(req);
        String role = jwtUtil.extractRole(jwt);
        if (!"Checker".equals(role)) throw new RuntimeException("Only Checkers can approve/reject");
        Request reqObj = requestRepo.findById(id).orElseThrow();
        reqObj.setStatus(body.get("status"));
        return requestRepo.save(reqObj);
    }
}
