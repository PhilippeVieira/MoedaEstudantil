package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.Entity;

@Entity
public class Aluno extends Usuario {
    private String endereco;
    private String curso;

    // Getters e Setters
    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }
}
