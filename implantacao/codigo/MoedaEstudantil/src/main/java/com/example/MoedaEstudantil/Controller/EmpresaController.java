package com.example.MoedaEstudantil.Controller;

import com.example.MoedaEstudantil.Entities.Empresa;
import com.example.MoedaEstudantil.Entities.Vantagem;
import com.example.MoedaEstudantil.Repository.EmpresaRepository;
import com.example.MoedaEstudantil.Repository.VantagemRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresas")
@CrossOrigin(origins = "*")
public class EmpresaController {

    private final EmpresaRepository empresaRepository;
    private final VantagemRepository vantagemRepository;

    public EmpresaController(EmpresaRepository empresaRepository, VantagemRepository vantagemRepository) {
        this.empresaRepository = empresaRepository;
        this.vantagemRepository = vantagemRepository;
    }

    @GetMapping
    public List<Empresa> listar() {
        return empresaRepository.findAll();
    }

    @PostMapping
    public Empresa criar(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PutMapping("/{id}")
    public Empresa atualizar(@PathVariable Long id, @RequestBody Empresa empresa) {
        Empresa existente = empresaRepository.findById(id).orElseThrow();
        existente.setNome(empresa.getNome());
        existente.setCnpj(empresa.getCnpj());
        return empresaRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        empresaRepository.deleteById(id);
    }

    // Criar uma nova vantagem para a empresa
    @PostMapping("/{empresaId}/vantagens")
    public ResponseEntity<Vantagem> criarVantagem(@PathVariable Long empresaId, @RequestBody Vantagem vantagem) {
        Optional<Empresa> empresa = empresaRepository.findById(empresaId);
        if (empresa.isPresent()) {
            vantagem.setEmpresa(empresa.get());
            Vantagem novaVantagem = vantagemRepository.save(vantagem);
            return ResponseEntity.ok(novaVantagem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Consultar todas as vantagens de uma empresa
    @GetMapping("/{empresaId}/vantagens")
    public ResponseEntity<Optional<Vantagem>> listarVantagens(@PathVariable Long empresaId) {
        Optional<Empresa> empresa = empresaRepository.findById(empresaId);
        if (empresa.isPresent()) {
            Optional<Vantagem> vantagens = vantagemRepository.findById(empresaId);
            return ResponseEntity.ok(vantagens);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar uma vantagem existente
    @PutMapping("/vantagens/{vantagemId}")
    public ResponseEntity<Vantagem> atualizarVantagem(@PathVariable Long vantagemId, @RequestBody Vantagem vantagemDetails) {
        Optional<Vantagem> vantagem = vantagemRepository.findById(vantagemId);
        if (vantagem.isPresent()) {
            Vantagem existente = vantagem.get();
            existente.setDescricao(vantagemDetails.getDescricao());
            // Atualize outros campos conforme necessário
            vantagemRepository.save(existente);
            return ResponseEntity.ok(existente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar uma vantagem
    @DeleteMapping("/vantagens/{vantagemId}")
    public ResponseEntity<Void> deletarVantagem(@PathVariable Long vantagemId) {
        if (vantagemRepository.existsById(vantagemId)) {
            vantagemRepository.deleteById(vantagemId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
