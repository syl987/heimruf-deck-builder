import { ESCAPE } from '@angular/cdk/keycodes';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, DestroyRef, Inject, signal, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { filter, first, map, merge } from 'rxjs';
import { APP_DATA_CONFIG, AppDataConfig } from 'src/app/models/app.models';
import { Card, CardType } from 'src/app/models/entity.models';

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
  templateUrl: './card-library-page.component.html',
  styleUrls: ['./card-library-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardLibraryPageComponent {
  readonly cards = this.store.selectSignal(selectLibraryCards);

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

  readonly selectedCardScale = toSignal(this.breakpoints$.pipe(map(getCardOverlayScale)), { initialValue: 1 });
  readonly selectedCard = signal<Card | undefined>(undefined);

  readonly CardType = CardType;

  @ViewChild('cardOverlay') readonly cardOverlayTemplateRef?: TemplateRef<any>;

  constructor(
    @Inject(APP_DATA_CONFIG) readonly config: AppDataConfig,
    private readonly store: Store,
    private readonly overlay: Overlay,
    private readonly observer: BreakpointObserver,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
  ) {}

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

    merge(overlayRef.backdropClick(), overlayRef.keydownEvents().pipe(filter(({ keyCode }) => keyCode === ESCAPE)))
      .pipe(first(), takeUntilDestroyed(this.destroyRef))
      .subscribe(_ => {
        overlayRef.detach();
        overlayRef.dispose();
      });
  }
}
