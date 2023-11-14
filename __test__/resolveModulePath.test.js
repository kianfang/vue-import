import resolveModulePath from '../src/resolveModulePath';

describe('resolveModulePath', () => {
  test ('import of absolute path', () => {
    expect(resolveModulePath("import test from '/test.mjs'", new URL('https://a.b.c/ddd/eee')))
      .toBe("import test from 'https://a.b.c/test.mjs'");

    expect(resolveModulePath("import test from '/test'", new URL('https://a.b.c/ddd/eee')))
      .toBe("import test from 'https://a.b.c/test.js'");

    expect(resolveModulePath('import test from "/test/path/"', new URL('https://a.b.c/ddd/eee')))
      .toBe('import test from "https://a.b.c/test/path/index.js"');
  });

  test('import of current path', () => {
    expect(resolveModulePath("import test from './test'", new URL('https://a.b.c/ddd/eee')))
      .toBe("import test from 'https://a.b.c/ddd/test.js'");

    expect(resolveModulePath("import test from './test.mjs'", new URL('https://a.b.c/ddd/eee')))
      .toBe("import test from 'https://a.b.c/ddd/test.mjs'");

    expect(resolveModulePath("import test from './'", new URL('https://a.b.c/ddd/eee')))
      .toBe("import test from 'https://a.b.c/ddd/index.js'");
  });

  test('import of ancester path', () => {
    expect(resolveModulePath("import test from '../test'", new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe("import test from 'https://a.b.c/ddd/eee/test.js'");

    expect(resolveModulePath("import test from '../test.mjs'", new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe("import test from 'https://a.b.c/ddd/eee/test.mjs'");

    expect(resolveModulePath("import test from '../'", new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe("import test from 'https://a.b.c/ddd/eee/index.js'");

    expect(resolveModulePath("import test from '../../test'", new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe("import test from 'https://a.b.c/ddd/test.js'");

    expect(resolveModulePath("import test from '../../test.mjs'", new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe("import test from 'https://a.b.c/ddd/test.mjs'");

    expect(resolveModulePath('import test from "../../"', new URL('https://a.b.c/ddd/eee/fff/ggg')))
      .toBe('import test from "https://a.b.c/ddd/index.js"');

    expect(resolveModulePath('import test from "../../"', new URL('https://a.b.c/ddd/eee/fff/ggg/')))
      .toBe('import test from "https://a.b.c/ddd/eee/index.js"');
  })

  test('import of http url', () => {
    expect(resolveModulePath("import test from 'http://a.b.c/aaa/bbb.js'", new URL('https://a.b.c/ddd/')))
      .toBe("import test from 'http://a.b.c/aaa/bbb.js'");
  })
})
