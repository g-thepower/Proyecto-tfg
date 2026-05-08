package com.example.erp.mini_erp_autonomos.service;

import com.example.erp.mini_erp_autonomos.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> listar();
    Producto crear(Producto producto);
    Producto obtenerPorId(Long id);
    void eliminar(Long id);
    Producto actualizar(Long id, Producto producto);
}

