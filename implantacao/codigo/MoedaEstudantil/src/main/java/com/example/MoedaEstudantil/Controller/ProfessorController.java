package com.example.MoedaEstudantil.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    private Map<Integer, Professor> professores = new HashMap<>();
    private Map<Integer, Integer> saldos = new HashMap<>();
    private int nextId = 1;

    @PostMapping
    public Professor criarProfessor(@RequestBody Professor novoProfessor) {
        int id = nextId++;
        novoProfessor.setId(id);
        professores.put(id, novoProfessor);
        saldos.put(id, 0); // Saldo inicial é 0
        return novoProfessor;
    }

    @GetMapping("/{id}")
    public Professor obterProfessor(@PathVariable int id) {
        return professores.get(id);
    }

    @GetMapping("/{id}/saldo")
    public Map<String, Integer> verificarSaldo(@PathVariable int id) {
        if (saldos.containsKey(id)) {
            return Collections.singletonMap("saldo", saldos.get(id));
        } else {
            throw new NoSuchElementException("Professor não encontrado");
        }
    }

    @PostMapping("/{id}/enviarMoedas")
    public String enviarMoedas(@PathVariable int id, @RequestParam int destinatarioId, @RequestParam int quantidade) {
        if (!professores.containsKey(id) || !professores.containsKey(destinatarioId)) {
            throw new NoSuchElementException("Professor remetente ou destinatário não encontrado");
        }
        if (saldos.get(id) < quantidade) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transação");
        }
        saldos.put(id, saldos.get(id) - quantidade);
        saldos.put(destinatarioId, saldos.get(destinatarioId) + quantidade);
        return "Transação realizada com sucesso";
    }
}

class Professor {
    private int id;
    private String nome;
    private String instituicao;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }
}
