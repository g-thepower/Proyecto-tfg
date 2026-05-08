package com.example.erp.mini_erp_autonomos.impl;

import com.example.erp.mini_erp_autonomos.dto.InformeResponse;
import com.example.erp.mini_erp_autonomos.model.Factura;
import com.example.erp.mini_erp_autonomos.repository.FacturaRepository;
import com.example.erp.mini_erp_autonomos.service.InformeService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class InformeServiceImpl implements InformeService {

    private final FacturaRepository facturaRepository;

    public InformeServiceImpl(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    @Override
    public List<InformeResponse> totalPorMes() {
        List<Factura> facturas = facturaRepository.findAll();

        Map<String, Double> mapa = new TreeMap<>();

        DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM");

        for (Factura f : facturas) {
            String mes = f.getFecha().format(formato);
            mapa.put(mes, mapa.getOrDefault(mes, 0.0) + f.getTotal());
        }

        List<InformeResponse> lista = new ArrayList<>();
        mapa.forEach((mes, total) -> lista.add(new InformeResponse(mes, total)));

        return lista;
    }

    @Override
    public List<InformeResponse> totalPorCliente() {
        List<Factura> facturas = facturaRepository.findAll();

        Map<String, Double> mapa = new TreeMap<>();

        for (Factura f : facturas) {
            String nombre = f.getCliente().getNombre();
            mapa.put(nombre, mapa.getOrDefault(nombre, 0.0) + f.getTotal());
        }

        List<InformeResponse> lista = new ArrayList<>();
        mapa.forEach((cliente, total) -> lista.add(new InformeResponse(cliente, total)));

        return lista;
    }

    @Override
    public InformeResponse totalEntreFechas(LocalDate inicio, LocalDate fin) {
        List<Factura> facturas = facturaRepository.findAll();

        double total = facturas.stream()
                .filter(f -> !f.getFecha().isBefore(inicio) && !f.getFecha().isAfter(fin))
                .mapToDouble(Factura::getTotal)
                .sum();

        String etiqueta = "Del " + inicio + " al " + fin;

        return new InformeResponse(etiqueta, total);
    }
}
