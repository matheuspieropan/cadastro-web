import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposta } from './model/proposta';
import { CadastroService } from './service/cadastro.service';
import { WebSocketConnector } from './service/web-socket-connector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  exibirMsgCampoObrigatorio: boolean = false
  value = 24;
  propostas: Proposta[] = []

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
  ) {
    new WebSocketConnector('http://localhost:8080/ws', '/propostas', this.onMessage.bind(this));
  }

  ngOnInit(): void {
    this.buscarPropostas();
  }

  formulario: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    sobrenome: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    prazoPagamento: [24],
    salario: [0, [Validators.required, Validators.minLength(1)]],
    valorSolicitado: [0, [Validators.required, Validators.minLength(1)]],
  })

  buscarPropostas(): void {
    this.cadastroService.obterPropostas().subscribe({
      next: propostas => {
        this.propostas = propostas
      }
    })
  }

  cadastrarProposta(): void {
    if (this.formulario.invalid) {
      this.exibirMsgCampoObrigatorio = true;
      return;
    }

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
      email: '',
      sobrenome: '',
      cpf: '',
      prazoPagamento: 24,
      salario: 0,
      valorSolicitado: null,
    })
    this.exibirMsgCampoObrigatorio = false
  }

  onMessage(propostas: any): void {
    this.propostas = JSON.parse(propostas.body) as Proposta[]
  }
}