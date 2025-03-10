import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainlistModule } from './components/mainlist/mainlist.module'; // Importando o módulo do Mainlist
import { provideHttpClient } from '@angular/common/http'; // Provedor do HttpClient

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainlistModule  // Agora o MainlistModule está disponível aqui
  ],
  providers: [
    provideHttpClient(), // Provedor de HttpClient configurado aqui
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
