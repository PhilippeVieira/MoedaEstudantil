package com.example.MoedaEstudantil.Controller;



import com.example.MoedaEstudantil.Entities.Aluno;
import com.example.MoedaEstudantil.Repository.AlunoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoRepository alunoRepository;

    public AlunoController(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @GetMapping
    public List<Aluno> listar() {
        return alunoRepository.findAll();
    }

    @PostMapping
    public Aluno criar(@RequestBody Aluno aluno) {
        return alunoRepository.save(aluno);
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
    }
}
