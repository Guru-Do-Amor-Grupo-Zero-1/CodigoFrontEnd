import { Component } from '@angular/core';

@Component({
  selector: 'app-testematchpadrao',
  imports: [],
  templateUrl: './testematchpadrao.component.html',
  styleUrl: './testematchpadrao.component.scss'
})
export class TestematchpadraoComponent {
  fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
