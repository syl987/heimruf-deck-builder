import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { APP_OPTIONS, AppOptions } from './models/app.models';

@Component({
  selector: 'hs-root',
  imports: [RouterModule, MatCardModule, MatTabsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-flex flex-column min-vh-100' },
})
export class AppComponent {
  private readonly warning$ = this.observer.observe('(max-width: 532px)').pipe(map(({ matches }) => matches));

  readonly warning = toSignal(this.warning$, { initialValue: false });

  readonly build = build;

  constructor(
    private readonly observer: BreakpointObserver,
    @Inject(APP_OPTIONS) readonly options: AppOptions,
  ) {}
}
