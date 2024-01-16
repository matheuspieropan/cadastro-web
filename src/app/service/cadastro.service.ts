import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposta } from '../model/proposta';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  castrarProposta(formulario: any): Observable<Proposta> {
    return this.http.post<Proposta>('http://localhost:8080/proposta', formulario);
  }

  obterPropostas(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>('http://localhost:8080/proposta');
  }
}