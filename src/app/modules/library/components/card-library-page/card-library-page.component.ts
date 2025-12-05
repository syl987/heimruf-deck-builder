import { ESCAPE } from '@angular/cdk/keycodes';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FullscreenOverlayContainer, Overlay, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AsyncPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, first, map, merge, startWith } from 'rxjs';

import { APP_DATA_CONFIG, AppDataConfig } from 'src/app/models/app.models';
import { Card, CardType } from 'src/app/models/entity.models';
import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { selectLibraryCards } from '../../store/library.selectors';

function getCardOverlayScale(breakpoint: string): number {
  switch (breakpoint) {
    case Breakpoints.Small:
      return 1.25;
    case Breakpoints.Medium:
      return 1.375;
    case Breakpoints.Large:
      return 1.5;
    case Breakpoints.XLarge:
      return 1.625;
    default:
      return 1.125;
  }
}

@Component({
  selector: 'hs-card-library-page',
  imports: [RouterModule, OverlayModule, MatTabsModule, EntityModule, SharedModule, TitleCasePipe, LowerCasePipe, AsyncPipe],
  templateUrl: './card-library-page.component.html',
  styleUrl: './card-library-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
})
export class CardLibraryPageComponent {
  readonly config = inject<AppDataConfig>(APP_DATA_CONFIG);
  private readonly store = inject(Store);
  private readonly overlay = inject(Overlay);
  private readonly observer = inject(BreakpointObserver);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly cards$ = this.store.select(selectLibraryCards);

  private readonly breakpoints$ = merge(
    this.observer.observe([Breakpoints.XSmall]),
    this.observer.observe([Breakpoints.Small]),
    this.observer.observe([Breakpoints.Medium]),
    this.observer.observe([Breakpoints.Large]),
    this.observer.observe([Breakpoints.XLarge]),
  ).pipe(
    filter(({ matches }) => matches),
    map(({ breakpoints }) => Object.keys(breakpoints)[0]), // select just one breakpoint that is relevant
  );

  readonly selectedCardScale$ = this.breakpoints$.pipe(map(getCardOverlayScale), startWith(1));
  readonly selectedCard$ = new BehaviorSubject<Card | undefined>(undefined);

  readonly CardType = CardType;

  @ViewChild('cardOverlay') readonly cardOverlayTemplateRef?: TemplateRef<unknown>;

  openCardOverlay(): void {
    if (!this.cardOverlayTemplateRef) {
      return;
    }
    const position = this.overlay.position().global().centerHorizontally().centerVertically();
    const scroll = this.overlay.scrollStrategies.block();

    const overlayRef = this.overlay.create({
      positionStrategy: position,
      scrollStrategy: scroll,
      disposeOnNavigation: true,
      hasBackdrop: true,
    });
    overlayRef.attach(new TemplatePortal(this.cardOverlayTemplateRef, this.viewContainerRef));

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(filter(({ keyCode }) => keyCode === ESCAPE)))
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }
}
