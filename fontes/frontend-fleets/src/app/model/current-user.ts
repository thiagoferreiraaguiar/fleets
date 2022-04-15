import { Usuario } from '../model/usuario';

export class CurrentUser {
    public token: string = "";
    public usuario: Usuario = new Usuario();

    public constructor() {
    }
}
