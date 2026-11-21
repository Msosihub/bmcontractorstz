import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { bundle } from './helpers.mjs';
const component = await bundle('app/services/generators/GeneratorBrandBelts.tsx', {
  './generator-brands.css': '',
  'next/image': "import React from 'react';export default function Image({unoptimized,...p}){void unoptimized;return React.createElement('img',p)}",
});
test('generator belt includes only approved brand identities and relevant existing equipment anchors', async () => {
  const brands = JSON.parse(await readFile('data/generator-brands.json'));
  const equipment = JSON.parse(await readFile('data/generator-engineering.json')).equipment;
  assert.deepEqual(brands.map(x => x.name), ['Cummins', 'Perkins', 'Deep Sea Electronics', 'ComAp']);
  for (const brand of brands) {
    assert(equipment.some(x => '#ge-' + x.id === brand.href));
    const bytes = await readFile('public/images/generator-engineering/brands/' + brand.image);
    assert(bytes.length > 500);
    if (brand.image.endsWith('.svg')) assert.doesNotMatch(bytes.toString(), /<script|onload=|<foreignObject/i);
  }
  for (const lang of ['en', 'sw']) {
    const html = renderToStaticMarkup(component.GeneratorBrandBelts({ lang }));
    assert(html.includes('id="ge-brands-title"'));
    assert(html.includes('data-bm-belt'));
    assert(html.includes('inert=""'));
    assert(html.includes('aria-hidden="true"'));
    assert(html.includes('aria-pressed="false"'));
    assert(!html.includes('type="checkbox"'));
    assert(!/authorised dealer|authorized distributor|our partners|official partnership/i.test(html));
    for (const brand of brands) assert(html.includes(brand.href));
  }
});
test('brand-belt motion has a seamless seam, native static fallback and scoped pause paths', async () => {
  const css = await readFile('app/services/generators/generator-brands.css', 'utf8');
  for (const text of ['translateX(calc(-50% - 8px))', 'data-bm-in-view', 'data-paused', ':focus-within', 'data-bm-hidden', 'prefers-reduced-motion']) assert(css.includes(text));
  assert(css.includes('ul[aria-hidden]'));
  const control = await readFile('app/services/generators/BrandBeltControl.tsx', 'utf8');
  assert(control.includes('aria-pressed'));
  assert(control.includes('toggleAttribute("data-paused", next)'));
  assert(!control.includes('setInterval'));
});
