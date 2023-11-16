import type { ComponentOptions } from 'vue';
import resolveModulePath from './resolveModulePath';

/**
 * Vue浏览器端SFC加载器 
 * @author kianfang
 * @date 2023-05-10
 * 
 * @see {@link https://github.com/kianfang/vue-import}
 * 
 * @param {string} url 
 * @param {ComponentOptions} props 
 * @returns {ComponentOptions}
 */
export default async function (url: string, props: ComponentOptions = {}): Promise<ComponentOptions> {
  const res = await fetch(url)
  const sfc = await res.text();

  const ele = document.createElement('html');
  ele.innerHTML = sfc;
  const template = ele.querySelector('template')?.innerHTML;
  const styleList = ele.querySelectorAll('style');
  const script = ele.querySelector('script')?.innerHTML;
  let sfcProps: ComponentOptions = {};

  // 1、es module无法从外部js直接获取导出模块
  // 2、import()只支持url导入，这里使用blob url解决
  if (script) {
    const resolvedScript = resolveModulePath(script, { base: new URL(res.url) });
    const blob = new Blob([resolvedScript], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob); 
    const importModule = await import(blobUrl);
    sfcProps = importModule.default;
  }

  const { beforeMount, beforeUnmount, ...loaderProps } = props;
  const component = {
    template,
    ...sfcProps,
    beforeMount() {
      styleList.forEach((style) => {
        document.head.appendChild(style);
      });

      // beforeMount方法重写，这里手动调用
      sfcProps.beforeMount?.call(this);
      beforeMount?.call(this);
    },
    beforeUnmount() {
      styleList.forEach((style) => style.remove());

      // beforeUnmount方法重写，这里手动调用
      sfcProps.beforeUnmount?.call(this);
      beforeUnmount?.call(this);
    },
    ...loaderProps,
  }

  return component;
}
