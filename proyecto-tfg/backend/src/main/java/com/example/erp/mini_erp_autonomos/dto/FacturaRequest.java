package com.example.erp.mini_erp_autonomos.dto;

import java.util.List;

public class FacturaRequest {

    private Long clienteId;
    private List<LineaRequest> lineas;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public List<LineaRequest> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaRequest> lineas) {
        this.lineas = lineas;
    }

    public static class LineaRequest {
        private Long productoId;
        private int cantidad;

        public Long getProductoId() {
            return productoId;
        }

        public void setProductoId(Long productoId) {
            this.productoId = productoId;
        }

        public int getCantidad() {
            return cantidad;
        }

        public void setCantidad(int cantidad) {
            this.cantidad = cantidad;
        }
    }
}
