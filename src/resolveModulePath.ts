/**
 * match module import
 * 
 * eg: 
 * import { some } from './module';
 * const some = await import('./module')
 */
const reg = /import(?:(?:[\w*{},\s]+from\s+)|(?:\())['"](.*)['"]/g;
const defaultExtension = (file: string) => {
  if (/\/$/.test(file)) {
    return `${file}index.js`;
  }
  if (!/\.(\w+)$/.test(file)) {
    return `${file}.js`;
  }
  return file;
}

/**
 * 解析script中的es module导入路径
 * @author kianfang
 * @date 2023-11-14
 * 
 * @param {string} script
 * @param {URL} baseUrl
 * @returns {string}
 */
export default function (script: string, option: {
  base: URL,
  polyfill?: boolean,
}): string {
  const { base, polyfill } = option;
  const isSpecialPath = (path: string) => ['./', '../', '/'].some((prefix) => path.startsWith(prefix));
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
