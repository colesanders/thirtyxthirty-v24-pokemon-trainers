import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonTrainer } from '@thirty/api-interfaces';
import { PokemonTrainersFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'thirty-pokemons-overview',
  templateUrl: './pokemon-trainers-overview.component.html',
  styleUrls: ['./pokemon-trainers-overview.component.scss']
})
export class PokemonTrainersOverviewComponent implements OnInit, OnChanges {
  pokemonTrainer$: Observable<PokemonTrainer> = this.pokemonTrainersFacade.selectedPokemonTrainer$;


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonTrainersFacade: PokemonTrainersFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.pokemonTrainersFacade.mutations$.subscribe((action: any) => this.get());

  }

  ngOnChanges(): void{
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonTrainersFacade.selectPokemonTrainer(id);
  }

  close(){
    this.pokemonTrainersFacade.resetSelectedPokemonTrainer();
    this.router.navigate(['/pokemon-trainers']);
  }
}
