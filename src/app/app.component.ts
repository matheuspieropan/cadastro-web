import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposta } from './model/proposta';
import { CadastroService } from './service/cadastro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  value = 24;
  propostas: Proposta[] = []

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService) {
  }

  ngOnInit(): void {
    this.buscarPropostas();
  }

  formulario: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(1)]],
    sobrenome: ['', [Validators.required, Validators.minLength(1)]],
    cpf: ['', [Validators.required, Validators.minLength(1)]],
    prazoPagamento: [24],
    salario: [null, [Validators.required, Validators.minLength(1)]],
    valorSolicitado: [null, [Validators.required, Validators.minLength(1)]],
  })

  buscarPropostas(): void {
    this.cadastroService.obterPropostas().subscribe({
      next: propostas => {
        this.propostas = propostas
      }
    })
  }

  castrarProposta(): void {
    this.cadastroService.castrarProposta(this.formulario.value).subscribe({
      next: () => {
        this.buscarPropostas()
        this.limparFormulario();
      }, error: (error) => {
      }
    })
  }

  limparFormulario(): void {
    this.formulario.patchValue({
      nome: '',
      sobrenome: '',
      cpf: '',
      prazoPagamento: 24,
      salario: null,
      valorSolicitado: null,
    })
  }
  
}