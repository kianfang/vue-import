/**
 * match module import
 * 
 * eg: 
 * import { some } from './module';
 * const some = await import('./module')
 */
const reg = /import(?:(?:[\w*{},\s]+from\s+)|(?:\())['"](.*)['"]/g;
/**
 * isSpecialPath
 * 
 * eg: 
 * '/some/path'
 * './some/path'
 * '../some/path'
 * 
 * @param {string} path 
 * @returns {boolean}
 */
const isSpecialPath = (path: string): boolean => /^(\.{1,2})?\//.test(path);
/**
 * defaultExtension
 * 
 * eg: 
 * '/some/path' => '/some/path.js'
 * '/some/path/' => '/some/path/index.js'
 * 
 * @param {string} file 
 * @returns {string}
 */
const defaultExtension = (file: string): string => {
  if (/\/$/.test(file)) return `${file}index.js`;
  if (!/\.(\w+)$/.test(file)) return `${file}.js`;
  return file;
}

interface Option {
  base: URL,
  polyfill?: boolean,
}

/**
 * 解析script中的es module导入路径
 * @author kianfang
 * @date 2023-11-14
 * 
 * @param {string} script
 * @param {Option} option
 * @returns {string}
 */
export default function (script: string, option: Option): string {
  const { base, polyfill = true } = option;
  const result = script.replace(reg, (match: string, path: string) => {
    if (isSpecialPath(path)) {
      const url = new URL(path, base)

      return match.replace(path, defaultExtension(url.href))
    }

    return match;
  });

  if (polyfill) {
    // polyfill import.meta.url and import.meta.resolve
    const meta = 'import.meta';
    const prefix = [
      `${meta}.url='${base.href}';`,
      `${meta}._resolve=${meta}.resolve;`,
      `${meta}.resolve=function(m){return (${isSpecialPath.toString()})(m)?(${defaultExtension.toString()})(new URL(m, this.url).href):this._resolve(m)}`,
    ].join('\n');
    return `${prefix}${result}`;
  }

  return result;
}
