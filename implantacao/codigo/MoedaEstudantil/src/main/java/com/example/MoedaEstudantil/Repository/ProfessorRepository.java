package com.example.MoedaEstudantil.Repository;

import com.example.MoedaEstudantil.Entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
