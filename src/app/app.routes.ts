import { Routes } from '@angular/router';
import { MainlistComponent } from './components/mainlist/mainlist.component';

export const routes: Routes = [
    {path: "", redirectTo: "guru-do-amor", pathMatch: 'full'},
    {path: "guru-do-amor", component: MainlistComponent} 
];
