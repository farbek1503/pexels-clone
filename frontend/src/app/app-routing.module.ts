import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultComponent } from './components/result/result.component';
import { InfoComponent } from './components/info/info.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'result', component: ResultComponent },
	{ path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
