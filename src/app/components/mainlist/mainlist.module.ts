import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainlistComponent } from './mainlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MainlistComponent // Importação correta de um componente standalone
  ],
  exports: [MainlistComponent] // Agora ele pode ser exportado corretamente
})
export class MainlistModule {}
