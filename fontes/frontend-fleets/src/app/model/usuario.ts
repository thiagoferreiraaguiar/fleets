import { Perfil } from '../model/perfil';

export class Usuario {
    public id: number = 0;
    public nome: string = "";
    public email: string = "";
    public cpf: string = "";
    public senha: string = "";
    public confirmaSenha: string = "";
    public dataNascimento: Date = new Date();
    public ativo: boolean = false;
    public perfil: Perfil = new Perfil();

    public constructor() {
    }
}
