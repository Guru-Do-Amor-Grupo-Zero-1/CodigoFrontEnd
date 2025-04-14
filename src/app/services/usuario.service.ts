import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://10.128.0.5:5000/api/usuario'; // URL do seu back-end Java

  constructor(private http: HttpClient) { }

  // Método para listar usuários
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }
  

  // Método para adicionar um usuário
  adicionarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/adicionar`, usuario);
  }
  

  // Método para deletar um usuário
  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }

  // Método para atualizar um usuário
  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/atualizar/${usuario.id}`, usuario);
  }

  // Método para atualizar apenas o signo do usuário
  atualizarSigno(id: number, signo: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/atualizarSigno/${id}`, { signoUsuario: signo });
  }
}