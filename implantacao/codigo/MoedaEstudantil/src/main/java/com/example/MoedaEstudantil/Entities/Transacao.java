package com.example.MoedaEstudantil.Entities;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter@Setter
@Entity
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime data;
    private String mensagem;
    private int qtdMoedas;

    @ManyToOne
    private Aluno aluno;

    @ManyToOne
    private Professor professor;

}
