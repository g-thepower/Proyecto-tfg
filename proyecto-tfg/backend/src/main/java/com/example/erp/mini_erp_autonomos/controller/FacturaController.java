package com.example.erp.mini_erp_autonomos.controller;

import com.example.erp.mini_erp_autonomos.dto.FacturaRequest;
import com.example.erp.mini_erp_autonomos.model.Factura;
import com.example.erp.mini_erp_autonomos.service.FacturaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*")
public class FacturaController {

    private final FacturaService facturaService;

    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @PostMapping
    public Factura crear(@RequestBody FacturaRequest request) {
        return facturaService.crearFactura(request);
    }

    @GetMapping
    public List<Factura> listar() {
        return facturaService.listar();
    }

    @GetMapping("/{id}")
    public Factura obtener(@PathVariable Long id) {
        return facturaService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        facturaService.eliminar(id);
    }
}

