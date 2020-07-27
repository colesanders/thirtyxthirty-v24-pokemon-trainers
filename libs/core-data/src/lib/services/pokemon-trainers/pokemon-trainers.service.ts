import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonTrainer } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/pokemonTrainers';


@Injectable({
  providedIn: 'root'
})
export class PokemonTrainersService {

  constructor(private http: HttpClient) { }

  all(): Observable<[PokemonTrainer]>{
    return this.http.get<[PokemonTrainer]>(BASE_URL);
  }

  byId(id): Observable<PokemonTrainer>{
    return this.http.get<PokemonTrainer>(this.getUrl(id));
  }

  create(pokemon: PokemonTrainer): Observable<PokemonTrainer>{
    return this.http.post<PokemonTrainer>(BASE_URL, pokemon);
  }

  update(pokemon: PokemonTrainer): Observable<PokemonTrainer>{
    return this.http.put<PokemonTrainer>(this.getUrl(pokemon.id), pokemon);
  }

  delete(id): Observable<PokemonTrainer>{
    return this.http.delete<PokemonTrainer>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
