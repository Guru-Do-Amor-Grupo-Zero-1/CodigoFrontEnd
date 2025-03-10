import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importando o FormsModule
import { MainlistComponent } from './mainlist.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainlistComponent],
  imports: [CommonModule, FormsModule,HttpClientModule],
  exports: [MainlistComponent]
})
export class MainlistModule {}
