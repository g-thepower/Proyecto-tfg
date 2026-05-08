package com.example.erp.mini_erp_autonomos.repository;

import com.example.erp.mini_erp_autonomos.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface    ClienteRepository extends JpaRepository<Cliente, Long> {
}

