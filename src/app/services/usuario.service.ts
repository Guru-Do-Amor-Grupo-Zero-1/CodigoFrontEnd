import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api/usuario'; // URL do seu back-end Java

  constructor(private http: HttpClient) { }

  // Método para listar usuários
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  // Método para adicionar um usuário
  adicionarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.post<Usuario>(`${this.apiUrl}/adicionar`, usuario);
  }

  // Método para deletar um usuário
  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }

  // Método para atualizar o signo de um usuário
  atualizarSigno(id: number, signo: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/atualizarSigno/${id}`, { signo });
  }
}
