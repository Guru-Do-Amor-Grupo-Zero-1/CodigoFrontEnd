import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainlist',
  templateUrl: './mainlist.component.html',
  styleUrls: ['./mainlist.component.scss']
})
export class MainlistComponent implements OnInit {
  signos = [
    { nome: 'Áries', imagem: 'assets/imagens/aries.png', cor: 'red', inicio: '03-21', fim: '04-19' },
    { nome: 'Touro', imagem: 'assets/imagens/touro.png', cor: 'green', inicio: '04-20', fim: '05-20' },
    { nome: 'Gêmeos', imagem: 'assets/imagens/gemeos.png', cor: 'yellow', inicio: '05-21', fim: '06-20' },
    { nome: 'Câncer', imagem: 'assets/imagens/cancer.png', cor: 'silver', inicio: '06-21', fim: '07-22' },
    { nome: 'Leão', imagem: 'assets/imagens/leao.png', cor: 'orange', inicio: '07-23', fim: '08-22' },
    { nome: 'Virgem', imagem: 'assets/imagens/virgem.png', cor: 'lightblue', inicio: '08-23', fim: '09-22' },
    { nome: 'Libra', imagem: 'assets/imagens/libra.png', cor: 'aqua', inicio: '09-23', fim: '10-22' },
    { nome: 'Escorpião', imagem: 'assets/imagens/escorpiao.png', cor: 'indigo', inicio: '10-23', fim: '11-21' },
    { nome: 'Sagitário', imagem: 'assets/imagens/sagitario.png', cor: 'purple', inicio: '11-22', fim: '12-21' },
    { nome: 'Capricórnio', imagem: 'assets/imagens/capricornio.png', cor: 'brown', inicio: '12-22', fim: '01-19' },
    { nome: 'Aquário', imagem: 'assets/imagens/aquario.png', cor: 'blue', inicio: '01-20', fim: '02-18' },
    { nome: 'Peixes', imagem: 'assets/imagens/peixes.png', cor: 'fuchsia', inicio: '02-19', fim: '03-20' }
  ];

  selectedSigno: string = '';
  resultado: string = '';

  constructor() {}

  ngOnInit(): void {}

  selecionarSigno(signo: string): void {
    alert('Você selecionou: ' + signo);
  }

  abrirAgenda(): void {
    const dataInput = document.getElementById('dataEscolhida') as HTMLInputElement;
    if (dataInput) dataInput.style.display = 'block';
  }

  descobrirSigno(data: string): void {
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

  abrirModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }
}
