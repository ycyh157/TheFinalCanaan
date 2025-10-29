# 升级包：门户《？？？……》逐句显现 / 打字机效果
把首页（#portal）升级为逐句显现。你只要：
1. 复制 `content/portal.json` 到你的仓库 `content/`；
2. 复制 `assets/css/portal-typing.css` 到 `assets/css/`；
3. 打开你的 `assets/js/app.js`，将 portal 分支替换为：
   ```js
   if(path==='portal'){ return renderPortal(container); }
   ```
   并在文件**底部**加入一行：
   ```html
   <script src="assets/js/portal_typing.js"></script>
   ```
   （或把 `renderPortal` 函数粘贴进你的 app.js）

可视化编辑：在 StackEdit 里改 `content/portal.json` 里的 `lines` 文案、`speedChar` 和 `speedLine` 即可。