import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { APP_OPTIONS, AppOptions } from './models/app.models';

@Component({
  selector: 'hs-root',
  imports: [RouterModule, MatCardModule, MatTabsModule, DatePipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex flex-column min-vh-100' },
})
export class AppComponent {
  readonly showScreenSizeWarning$ = this.observer.observe('(max-width: 532px)').pipe(map(({ matches }) => matches));

  readonly build = build;

  constructor(
    private readonly observer: BreakpointObserver,
    @Inject(APP_OPTIONS) readonly options: AppOptions,
  ) {}
}
