package com.example.erp.mini_erp_autonomos.impl;

import com.example.erp.mini_erp_autonomos.dto.FacturaRequest;
import com.example.erp.mini_erp_autonomos.model.*;
import com.example.erp.mini_erp_autonomos.repository.*;
import com.example.erp.mini_erp_autonomos.service.FacturaService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository facturaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    public FacturaServiceImpl(FacturaRepository facturaRepository,
                              ClienteRepository clienteRepository,
                              ProductoRepository productoRepository) {
        this.facturaRepository = facturaRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    public Factura crearFactura(FacturaRequest request) {

        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Factura factura = new Factura();
        factura.setCliente(cliente);

        List<LineaFactura> lineas = new ArrayList<>();

        double baseImponible = 0;
        double ivaTotal = 0;

        for (FacturaRequest.LineaRequest lineaReq : request.getLineas()) {

            Producto producto = productoRepository.findById(lineaReq.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            LineaFactura linea = new LineaFactura();
            linea.setFactura(factura);
            linea.setProducto(producto);
            linea.setCantidad(lineaReq.getCantidad());
            linea.setPrecioUnitario(producto.getPrecio());
            linea.setIva(producto.getIva());

            double subtotal = producto.getPrecio() * lineaReq.getCantidad();
            double ivaLinea = subtotal * (producto.getIva() / 100);
            double totalLinea = subtotal + ivaLinea;

            linea.setSubtotal(subtotal);
            linea.setIvaLinea(ivaLinea);
            linea.setTotalLinea(totalLinea);

            baseImponible += subtotal;
            ivaTotal += ivaLinea;

            lineas.add(linea);
        }

        factura.setLineas(lineas);
        factura.setBaseImponible(baseImponible);
        factura.setIvaTotal(ivaTotal);
        factura.setTotal(baseImponible + ivaTotal);

        return facturaRepository.save(factura);
    }

    @Override
    public List<Factura> listar() {
        return facturaRepository.findAll();
    }

    @Override
    public Factura obtenerPorId(Long id) {
        return facturaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        facturaRepository.deleteById(id);
    }
}
