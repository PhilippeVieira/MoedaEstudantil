package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Aluno;
import com.example.MoedaEstudantil.Repository.AlunoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class AlunoController {
    private final AlunoRepository alunoRepository;
    private final Map<Long, Integer> saldos = new HashMap<>();

    public AlunoController(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @GetMapping
    public List<Aluno> listar() {
        return alunoRepository.findAll();
    }

    @PostMapping
    public Aluno criar(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoRepository.save(aluno);
        saldos.put(novoAluno.getId(), 0); // Saldo inicial é 0
        return novoAluno;
    }

    @PutMapping("/{id}")
    public Aluno atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        Aluno existente = alunoRepository.findById(id).orElseThrow();
        existente.setNome(aluno.getNome());
        existente.setCurso(aluno.getCurso());
        existente.setEndereco(aluno.getEndereco());
        return alunoRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        alunoRepository.deleteById(id);
        saldos.remove(id);
    }

    @GetMapping("/{id}/saldo")
    public Map<String, Integer> consultarSaldo(@PathVariable Long id) {
        if (saldos.containsKey(id)) {
            return Map.of("saldo", saldos.get(id));
        } else {
            throw new IllegalArgumentException("Aluno não encontrado");
        }
    }

    @PostMapping("/{id}/enviarMoedas")
    public String enviarMoedas(@PathVariable Long id, @RequestParam Long destinatarioId, @RequestParam int quantidade) {
        if (!saldos.containsKey(id) || !saldos.containsKey(destinatarioId)) {
            throw new IllegalArgumentException("Aluno remetente ou destinatário não encontrado");
        }
        if (saldos.get(id) < quantidade) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a transação");
        }
        saldos.put(id, saldos.get(id) - quantidade);
        saldos.put(destinatarioId, saldos.get(destinatarioId) + quantidade);
        return "Transação realizada com sucesso";
    }
}
