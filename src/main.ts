import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';  // Certifique-se de que o arquivo app.config existe
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
