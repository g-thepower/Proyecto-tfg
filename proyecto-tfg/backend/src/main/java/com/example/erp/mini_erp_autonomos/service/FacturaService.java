package com.example.erp.mini_erp_autonomos.service;

import com.example.erp.mini_erp_autonomos.dto.FacturaRequest;
import com.example.erp.mini_erp_autonomos.model.Factura;

import java.util.List;

public interface FacturaService {

    Factura crearFactura(FacturaRequest request);

    List<Factura> listar();

    Factura obtenerPorId(Long id);

    void eliminar(Long id);
}

