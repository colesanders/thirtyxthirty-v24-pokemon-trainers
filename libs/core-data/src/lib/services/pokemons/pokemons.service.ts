import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  all(){
    return this.http.get(BASE_URL);
  }

  byName(name: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(BASE_URL + '/' + name);
  }

  byId(id): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.getUrl(id));
  }

  create(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>(BASE_URL, pokemon);
  }

  update(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.put<Pokemon>(this.getUrl(pokemon.id), pokemon);
  }

  delete(id): Observable<Pokemon>{
    return this.http.delete<Pokemon>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
