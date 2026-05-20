import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'anf',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/anf/',
  mode: 'site',
  base: '/anf',
  headScripts: [
    `
    (function() {
      var style = document.createElement('style');
      style.textContent = 'pre[class*="language-"]{white-space:pre-wrap!important;word-break:break-word!important}code{white-space:pre-wrap!important;word-break:break-word!important}';
      document.head.appendChild(style);
    })();
    `
  ],
  // more config: https://d.umijs.org/config
});
