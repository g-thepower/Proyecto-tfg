package com.example.erp.mini_erp_autonomos.impl;

import com.example.erp.mini_erp_autonomos.model.Factura;
import com.example.erp.mini_erp_autonomos.model.LineaFactura;
import com.example.erp.mini_erp_autonomos.repository.FacturaRepository;
import com.example.erp.mini_erp_autonomos.service.PdfService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfServiceImpl implements PdfService {

    private final FacturaRepository facturaRepository;

    public PdfServiceImpl(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    @Override
    public ByteArrayInputStream generarFacturaPdf(Long facturaId) {

        Factura factura = facturaRepository.findById(facturaId)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, out);
        document.open();

        // Título
        Font tituloFont = new Font(Font.HELVETICA, 18, Font.BOLD);
        Paragraph titulo = new Paragraph("Factura #" + factura.getId(), tituloFont);
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Fecha: " + factura.getFecha()));
        document.add(new Paragraph("Cliente: " + factura.getCliente().getNombre()));
        document.add(new Paragraph(" "));

        // Tabla de líneas
        PdfPTable tabla = new PdfPTable(5);
        tabla.addCell("Producto");
        tabla.addCell("Cantidad");
        tabla.addCell("Precio");
        tabla.addCell("IVA");
        tabla.addCell("Total");

        for (LineaFactura linea : factura.getLineas()) {
            tabla.addCell(linea.getProducto().getNombre());
            tabla.addCell(String.valueOf(linea.getCantidad()));
            tabla.addCell(String.valueOf(linea.getPrecioUnitario()));
            tabla.addCell(String.valueOf(linea.getIva()));
            tabla.addCell(String.valueOf(linea.getTotalLinea()));
        }

        document.add(tabla);

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Base imponible: " + factura.getBaseImponible()));
        document.add(new Paragraph("IVA total: " + factura.getIvaTotal()));
        document.add(new Paragraph("Total factura: " + factura.getTotal()));

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
