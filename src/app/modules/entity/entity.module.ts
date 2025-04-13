import { NgModule } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { MinionComponent } from './components/minion/minion.component';
import { SpellComponent } from './components/spell/spell.component';
import { TileComponent } from './components/tile/tile.component';
import { WeaponComponent } from './components/weapon/weapon.component';

@NgModule({
  imports: [TileComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
  exports: [TileComponent, MinionComponent, SpellComponent, WeaponComponent, HeroComponent],
})
export class EntityModule {}
