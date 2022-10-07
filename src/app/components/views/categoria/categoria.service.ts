import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl

  constructor(private httpClient: HttpClient) { 
    
  }
  
  findAll(): Observable<Categoria[]>{
    const url = `${this.baseUrl}/categorias`
    return this.httpClient.get<Categoria[]>(url)
  }
}
