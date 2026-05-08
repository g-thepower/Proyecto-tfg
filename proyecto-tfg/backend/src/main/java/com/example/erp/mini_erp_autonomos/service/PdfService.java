package com.example.erp.mini_erp_autonomos.service;

import java.io.ByteArrayInputStream;

public interface PdfService {
    ByteArrayInputStream generarFacturaPdf(Long facturaId);
}
