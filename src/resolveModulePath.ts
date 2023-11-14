const reg = /import[\w*{},\s]+from\s+(?:(?:['"](.*)['"]))/g;

/**
 * 解析script中的es module导入路径
 */
export default (script: string, baseUrl: URL) => {
  const result = script.replace(reg, (match: string, path: string) => {
    if (['./', '../', '/'].some((prefix) => path.startsWith(prefix))) {
      const url = new URL(path, baseUrl)

      return match.replace(path, defaultExtension(url.href))
    }

    return match;
  });

  return result;
}

function defaultExtension(file: string) {
  if (/\/$/.test(file)) {
    return `${file}index.js`;
  } else if (!/\.(\w+)$/.test(file)) {
    return `${file}.js`;
  }

  return file;
}