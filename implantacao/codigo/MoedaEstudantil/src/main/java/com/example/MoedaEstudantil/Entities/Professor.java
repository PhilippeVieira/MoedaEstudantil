package com.example.MoedaEstudantil.Entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@Entity
public class Professor extends Usuario {
    // Getters e Setters
    private String departamento;
}
