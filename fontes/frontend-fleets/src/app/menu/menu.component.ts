import { UsuarioLogado } from './../model/usuario-logado';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  itemsUsuario: MenuItem[] = [];
  siglaNome: string = "";
  usuarioLogado: UsuarioLogado = new UsuarioLogado();
  infoUsuarios: string = "";

  constructor() { }

  ngOnInit() {
    this.addItensMenu();
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.usuarioLogado.exibeMenu.subscribe((show: boolean) => {});
  }

  private addItensMenu(): void {
    this.items = [
      { label: "Home", icon: "pi pi-home", routerLink: ['/home'] },
      {
        label: "Acesso", icon: "pi pi-user",
        items: [
          { label: "Perfil", routerLink: ['/perfil'] },
          { label: "Usuário", routerLink: ['/list-usuario'] },
        ]
      },
      {
        label: "Cadastro", icon: "pi pi-file",
        items: [
          { label: "Cotação" },
          { label: "Histórico" }
        ]
      }
    ];
  }

  public getInformacaoesUsuario(){
    this.infoUsuarios = this.usuarioLogado.usuario.email;
  }

}
