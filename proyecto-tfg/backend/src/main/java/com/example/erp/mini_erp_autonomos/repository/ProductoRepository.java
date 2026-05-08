package com.example.erp.mini_erp_autonomos.repository;

import com.example.erp.mini_erp_autonomos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

