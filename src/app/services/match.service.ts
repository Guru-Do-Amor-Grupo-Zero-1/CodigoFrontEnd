// match.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { MatchResponse } from '../models/match.mode';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = '/api/match'; // Substitua com o endpoint real

  constructor(private http: HttpClient) {}

  verificarCompatibilidade(usuario1: Usuario, usuario2: Usuario): Observable<MatchResponse> {
    const body = {
      usuario1: usuario1,
      usuario2: usuario2,
    };

    return this.http.post<MatchResponse>(`${this.apiUrl}/match`, body);
  }
  getAllMatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}