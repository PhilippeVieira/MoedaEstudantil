package com.example.MoedaEstudantil.Entities;

import jakarta.persistence.Entity;

@Entity
public class Professor extends Usuario {
    private String departamento;

    // Getters e Setters
    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
}
