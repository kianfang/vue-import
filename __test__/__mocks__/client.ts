import { readFileSync } from 'fs';
import { resolve } from 'path';

const sfc = readFileSync(resolve(__dirname, './demo.vue'), 'utf8');

const data = {};

global.fetch = jest.fn().mockImplementation((_url: string) =>
  Promise.resolve({
    text: () => Promise.resolve(sfc),
    json: () => Promise.resolve(data),
  })
);

global.URL.createObjectURL = jest.fn().mockImplementation(() => "blob:url");
