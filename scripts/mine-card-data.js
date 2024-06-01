// @ts-check
import * as fs from 'fs';
import fetch from 'node-fetch';
import * as path from 'path';
import { concatMap, forkJoin, from, tap } from 'rxjs';

import config from '../src/data.config.json' assert { type: 'json ' };

console.log();
console.log('Initializing card data miner...');
console.log();

const startTime = new Date().valueOf();

const basePath = path.join('data', 'json', 'hearthstonejson', 'v1', config.version);

fs.mkdir(`${basePath}/all`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/${config.locale}`, { recursive: true }, err => err && console.error(`Folder not created.`));

from(['all', config.locale])
  .pipe(
    concatMap((locale, index) =>
      forkJoin([
        fetch(`https://api.hearthstonejson.com/v1/${config.version}/${locale}/cards.collectible.json`).then(res => res.arrayBuffer().then(Buffer.from)),
        fetch(`https://api.hearthstonejson.com/v1/${config.version}/${locale}/cards.json`).then(res => res.arrayBuffer().then(Buffer.from)),
      ]).pipe(
        tap(([all, localized]) => {
          fs.writeFileSync(path.join(basePath, locale, 'cards.collectible.json'), all);
          fs.writeFileSync(path.join(basePath, locale, 'cards.json'), localized);

          console.log(`Downloaded: ${locale} JSON data (${index + 1} / ${2})`);
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
