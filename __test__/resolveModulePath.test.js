import resolveModulePath from '../src/resolveModulePath';

describe('resolveModulePath', () => {
  test('import of absolute path', () => {
    expect(resolveModulePath("import test from '/test.mjs'", { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/test.mjs'");

    expect(resolveModulePath("import test from '/test'", { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/test.js'");

    expect(resolveModulePath('import test from "/test/path/"', { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe('import test from "https://a.b.c/test/path/index.js"');
  });

  test('import of current path', () => {
    expect(resolveModulePath("import test from './test'", { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/test.js'");

    expect(resolveModulePath("import test from './test.mjs'", { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/test.mjs'");

    expect(resolveModulePath("import test from './'", { base: new URL('https://a.b.c/ddd/eee'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/index.js'");
  });

  test('import of ancester path', () => {
    expect(resolveModulePath("import test from '../test'", { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/eee/test.js'");

    expect(resolveModulePath("import test from '../test.mjs'", { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/eee/test.mjs'");

    expect(resolveModulePath("import test from '../'", { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/eee/index.js'");

    expect(resolveModulePath("import test from '../../test'", { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/test.js'");

    expect(resolveModulePath("import test from '../../test.mjs'", { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe("import test from 'https://a.b.c/ddd/test.mjs'");

    expect(resolveModulePath('import test from "../../"', { base: new URL('https://a.b.c/ddd/eee/fff/ggg'), polyfill: false }))
      .toBe('import test from "https://a.b.c/ddd/index.js"');

    expect(resolveModulePath('import test from "../../"', { base: new URL('https://a.b.c/ddd/eee/fff/ggg/'), polyfill: false }))
      .toBe('import test from "https://a.b.c/ddd/eee/index.js"');
  })

  test('import of http url', () => {
    expect(resolveModulePath("import test from 'http://a.b.c/aaa/bbb.js'", { base: new URL('https://a.b.c/ddd/'), polyfill: false }))
      .toBe("import test from 'http://a.b.c/aaa/bbb.js'");
  })
})
