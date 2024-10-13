package com.example.MoedaEstudantil.Repository;

import com.example.MoedaEstudantil.Entities.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}