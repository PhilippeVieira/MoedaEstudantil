package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Transacao;
import com.example.MoedaEstudantil.Repository.TransacaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/envio")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class EnvioController {
    private final TransacaoRepository transacaoRepository;

    public EnvioController(TransacaoRepository transacaoRepository) { this.transacaoRepository = transacaoRepository;}
    @PostMapping
    public Transacao criar(@RequestBody Transacao transacao) { return transacaoRepository.save(transacao); }

}
