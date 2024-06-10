// @ts-check
import * as fs from 'fs';
import { createRequire } from 'module';
import fetch from 'node-fetch';
import * as path from 'path';
import { concatMap, forkJoin, from, tap } from 'rxjs';

console.log();
console.log('Initializing card data miner...');
console.log();

const startTime = new Date().valueOf();

const require = createRequire(import.meta.url);
const config = require('../src/data.config.json');

const locales = ['all', config.locale];

const basePath = path.join('data', 'json', 'hearthstonejson', 'v1', config.version);

locales.forEach(locale => {
  fs.mkdir(`${basePath}/${locale}`, { recursive: true }, err => err && console.error(`Folder not created.`));
});

from(locales)
  .pipe(
    concatMap((locale, index) =>
      forkJoin([
        fetch(`https://api.hearthstonejson.com/v1/${config.version}/${locale}/cards.collectible.json`).then(res => res.arrayBuffer().then(Buffer.from)),
        fetch(`https://api.hearthstonejson.com/v1/${config.version}/${locale}/cards.json`).then(res => res.arrayBuffer().then(Buffer.from)),
      ]).pipe(
        tap(([collectibleCardData, allCardData]) => {
          fs.writeFileSync(path.join(basePath, locale, 'cards.collectible.json'), collectibleCardData);
          fs.writeFileSync(path.join(basePath, locale, 'cards.json'), allCardData);

          console.log(`Downloaded: ${locale} JSON data (${index + 1} / ${locales.length})`);
        }),
      ),
    ),
  )
  .subscribe({
    error: err => console.error(err),
    complete: () => {
      const time = new Date().valueOf() - startTime;

      const minutes = Math.floor(time / 1000 / 60);
      const seconds = Math.round(time / 1000) - minutes * 60;

      console.log();
      console.log(`Data mining finished in ${minutes}:${('0' + seconds).substring(0, 2)} minutes.`);
    },
  });
