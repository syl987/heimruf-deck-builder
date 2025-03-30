import { NgModule } from '@angular/core';

import { CardComponent } from './components/card/card.component';
import { HeroComponent } from './components/hero/hero.component';
import { MinionComponent } from './components/minion/minion.component';
import { SpellComponent } from './components/spell/spell.component';
import { WeaponComponent } from './components/weapon/weapon.component';

@NgModule({
  imports: [CardComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
  exports: [CardComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
})
export class EntityModule {}
