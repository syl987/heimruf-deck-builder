import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hero } from 'src/app/models/entity.models';

const heroTemplate = 'assets/img/template/hero/standard-hero-template.png';

const boardHeroTemplate = 'assets/img/template/hero/board-hero-template.png';

function firstWord(text?: string | null): string | null {
  return text?.split(' ')[0] ?? null;
}

@Component({
  selector: 'hs-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-hero' },
})
export class HeroComponent {
  readonly data = input.required<Hero>();

  get image256xUrl(): string {
    return `assets/img/hearthstonejson/v1/256x/${this.data().id}.jpg`;
  }

  readonly templateUrl = heroTemplate;

  firstWord = firstWord;
}
