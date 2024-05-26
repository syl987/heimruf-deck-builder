import { InjectionToken } from '@angular/core';

/**
 * Application-specific variables.
 */
export interface AppOptions {
  /** Application name to display in header and other places. */
  readonly applicationName: string;
  /** Name of the legal copyright holder for display in the footer. */
  readonly copyrightName: string;
  /** Year of the last update for display in the footer. */
  readonly copyrightYear: string;
}

export const APP_OPTIONS = new InjectionToken<AppOptions>('APP_OPTIONS');

/**
 * Application-specific data options.
 */
export interface AppDataConfig {
  /* Card classes to include in the application. */
  readonly cardClasses: readonly string[];
  /* Card types to include in the application. */
  readonly cardTypes: readonly string[];
  /* Card sets to include in the application. */
  readonly cardSets: readonly string[];
  /* Whether to use the collectible or full data file. */
  readonly collectibleOnly: boolean;
  /* Hearthstonejson data version. */
  readonly version: string;
  /* Hearthstonejson data locale. */
  readonly locale: string;
}

export const APP_DATA_CONFIG = new InjectionToken<AppDataConfig>('APP_DATA_CONFIG');
