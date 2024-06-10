// @ts-check
import * as fs from 'fs';
import { createRequire } from 'module';
import fetch from 'node-fetch';
import * as path from 'path';
import { concatMap, forkJoin, from, tap } from 'rxjs';

const require = createRequire(import.meta.url);

const config = require('../src/data.config.json');

console.log();
console.log('Initializing image data miner...');
console.log();

const dataFile = fs.readFileSync(`data/json/hearthstonejson/v1/${config.version}/${config.locale}/cards.json`);
/** @type{Array.<import("../src/app/models/entity.models").Entity>} */
const data = JSON.parse(dataFile.toString());

const cards = data
  .filter(c => (config.cardClasses?.length ? config.cardClasses.some(cardClass => c.cardClass === cardClass) : true))
  .filter(c => (config.cardTypes?.length ? config.cardTypes.some(type => c.type === type) : true))
  .filter(c => (config.cardSets?.length ? config.cardSets.some(set => c.set === set) : true));

const cardsTotal = cards.length;
const startTime = new Date().valueOf();

const basePath = path.join('data', 'img', 'hearthstonejson', 'v1');

fs.mkdir(`${basePath}/collectible/512x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/collectible/256x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/collectible/tile`, { recursive: true }, err => err && console.error(`Folder not created.`));

fs.mkdir(`${basePath}/other/512x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/other/256x`, { recursive: true }, err => err && console.error(`Folder not created.`));
fs.mkdir(`${basePath}/other/tile`, { recursive: true }, err => err && console.error(`Folder not created.`));

console.log('Total cards to process: ' + cardsTotal);
console.log();

from(cards)
  .pipe(
    concatMap(({ id, collectible }, index) =>
      forkJoin([
        fetch(`https://art.hearthstonejson.com/v1/512x/${id}.jpg`).then(res => res.arrayBuffer().then(Buffer.from)),
        fetch(`https://art.hearthstonejson.com/v1/256x/${id}.jpg`).then(res => res.arrayBuffer().then(Buffer.from)),
        fetch(`https://art.hearthstonejson.com/v1/tiles/${id}.jpg`).then(res => res.arrayBuffer().then(Buffer.from)),
      ]).pipe(
        tap(([img512xData, img256xData, imgTileData]) => {
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'other', '512x', `${id}.jpg`), img512xData);
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'other', '256x', `${id}.jpg`), img256xData);
          fs.writeFileSync(path.join(basePath, collectible ? 'collectible' : 'other', 'tile', `${id}.jpg`), imgTileData);

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
