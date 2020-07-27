import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'thirty-mat-chip',
  templateUrl: './mat-chip.component.html',
  styleUrls: ['./mat-chip.component.scss']
})
export class MatChipComponent implements OnInit, OnChanges{
  @Input() chipList: string[];
  @Output() newChipList = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  chips: string[];

  constructor() { }

  ngOnInit(): void {
    this.chips = [...this.chipList];
  }

  ngOnChanges(){
    this.chips = [...this.chipList];
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //add toppings
    if ((value || '').trim()) {
      this.chips.push(value.trim() + '');
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.newChipList.emit(this.chips);
  }

  remove(chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }

    this.newChipList.emit(this.chips);
  }
}
