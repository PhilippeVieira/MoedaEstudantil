package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@Entity
public class Vantagem {
    // Getters e Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private int valor;

    @ManyToOne
    private Empresa empresa;

}
