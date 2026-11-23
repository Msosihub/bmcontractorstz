import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { directProductImage, responsiveLocalScene, powerEquipmentImages } from '../lib/local-image-policy.mjs';

test('all reviewed manufacturer product assets use bounded static delivery and stay small', async () => {
  for (const dir of ['assets/gate-automation/products', 'images/hikvision']) {
    const files = (await readdir('public/' + dir)).filter(name => name.endsWith('.webp') && (dir.includes('gate-automation') || name.startsWith('ds-')));
    assert(files.length > 10);
    for (const file of files) {
      const src = '/' + dir + '/' + file;
      assert(directProductImage(src), src);
      assert((await stat('public' + src)).size < 80000, 'Reassess oversized product delivery: ' + src);
    }
  }
});
test('unrelated catalogues, remote content, uploads and unreviewed scenes retain their original policy', () => {
  for (const src of ['/images/hikvision/courtyard.webp', '/assets/zkteco/f18.webp', '/uploads/photo.webp', 'https://example.com/images/hikvision/ds-test.webp', '/assets/gate-automation/products/../../private.webp']) {
    assert.equal(directProductImage(src), false);
    assert.equal(responsiveLocalScene(src), null);
  }
});
test('responsive scenes reference real static files with ordered widths and preserved original fallback', async () => {
  for (const src of ['/images/hikvision/building.webp', '/images/hikvision/reception.webp']) {
    const scene = responsiveLocalScene(src);
    assert(scene.width > 0 && scene.height > 0);
    assert(scene.srcSet.includes(src + ' '));
    let previous = 0;
    for (const entry of scene.srcSet.split(', ')) {
      const [path, descriptor] = entry.split(' '), width = parseInt(descriptor);
      assert(width > previous); previous = width;
      assert((await readFile('public' + path)).length > 0);
      assert(!path.includes('_next'));
    }
    assert(scene.srcSet.includes(scene.fallback + ' 640w'));
  }
});

test('confirmed power equipment failures use one small-image policy without including power scene photography', async () => {
  assert.equal(powerEquipmentImages.length, 14);
  for (const src of powerEquipmentImages) {
    assert(directProductImage(src));
    assert((await stat('public' + src)).size < 80000);
  }
  for (const src of ['/images/generator-engineering/engineering-hero.webp', '/images/solar-engineering/campus-1600.webp', '/images/power-backup/workplace-1600.webp']) assert.equal(directProductImage(src), false);
});
