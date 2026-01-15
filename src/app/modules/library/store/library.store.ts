import { inject } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';
import { Store } from '@ngrx/store';

import { selectLibraryCards } from './library.selectors';

/**
 * Facade store for the Library module.
 *
 * Does not contain any state itself, only computed signals and methods.
 */
export const LibraryStore = signalStore(
  { providedIn: 'root' },
  withComputed(() => ({
    cards: (store = inject(Store)) => store.selectSignal(selectLibraryCards),
  })),
);
