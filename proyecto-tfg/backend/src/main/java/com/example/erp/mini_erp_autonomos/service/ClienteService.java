package com.example.erp.mini_erp_autonomos.service;

import com.example.erp.mini_erp_autonomos.model.Cliente;
import java.util.List;

public interface ClienteService {
    List<Cliente> listar();
    Cliente crear(Cliente cliente);
    Cliente obtenerPorId(Long id);
    void eliminar(Long id);
    Cliente actualizar(Long id, Cliente cliente);
}

