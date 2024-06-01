import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { APP_DATA_CONFIG, AppDataConfig } from '../models/app.models';
import { Entity } from '../models/entity.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly baseUrl = `/assets/json/hearthstonejson/v1/${this.config.version}/${this.config.locale || 'enUS'}`;

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_DATA_CONFIG) private readonly config: AppDataConfig,
  ) {}

  loadCardData(): Observable<Entity[]> {
    const url = `${this.baseUrl}/cards.collectible.json`;

    return this.http.get<Entity[]>(url).pipe(
      map(cardData =>
        cardData
          .filter(c => (this.config.cardClasses?.length ? this.config.cardClasses.some(cardClass => cardClass === c.cardClass) : true))
          .filter(c => (this.config.cardTypes?.length ? this.config.cardTypes.some(type => type === c.type) : true))
          .filter(c => (this.config.cardSets?.length ? this.config.cardSets.some(set => set === c.set) : true)),
      ),
    );
  }
}
