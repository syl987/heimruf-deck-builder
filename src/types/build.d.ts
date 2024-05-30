/**
 * Dynamic build variables injectend into the app via `index.html`.
 *
 * @see `/public/build.js` file for details.
 */
declare const build: {
  /** Current version as read from package.json. */
  readonly version: string;
  /** Current version date as ISO string (without time). */
  readonly date: string;
};
