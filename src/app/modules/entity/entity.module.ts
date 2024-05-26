import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { HeroComponent } from './components/hero/hero.component';
import { MinionComponent } from './components/minion/minion.component';
import { SpellComponent } from './components/spell/spell.component';
import { WeaponComponent } from './components/weapon/weapon.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CardComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
  exports: [CardComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
})
export class EntityModule {}
