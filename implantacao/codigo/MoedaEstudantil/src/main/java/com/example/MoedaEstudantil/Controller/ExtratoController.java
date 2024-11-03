package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Transacao;
import com.example.MoedaEstudantil.Repository.TransacaoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/extrato")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class ExtratoController {
    private final TransacaoRepository transacaoRepository;

    public ExtratoController(TransacaoRepository transacaoRepository) { this.transacaoRepository = transacaoRepository;}

    @GetMapping
    public List<Transacao> listar() {
        return transacaoRepository.findAll();
    }

}
