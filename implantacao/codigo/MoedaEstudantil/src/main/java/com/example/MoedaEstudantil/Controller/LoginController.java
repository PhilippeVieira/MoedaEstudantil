package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Aluno;
import com.example.MoedaEstudantil.Entities.Login;
import com.example.MoedaEstudantil.Entities.Professor;
import com.example.MoedaEstudantil.Repository.AlunoRepository;
import com.example.MoedaEstudantil.Repository.ProfessorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// TODO
@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;

    public LoginController(AlunoRepository alunoRepository, ProfessorRepository professorRepository) {
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
    }
    @GetMapping
    public boolean validar(@RequestBody Login login) {
        boolean validado = false;
        List<Aluno> alunos = alunoRepository.findAll();
        List<Professor> professores = professorRepository.findAll();
        return validado;
    }

}
