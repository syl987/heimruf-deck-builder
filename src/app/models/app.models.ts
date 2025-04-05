import { InjectionToken } from '@angular/core';

import * as dataConfig from 'src/data.config.json';

/**
 * Application-specific variables.
 */
export interface AppOptions {
  /** Application name to display in header and other places. */
  readonly applicationName: string;
  /** Name of the copyright holder for display in the footer. */
  readonly copyrightName: string;
  /** Year of the copyright for display in the footer. */
  readonly copyrightYear: string;
}

export const APP_OPTIONS = new InjectionToken<AppOptions>('APP_OPTIONS');

/**
 * Application-specific data options.
 */
export type AppDataConfig = typeof dataConfig;

export const APP_DATA_CONFIG = new InjectionToken<typeof dataConfig>('APP_DATA_CONFIG');
