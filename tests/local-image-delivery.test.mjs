import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { directProductImage, responsiveLocalScene, powerEquipmentImages, zktecoProductImages, fenceProductImages } from '../lib/local-image-policy.mjs';

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

test('Solar hero reuses existing campus renditions and preserves the actual native upper resolution', async () => {
  const src = '/images/solar-engineering/campus-1600.webp';
  const scene = responsiveLocalScene(src);
  assert.equal(scene.width, 1536);
  assert.equal(scene.height, 1024);
  assert.equal(scene.fallback, '/images/solar-engineering/services-campus-640.webp');
  const widths = [];
  for (const entry of scene.srcSet.split(', ')) {
    const [file, descriptor] = entry.split(' ');
    widths.push(parseInt(descriptor));
    assert((await stat('public' + file)).size > 0);
    assert(!file.includes('_next'));
    if (parseInt(descriptor) < 1536) assert(file.startsWith('/images/solar-engineering/services-campus-'));
  }
  assert.deepEqual(widths, [384, 640, 960, 1280, 1536]);
  assert(scene.srcSet.endsWith(src + ' 1536w'));
  // Campus is a responsive scene, never incorrectly classified as a small product.
  assert.equal(directProductImage(src), false);
});

// Compare policies with authoritative reference records, not duplicated model expectations.
test('all forty ZKTeco reference images and eight fence originals have bounded static coverage', async () => {
  const zk = JSON.parse(await readFile('lib/catalogue/zkteco/products.json', 'utf8'));
  const fence = JSON.parse(await readFile('data/electric-fence-equipment-references.json', 'utf8')).models;
  assert.deepEqual(new Set(zktecoProductImages), new Set(zk.flatMap(p => p.images.map(i => i.src))));
  assert.deepEqual(new Set(fenceProductImages), new Set(fence.map(p => p.imagePath)));
  assert.equal(zktecoProductImages.length, 40);
  assert.equal(fenceProductImages.length, 8);
  for (const src of [...zktecoProductImages, ...fenceProductImages]) {
    assert(directProductImage(src), src);
    assert.equal(responsiveLocalScene(src), null);
    assert((await stat('public' + src)).size < 80000, 'Review mobile payload: ' + src);
  }
  for (const src of fenceProductImages) {
    const small = src.replace('-640.webp', '-320.webp');
    assert(directProductImage(small));
    assert((await stat('public' + small)).size > 0);
  }
  for (const src of ['/images/access-control/workplace-1440.webp', '/images/access-control/biotime-dashboard.webp', '/images/access-control/unreviewed.webp', '/assets/electric-fence-products/unreviewed-640.webp']) assert.equal(directProductImage(src), false);
});

test('all known newly covered product callers use the common image policy without a global bypass', async () => {
  for (const file of ['components/catalogue/ReferenceCard.tsx','app/catalogue/zkteco/[slug]/page.tsx','components/premium/access-control/Page.tsx','components/premium/electric-fence/Catalogue.tsx']) {
    const source = await readFile(file,'utf8');
    assert(source.includes('from "@/components/media/ReliableLocalImage"'), file);
    assert(!source.includes('from "next/image"'), file);
  }
  const config = await readFile('next.config.ts','utf8');
  assert(!/unoptimized\s*:\s*true/.test(config));
});

test('ZKTeco model priority artwork has a native matching preload for no-JavaScript streaming', async () => {
  const page = await readFile('app/catalogue/zkteco/[slug]/page.tsx','utf8');
  assert(page.includes('<link rel="preload" as="image" href={p.images[0].src} fetchPriority="high" />'));
});
