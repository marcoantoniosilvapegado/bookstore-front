import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String=""
  livro: Livro = {
    id : '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(
    private service: LivroService, 
    private route: ActivatedRoute,
    private router: Router) {

    }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta)=>{
      console.log(resposta)
      this.livro = resposta
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessage(){
   /**  if(this.titulo.invalid){
      return 'O campo titulo deve ter entre 3 e 100 caracteres'
    }     
    
    if(this.nome_autor.invalid){
      return 'O campo NOME AUTOR deve ter entre 3 e 100 caracteres'
    }   

    if(this.texto.invalid){
      return 'O campo texto deve ter entre 10 e 2000000 caracteres'
    }   
    return false;**/
  }

  delete(): void{
    this.service.delete(this.livro.id!).subscribe(()=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Excluido com sucesso!")
    }, err =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Falha ao deletar livro!")
    })
  }

}
