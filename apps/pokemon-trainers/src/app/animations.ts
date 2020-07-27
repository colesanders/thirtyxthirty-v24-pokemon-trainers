import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

export const Animations = [
    trigger('openClose', [
        // ...
        state('open', style({
        width: '49%',
        opacity: 1,
        })),
        state('closed', style({
        width: '25%',
        opacity: 0.7,
        })),
        transition('open => closed', [
        animate('1s 0s ease-in-out')
        ]),
        transition('closed => open', [
        animate('1s 0s ease-in-out')
        ]),
    ])
]