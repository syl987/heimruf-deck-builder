// @ts-check

import * as fs from 'fs';
import fetch from 'node-fetch';
import * as path from 'path';
import { concatMap, forkJoin, from, tap } from 'rxjs';

import config from '../src/app.config.json' assert { type: 'json ' };

console.log();
console.log('Initializing image data miner...');
console.log();

const dataFile = fs.readFileSync(`data/json/hearthstonejson/v1/${config.version}/${config.locale}/cards.json`);
const data = JSON.parse(dataFile.toString());

const cards = data
  .filter(card => (config.cardClasses?.length ? config.cardClasses.some(cardClass => card.cardClass === cardClass) : true))
  .filter(card => (config.cardTypes?.length ? config.cardTypes.some(type => card.type === type) : true))
  .filter(card => (config.cardSets?.length ? config.cardSets.some(set => card.set === set) : true));

const cardsTotal = cards.length;
const startTime = new Date().valueOf();

const basePath = path.join('data', 'img', 'hearthstonejson', 'v1');

fs.mkdir(`${basePath}/collectible/512x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/collectible/256x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/collectible/tile`, { recursive: true }, err => err && console.error(`Folder not created.`));

fs.mkdir(`${basePath}/misc/512x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/misc/256x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/misc/tile`, { recursive: true }, err => err && console.error(`Folder not created.`));

console.log('Total cards to process: ' + cardsTotal);
console.log();

from(cards)
  .pipe(
    concatMap(({ id, collectible }, index) =>
      forkJoin([
        fetch(`https://art.hearthstonejson.com/v1/512x/${id}.jpg`).then(res => res.buffer()),
        fetch(`https://art.hearthstonejson.com/v1/256x/${id}.jpg`).then(res => res.buffer()),
        fetch(`https://art.hearthstonejson.com/v1/tiles/${id}.jpg`).then(res => res.buffer()),
      ]).pipe(
        tap(([img512x, img256x, tile]) => {
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'misc', '512x', `${id}.jpg`), img512x);
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'misc', '256x', `${id}.jpg`), img256x);
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'misc', 'tile', `${id}.jpg`), tile);

          const percent = ((index + 1) * 100) / cardsTotal;

          console.log(`Downloaded: ${id} (${index + 1} / ${cardsTotal} - ${percent.toFixed(0)}%)`);
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
