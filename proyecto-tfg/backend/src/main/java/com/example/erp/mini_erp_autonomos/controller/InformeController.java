package com.example.erp.mini_erp_autonomos.controller;

import com.example.erp.mini_erp_autonomos.dto.InformeResponse;
import com.example.erp.mini_erp_autonomos.service.InformeService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/informes")
@CrossOrigin(origins = "*")
public class InformeController {

    private final InformeService informeService;

    public InformeController(InformeService informeService) {
        this.informeService = informeService;
    }

    @GetMapping("/por-mes")
    public List<InformeResponse> totalPorMes() {
        return informeService.totalPorMes();
    }

    @GetMapping("/por-cliente")
    public List<InformeResponse> totalPorCliente() {
        return informeService.totalPorCliente();
    }

    @GetMapping("/entre-fechas")
    public InformeResponse totalEntreFechas(
            @RequestParam String inicio,
            @RequestParam String fin) {

        LocalDate fechaInicio = LocalDate.parse(inicio);
        LocalDate fechaFin = LocalDate.parse(fin);

        return informeService.totalEntreFechas(fechaInicio, fechaFin);
    }
}
