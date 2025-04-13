import { ApplicationRef, ComponentRef, createComponent, inject, Type } from '@angular/core';

import { isCard, isHero } from './entity.helpers';
import { CardType, Entity } from '../models/entity.models';
import { CardPrerender, HeroPrerender } from '../models/prerender.models';

export async function createCardComponents(data: Entity[]): Promise<CardPrerender[]> {
  return Promise.all(
    data.filter(isCard).map(async d => ({
      cardId: d.id,
      cardComponentRef: await createCardComponent(d),
      // tileComponentRef: await createTileComponent(d),
    })),
  );
}

export async function createHeroComponents(data: Entity[]): Promise<HeroPrerender[]> {
  return Promise.all(
    data.filter(isHero).map(async d => ({
      heroId: d.id,
      heroComponentRef: await createHeroComponent(d),
    })),
  );
}

export async function createCardComponent(data: Entity, applicationRef = inject(ApplicationRef)): Promise<ComponentRef<unknown>> {
  const ref = createComponent(await getEntityComponent(data.type), { environmentInjector: applicationRef.injector });
  ref.setInput('data', data);
  return ref;
}

export async function createHeroComponent(data: Entity, applicationRef = inject(ApplicationRef)): Promise<ComponentRef<unknown>> {
  const ref = createComponent(await import('../modules/entity/components/hero/hero.component').then(c => c.HeroComponent), { environmentInjector: applicationRef.injector });
  ref.setInput('data', data);
  return ref;
}

export async function createTileComponent(data: Entity, applicationRef = inject(ApplicationRef)): Promise<ComponentRef<unknown>> {
  const ref = createComponent(await import('../modules/entity/components/tile/tile.component').then(c => c.TileComponent), { environmentInjector: applicationRef.injector });
  ref.setInput('data', data);
  ref.setInput('count', 0);
  return ref;
}

async function getEntityComponent(type: CardType): Promise<Type<unknown>> {
  switch (type) {
    case CardType.MINION:
      return import('../modules/entity/components/minion/minion.component').then(c => c.MinionComponent);
    case CardType.SPELL:
      return import('../modules/entity/components/spell/spell.component').then(c => c.SpellComponent);
    case CardType.WEAPON:
      return import('../modules/entity/components/weapon/weapon.component').then(c => c.WeaponComponent);
    default:
      throw new Error('CardType not recognized.');
  }
}
