package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String rg;
    private String email;
    private int saldoMoedas;
    private String instituicao;

    @OneToMany(mappedBy = "aluno")
    private List<Transacao> transacoes;

}
