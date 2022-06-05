import { AuthGuard } from './security/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('src/app/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },
  { path: 'usuario', loadChildren: () => import('src/app/usuario/usuario.module').then(m => m.UsuarioModule), canActivate: [AuthGuard] },
  { path: 'list-cotacao', loadChildren: () => import('src/app/cotacao/list-cotacao/list-cotacao.module').then(m => m.ListCotacaoModule), canActivate: [AuthGuard] },
  { path: 'form-cotacao', loadChildren: () => import('src/app/cotacao/form-cotacao/form-cotacao.module').then(m => m.FormCotacaoModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
