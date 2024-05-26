import { map, MonoTypeOperatorFunction } from 'rxjs';

import { Entity } from '../models/entity.models';

export function reduceByCardType(cardTypes?: string[], thisArg?: any): MonoTypeOperatorFunction<Entity[]> {
  return map(items => items.filter(item => !cardTypes || cardTypes.some(type => item.type === type)), thisArg);
}

export function reduceByCardSet(cardSets?: string[], thisArg?: any): MonoTypeOperatorFunction<Entity[]> {
  return map(items => items.filter(item => !cardSets || cardSets.some(set => item.set === set)), thisArg);
}
