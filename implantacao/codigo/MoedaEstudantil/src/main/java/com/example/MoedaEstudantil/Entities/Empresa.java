package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
@Entity
public class Empresa {
    // Getters e Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cnpj;

    @OneToMany(mappedBy = "empresa")
    private List<Vantagem> vantagens;

}
