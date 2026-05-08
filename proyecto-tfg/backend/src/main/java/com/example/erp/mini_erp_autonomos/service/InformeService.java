package com.example.erp.mini_erp_autonomos.service;

import com.example.erp.mini_erp_autonomos.dto.InformeResponse;

import java.time.LocalDate;
import java.util.List;

public interface InformeService {

    List<InformeResponse> totalPorMes();

    List<InformeResponse> totalPorCliente();

    InformeResponse totalEntreFechas(LocalDate inicio, LocalDate fin);
}
