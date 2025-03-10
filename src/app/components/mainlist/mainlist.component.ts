import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

// Remova o HttpClientModule do import aqui
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mainlist',
  standalone: true,
  imports: [CommonModule, FormsModule], // Apenas os módulos necessários
  templateUrl: './mainlist.component.html',
  styleUrls: ['./mainlist.component.scss']
})

export class MainlistComponent implements OnInit {

  signos = [
    { nome: 'Áries', imagem: 'src/assets/imagens/aries.png', cor: 'red', inicio: '03-21', fim: '04-19' },
    { nome: 'Touro', imagem: '/assets/imagens/touro.png', cor: 'green', inicio: '04-20', fim: '05-20' },
    { nome: 'Gêmeos', imagem: './assets/imagens/gemeos.png', cor: 'yellow', inicio: '05-21', fim: '06-20' },
    { nome: 'Câncer', imagem: './assets/imagens/cancer.png', cor: 'silver', inicio: '06-21', fim: '07-22' },
    { nome: 'Leão', imagem: './assets/imagens/leao.png', cor: 'orange', inicio: '07-23', fim: '08-22' },
    { nome: 'Virgem', imagem: './assets/imagens/virgem.png', cor: 'lightblue', inicio: '08-23', fim: '09-22' },
    { nome: 'Libra', imagem: './assets/imagens/libra.png', cor: 'aqua', inicio: '09-23', fim: '10-22' },
    { nome: 'Escorpião', imagem: './assets/imagens/escorpiao.png', cor: 'indigo', inicio: '10-23', fim: '11-21' },
    { nome: 'Sagitário', imagem: './assets/imagens/sagitario.png', cor: 'purple', inicio: '11-22', fim: '12-21' },
    { nome: 'Capricórnio', imagem: './assets/imagens/capricornio.png', cor: 'brown', inicio: '12-22', fim: '01-19' },
    { nome: 'Aquário', imagem: './assets/imagens/aquario.png', cor: 'blue', inicio: '01-20', fim: '02-18' },
    { nome: 'Peixes', imagem: './assets/imagens/peixes.png', cor: 'fuchsia', inicio: '02-19', fim: '03-20' }
  ];

  usuarios: Usuario[] = []; // Agora é um array do tipo Usuario
  selectedSigno: string = '';
  resultado: string = '';
  isHeaderVisible: boolean = true;
  lastScrollTop: number = 0;
  searchNome: string = '';
  selectedUsuario: any = null;
  usuariosFiltrados: any[] = [];
  nomeBuscaSignos: string = '';
  usuariosFiltradosSignos: any[] = [];
  compatibilidadeResultado: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios(); // Carregar os usuários ao iniciar o componente
  }

  loadUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosFiltrados = usuarios; // Inicializa a lista filtrada
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll === 0) {
      this.isHeaderVisible = true;
    } else {
      this.isHeaderVisible = false;
    }
  }

  selecionarSigno(signo: string): void {
    alert('Você selecionou: ' + signo);
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
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const idade = (document.getElementById('idade') as HTMLInputElement).value;
    const telefone = (document.getElementById('telefone') as HTMLInputElement).value;
    const endereco = (document.getElementById('endereco') as HTMLInputElement).value;
    const numero = (document.getElementById('numero') as HTMLInputElement).value;
    const cep = (document.getElementById('cep') as HTMLInputElement).value;

    const novoUsuario: Usuario = {
      nome: nome,
      idade: parseInt(idade),
      telefone: telefone,
      endereco: endereco,
      numero: numero,
      cep: cep
    };

    // Chama o serviço para adicionar o usuário no backend
    this.usuarioService.adicionarUsuario(novoUsuario).subscribe(
      (usuario) => {
        console.log('Usuário cadastrado:', usuario);
        this.usuarios.push(usuario); // Atualiza a lista de usuários
        this.usuariosFiltrados.push(usuario); // Atualiza a lista filtrada
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );

    // Limpa os campos após o cadastro
    (document.getElementById('nome') as HTMLInputElement).value = '';
    (document.getElementById('idade') as HTMLInputElement).value = '';
    (document.getElementById('telefone') as HTMLInputElement).value = '';
    (document.getElementById('endereco') as HTMLInputElement).value = '';
    (document.getElementById('numero') as HTMLInputElement).value = '';
    (document.getElementById('cep') as HTMLInputElement).value = '';
  }

  abrirModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  fecharModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  filterUsuarios() {
    return this.usuarios.filter(usuario => 
      usuario.nome.toLowerCase().includes(this.searchNome.toLowerCase())
    );
  }

  selecionarUsuario(usuario: any, tipo: string) {
    console.log(`Usuário selecionado: ${usuario.nome}, Tipo: ${tipo}`);
  }

  testarCompatibilidade(): void {
    this.compatibilidadeResultado = 'Compatibilidade testada com sucesso!';
  }
}