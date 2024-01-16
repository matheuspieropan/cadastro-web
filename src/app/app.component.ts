import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder){
  }

  value = 24;

  formulario: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(1)]],
    sobrenome: ['', [Validators.required, Validators.minLength(1)]],
    cpf: ['', [Validators.required, Validators.minLength(1)]],
    meses: [24, [Validators.required, Validators.minLength(1)]],
  })
}