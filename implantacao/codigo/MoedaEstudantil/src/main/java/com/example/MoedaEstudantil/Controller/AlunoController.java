package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Aluno;
import com.example.MoedaEstudantil.Entities.Vantagem;
import com.example.MoedaEstudantil.Repository.AlunoRepository;
import com.example.MoedaEstudantil.Repository.VantagemRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem
public class AlunoController {

    private final AlunoRepository alunoRepository;
    private final VantagemRepository vantagemRepository;
    private final Map<Long, Integer> saldos = new HashMap<>();

    public AlunoController(AlunoRepository alunoRepository, VantagemRepository vantagemRepository) {
        this.alunoRepository = alunoRepository;
        this.vantagemRepository = vantagemRepository;
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

    // Cadastrar uma nova vantagem para o aluno
    @PostMapping("/{alunoId}/vantagens")
    public ResponseEntity<Vantagem> cadastrarVantagem(@PathVariable Long alunoId, @RequestBody Vantagem vantagem) {
        Optional<Aluno> aluno = alunoRepository.findById(alunoId);
        if (aluno.isPresent()) {
            vantagem.setAluno(aluno.get());
            Vantagem novaVantagem = vantagemRepository.save(vantagem);
            return ResponseEntity.ok(novaVantagem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Listar todas as vantagens de um aluno
    @GetMapping("/{alunoId}/vantagens")
    public ResponseEntity<Optional<Vantagem>> listarVantagens(@PathVariable Long alunoId) {
        Optional<Aluno> aluno = alunoRepository.findById(alunoId);
        if (aluno.isPresent()) {
            Optional<Vantagem> vantagens = vantagemRepository.findById(alunoId);
            return ResponseEntity.ok(vantagens);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Trocar uma vantagem existente do aluno
    @PutMapping("/{alunoId}/vantagens/{vantagemId}")
    public ResponseEntity<Vantagem> trocarVantagem(@PathVariable Long alunoId, @PathVariable Long vantagemId, @RequestBody Vantagem novaVantagem) {
        Optional<Aluno> aluno = alunoRepository.findById(alunoId);
        Optional<Vantagem> vantagemExistente = vantagemRepository.findById(vantagemId);

        if (aluno.isPresent() && vantagemExistente.isPresent() && vantagemExistente.get().getAluno().getId().equals(alunoId)) {
            Vantagem vantagem = vantagemExistente.get();
            vantagem.setDescricao(novaVantagem.getDescricao());
            vantagem.setValor(novaVantagem.getValor());
            Vantagem vantagemAtualizada = vantagemRepository.save(vantagem);
            return ResponseEntity.ok(vantagemAtualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}