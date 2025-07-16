package com.aibers.dashboard.repository;

import com.aibers.dashboard.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {}
