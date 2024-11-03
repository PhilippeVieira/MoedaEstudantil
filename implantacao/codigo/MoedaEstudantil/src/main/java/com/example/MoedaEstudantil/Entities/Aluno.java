package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@Entity
public class Aluno extends Usuario {
    // Getters e Setters
    private String endereco;
    private String curso;

}
