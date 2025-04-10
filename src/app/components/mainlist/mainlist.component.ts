import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { MatchService } from '../../services/match.service';
import { MatchResponse } from '../../models/match.mode';
import { MainlistModule } from './mainlist.module';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mainlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mainlist.component.html',
  styleUrls: ['./mainlist.component.scss']
})
export class MainlistComponent implements OnInit {
  matchService = inject(MatchService);

  signos = [
    { nome: 'Aries', icone: '♈', cor: '#9a6fc2', inicio: '03-21', fim: '04-19', selected: false },
    { nome: 'Touro', icone: '♉', cor: '#9a6fc2', inicio: '04-20', fim: '05-20', selected: false },
    { nome: 'Gemeos', icone: '♊', cor: '#9a6fc2', inicio: '05-21', fim: '06-20', selected: false },
    { nome: 'Cancer', icone: '♋', cor: '#9a6fc2', inicio: '06-21', fim: '07-22', selected: false },
    { nome: 'Leao', icone: '♌', cor: '#9a6fc2', inicio: '07-23', fim: '08-22', selected: false },
    { nome: 'Virgem', icone: '♍', cor: '#9a6fc2', inicio: '08-23', fim: '09-22', selected: false },
    { nome: 'Libra', icone: '♎', cor: '#9a6fc2', inicio: '09-23', fim: '10-22', selected: false },
    { nome: 'Escorpiao', icone: '♏', cor: '#9a6fc2', inicio: '10-23', fim: '11-21', selected: false },
    { nome: 'Sagitario', icone: '♐', cor: '#9a6fc2', inicio: '11-22', fim: '12-21', selected: false },
    { nome: 'Capricornio', icone: '♑', cor: '#9a6fc2', inicio: '12-22', fim: '01-19', selected: false },
    { nome: 'Aquario', icone: '♒', cor: '#9a6fc2', inicio: '01-20', fim: '02-18', selected: false },
    { nome: 'Peixes', icone: '♓', cor: '#9a6fc2', inicio: '02-19', fim: '03-20', selected: false }
  ];

  usuarios: Usuario[] = [];
  
  selectedSigno: string = '';
  resultado: string = '';
  isHeaderVisible: boolean = true;
  lastScrollTop: number = 0;
  searchNome: string = '';
  selectedUsuario1: Usuario | null = null;
  selectedUsuario2: Usuario | null = null;
  usuariosFiltrados: any[] = [];
  nomeBuscaSignos: string = '';
  usuariosFiltradosSignos: any[] = [];
  compatibilidadeResultado: string = '';
  searchNome1: string = '';  // Pesquisa para o Usuário 1
  searchNome2: string = '';  // Pesquisa para o Usuário 2
  compatibilidade: number = 0; // Valor da compatibilidade em número
  usuario1: string = '';
  usuario2: string = '';
  mensagem: string = '';
  distancia: string = '';
  matchsFiltrados: any[] = [];
  compatibilidadeSignos: number = 0;
  compatibilidadeResultadoSignos: string = ''
  signo1: string = '';  // Defina um valor inicial adequado
  signo2: string = '';  // Defina um valor inicial adequado
  matchResponse: MatchResponse | null = null;

  
  

  novoUsuario = {
    nomeUsuario: '',
    idade: 0,
    telefone: '',
    endereco: '',
    numero: '',
    cep: ''
  };
  matchs: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadMatches();
  }
  

  loadUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  @HostListener('window:scroll', [] )
  onScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    this.isHeaderVisible = currentScroll === 0;
  }

  selecionarSigno(signo: string): void {
    this.selectedSigno = signo;
    Swal.fire({
      icon: 'success',
      title: 'Signo Selecionado',
      text: 'Você selecionou: ' + signo,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',  // Cor personalizada para o botão
      background: '#d4edda',  // Cor de fundo suave
      showCloseButton: true  // Adiciona botão de fechar
    });
  }

  abrirAgenda(): void {
    const dataInput = document.getElementById('dataEscolhida') as HTMLInputElement;
    if (dataInput) dataInput.style.display = 'block';
  }

  descobrirSigno(event: Event): void {
    const data = (event.target as HTMLInputElement).value;
    if (!data) {
      this.resultado = 'Por favor, selecione uma data.';
      return;
    }
    const [ano, mes, dia] = data.split('-');
    const dataSelecionada = `${mes}-${dia}`;
    let signoEncontrado = 'Signo não encontrado';
    for (const signo of this.signos) {
      if (
        (dataSelecionada >= signo.inicio && dataSelecionada <= signo.fim) ||
        (signo.nome === 'Capricórnio' && (dataSelecionada >= '12-22' || dataSelecionada <= '01-19'))
      ) {
        signoEncontrado = signo.nome;
        break;
      }
    }
    this.resultado = 'Seu signo é: ' + signoEncontrado;
  }

  formatarTelefone(event: Event): void {
    let valor = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (valor.length <= 2) {
      valor = valor.replace(/^(\d{0,2})/, '($1');
    } else if (valor.length <= 6) {
      valor = valor.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    } else if (valor.length <= 10) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    (event.target as HTMLInputElement).value = valor;
  }

 cadastrarUsuario(): void {
  const { nomeUsuario, idade, telefone, endereco, numero, cep } = this.novoUsuario;

  if (!nomeUsuario || !idade || !telefone || !endereco || !numero || !cep || !this.selectedSigno) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos os campos devem ser preenchidos, incluindo o signo!',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Verifica se a idade é menor que 18
  if (idade < 18) {
    Swal.fire({
      icon: 'error',
      title: 'Idade inválida',
      text: 'Você precisa ter 18 anos ou mais para se cadastrar.',
      confirmButtonText: 'Entendi'
    });
    return;
  }
  const novoUsuario: Usuario = {
    nomeUsuario: nomeUsuario,
    idade: idade,
    telefone: telefone,
    endereco: endereco,
    numero: numero,
    cep: cep,
    signoUsuario: this.selectedSigno.toUpperCase()  // Certifique-se de que o signo esteja em maiúsculas
  };

  // Chama o serviço para adicionar o novo usuário
  this.usuarioService.adicionarUsuario(novoUsuario).subscribe(
    (usuario) => {
      console.log('Usuário cadastrado:', usuario);
      this.usuarios.push(usuario);
      this.usuariosFiltrados.push(usuario);
    },
    (error) => {
      console.error('Erro ao cadastrar usuário:', error);
    }
  );

  // Limpa o formulário após o cadastro
  this.novoUsuario = {
    nomeUsuario: '',
    idade: 0,
    telefone: '',
    endereco: '',
    numero: '',
    cep: ''
  };
  this.selectedSigno = '';  // Limpa a seleção do signo após cadastrar
}

  
  abrirModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  }
  onSearchChange(): void {
  this.matchsFiltrados = this.matchs.filter(match =>
    match.usuario1.toLowerCase().includes(this.searchNome.toLowerCase()) ||
    match.usuario2.toLowerCase().includes(this.searchNome.toLowerCase())
  );
}

  onSearch(): void {
    if (this.searchNome) {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nomeUsuario.toLowerCase().includes(this.searchNome.toLowerCase())
      );
    } else {
      this.usuariosFiltrados = this.usuarios;  // Quando o campo de pesquisa está vazio, mostra todos os usuários
    }
  }
  
  resultadoSignos: any[] = []; // Pode ser um array ou objeto conforme necessário

  fecharModal(modalId: string): void {
    // Limpar os dados específicos da modal
    this.resultadoSignos = [];
    this.compatibilidadeResultado = '';
    this.distancia = '';
    this.matchResponse = null;  // Limpar o matchResponse caso seja usado na modal
  
    // Fechar a modal
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
  filterUsuarios(searchNome?: string): any[] {
    if (searchNome) {
      // Filtra os usuários com base no nome
      return this.usuarios.filter(usuario =>
        usuario.nomeUsuario.toLowerCase().includes(searchNome.toLowerCase())
      );
    } else {
      return this.usuarios; // Se não houver pesquisa, retorna todos os usuários
    }
  }
  
  selecionarUsuario(event: Event, usuario: string): void {
    const target = event.target as HTMLSelectElement; // Asserção de tipo para HTMLSelectElement
    if (target && target.value) {
      if (usuario === 'usuario1') {
        this.selectedUsuario1 = this.usuarios.find(u => u.nomeUsuario === target.value) || null;
      } else if (usuario === 'usuario2') {
        this.selectedUsuario2 = this.usuarios.find(u => u.nomeUsuario === target.value) || null;
      }
      console.log('Usuário selecionado:', target.value, usuario);
    }
  }

  verificarCompatibilidade() {
    if (this.selectedUsuario1 && this.selectedUsuario2) {
      this.matchService.verificarCompatibilidade(this.selectedUsuario1, this.selectedUsuario2).subscribe({
        next: (data: MatchResponse) => {
          console.log(data);
          // Para a modal de signos, armazenamos a resposta completa:
          this.matchResponse = data;
          // Para a modal normal, atualizamos as variáveis específicas:
          this.compatibilidadeResultado = data.compatibilidade;
          this.distancia = data.distancia;
        },
        error: (erro) => {
          console.error('Erro ao verificar compatibilidade:', erro);
          this.compatibilidadeResultadoTexto = 'Erro ao verificar compatibilidade.';
        }
      });
    } else {
      this.compatibilidadeResultadoTexto = 'Selecione dois usuários para verificar a compatibilidade.';
    }
  }
  
  


  compatibilidadeResultadoTexto: string = ''; // Para armazenar o resultado como string

  loadMatches(): void {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        this.matchs = data; // Atribui os matchs retornados à variável
      },
      (error) => {
        console.error('Erro ao carregar os matchs', error);
      }
    );
  }
  filterMatchs(): any[] {
    if (this.searchNome) {
      return this.matchs.filter(match =>
        (match.usuario1 && match.usuario1.toLowerCase().includes(this.searchNome.toLowerCase())) ||
        (match.usuario2 && match.usuario2.toLowerCase().includes(this.searchNome.toLowerCase()))
      );
    } else {
      return this.matchs;
    }
  }
  
}