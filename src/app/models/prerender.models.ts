import { ComponentRef } from '@angular/core';

export interface CardPrerender {
  cardId: string;
  cardComponentRef: ComponentRef<any>;
  // tileComponentRef: ComponentRef<any>;
}

export interface HeroPrerender {
  heroId: string;
  heroComponentRef: ComponentRef<any>;
}
