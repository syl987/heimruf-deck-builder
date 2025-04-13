import { CardClass } from './entity.models';

export interface CardPrefilter {
  cardClass: CardClass;
  cardIds: string[];
  withNeutral: {
    minionIds: string[];
    spellIds: string[];
    weaponIds: string[];
    cost0Ids: string[];
    cost1Ids: string[];
    cost2Ids: string[];
    cost3Ids: string[];
    cost4Ids: string[];
    cost5Ids: string[];
    cost6Ids: string[];
    cost7plusIds: string[];
  };
}
