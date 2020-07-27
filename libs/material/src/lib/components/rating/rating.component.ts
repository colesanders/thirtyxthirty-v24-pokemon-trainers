import { Component, OnInit, OnChanges, 
  Input, Output, EventEmitter,} from '@angular/core';

@Component({
  selector: 'thirty-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() max: number;
  @Output() newRating = new EventEmitter();
  stars: number[]
  

  constructor() { }

  ngOnInit(): void {
    this.createStarArray(this.rating);
  }

  ngOnChanges(){
    this.createStarArray(this.rating);
  }

  createStarArray(rating: number){
    this.stars = [];
    for(let i = 0; i < this.max; i++){
      if(i<rating){
        this.stars.push(1);
      }else{
        this.stars.push(0);
      }
    }
  }

  rated(index: number){
     this.createStarArray(index+1);
     this.newRating.emit(index+1);
  }

}
