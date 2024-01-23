import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proposta } from './model/proposta';
import { CadastroService } from './service/cadastro.service';
import { WebSocketConnector } from './service/web-socket-connector';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  observacao: string = ''
  exibirMsgCampoObrigatorio: boolean = false
  value = 24;
  propostas: Proposta[] = []

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private notificacao: ToastrService
  ) {
    new WebSocketConnector('http://localhost:8080/ws', '/propostas', this.onMessage.bind(this));
  }

  ngOnInit(): void {
    this.buscarPropostas();
  }

  formulario: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    sobrenome: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(3)]],
    renda: [0, [Validators.required, Validators.minLength(1)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    valorSolicitado: [0, [Validators.required, Validators.minLength(1)]],
    prazoPagamento: [24],
  })

  buscarPropostas(): void {
    this.cadastroService.obterPropostas().subscribe({
      next: propostas => {
        this.propostas = propostas
      }, error: () => {
        this.notificacao.error('Erro ao carregar propostas')
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
        this.notificacao.success('Proposta cadastrada com sucesso!')
      }, error: (error) => {
        this.notificacao.error(error.error)
      }
    })
  }

  limparFormulario(): void {
    this.formulario.patchValue({
      nome: '',
      telefone: '',
      sobrenome: '',
      cpf: '',
      prazoPagamento: 24,
      renda: 0,
      valorSolicitado: null,
    })
    this.exibirMsgCampoObrigatorio = false
  }

  onMessage(propostaAtualizada: any): void {
    var proposta = JSON.parse(propostaAtualizada.body) as Proposta
    const index = this.propostas.findIndex(p => p.id === proposta.id);
    this.propostas[index] = proposta;
  }

  setObservacao(observacao: string): void {
    this.observacao = observacao;
  }
}