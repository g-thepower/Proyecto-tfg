package com.example.erp.mini_erp_autonomos.dto;

public class InformeResponse {

    private String etiqueta;
    private double total;

    public InformeResponse(String etiqueta, double total) {
        this.etiqueta = etiqueta;
        this.total = total;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

