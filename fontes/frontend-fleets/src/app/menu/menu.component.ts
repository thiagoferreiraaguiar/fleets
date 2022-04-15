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
  siglaNome: string = ""
  usuarioLogado: UsuarioLogado = new UsuarioLogado();

  constructor() { }

  ngOnInit() {
    this.addItensMenu();
    this.addItensUsuario();
    this.usuarioLogado = UsuarioLogado.getInstance();
    this.usuarioLogado.exibeMenu.subscribe((show: boolean) => {
      if (show) {
        // Letras iniciais
        let array = this.usuarioLogado.usuario.nome.replace(/\s(de|da|dos|das)\s/g, ' ').split(" ");
        array.forEach(element => {
          this.siglaNome += element.charAt(0);
        });
      }
    });
  }

  private addItensMenu(): void {
    this.items = [
      { label: "Home", icon: "pi pi-home", routerLink: ['/home'] },
      {
        label: "Acesso", icon: "pi pi-user",
        items: [
          { label: "Perfil", routerLink: ['/list-perfil'] },
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

  private addItensUsuario() {
    this.itemsUsuario = [
      { label: 'Alterar e-mail', icon: 'pi pi-envelope', routerLink: ['/altera-email'] },
      { label: 'Alterar senha', icon: 'pi pi-lock', routerLink: ['/altera-senha'] },
      { separator: true },
      { label: 'Sair', icon: 'pi pi-fw pi-power-off', routerLink: '' }
    ];
  }

}
