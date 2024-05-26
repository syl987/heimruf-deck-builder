import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { APP_DATA_CONFIG, AppDataConfig } from '../models/app.models';
import { Entity } from '../models/entity.models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly baseUrl = '/assets/json';

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_DATA_CONFIG) private readonly config: AppDataConfig,
  ) {}

  loadEntities(): Observable<Entity[]> {
    const url = `${this.baseUrl}/hearthstonejson/v1/${this.config.version}/${this.config.locale || 'enUS'}/cards.collectible.json`;

    return this.http.get<Entity[]>(url).pipe(
      map(entities =>
        entities
          .filter(e => (this.config.cardClasses.length ? this.config.cardClasses.some(cardClass => cardClass === e.cardClass) : true))
          .filter(e => (this.config.cardTypes.length ? this.config.cardTypes.some(type => type === e.type) : true))
          .filter(e => (this.config.cardSets.length ? this.config.cardSets.some(set => set === e.set) : true)),
      ),
    );
  }
}
