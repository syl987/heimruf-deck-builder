import { ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';

import { EntityData } from '../models/data.models';
import { Card, CardType, Minion, Spell, Weapon } from '../models/entity.models';
import { MinionComponent } from '../modules/entity/components/minion/minion.component';
import { SpellComponent } from '../modules/entity/components/spell/spell.component';
import { WeaponComponent } from '../modules/entity/components/weapon/weapon.component';

export function createCollectionComponents(
  resolver: ComponentFactoryResolver,
  injector: Injector,
  data: EntityData<Card>[],
): ComponentRef<MinionComponent | SpellComponent | WeaponComponent>[] {
  return data.map(d => {
    let ref;
    switch (d.entity.type) {
      case CardType.MINION:
        ref = resolver.resolveComponentFactory(MinionComponent).create(injector);
        ref.instance.data = d as EntityData<Minion>;
        break;
      case CardType.SPELL:
        ref = resolver.resolveComponentFactory(SpellComponent).create(injector);
        ref.instance.data = d as EntityData<Spell>;
        break;
      case CardType.WEAPON:
        ref = resolver.resolveComponentFactory(WeaponComponent).create(injector);
        ref.instance.data = d as EntityData<Weapon>;
        break;
      default:
        throw new Error('Card type not recognized!');
    }
    return ref;
  });
}
