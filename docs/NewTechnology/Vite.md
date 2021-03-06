# Vite

## 简介
Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

![bundle](../.vuepress/public/images/vite-normal.png)

![esm](../.vuepress/public/images/vite-esm.png)

可以看到，Webpack 启动后会做一堆事情，经历一条很长的编译打包链条，从入口开始需要逐步经历语法解析、依赖收集、代码转译、打包合并、代码优化，最终将高版本的、离散的源码编译打包成低版本、高兼容性的产物代码，这可满满都是 CPU、IO 操作啊，在 Node 运行时下性能必然是有问题。

而 Vite 运行 Dev 命令后只做了两件事情，一是启动了一个用于承载资源服务的 service；二是使用 esbuild 预构建 npm 依赖包。之后就一直躺着，直到浏览器以 http 方式发来 ESM 规范的模块请求时，Vite 才开始“「按需编译」”被请求的模块。

## 特性
1. 预编译：npm 包这类基本不会变化的模块，使用 Esbuild 在 「预构建」 阶段先打包整理好，减少 http 请求数
2. 按需编译：用户代码这一类频繁变动的模块，直到被使用时才会执行编译操作
3. 客户端强缓存：请求过的模块会被以 http 头 max-age=31536000,immutable 设置为强缓存，如果模块发生变化则用附加的版本 query 使其失效
4. 产物优化：相比于 Webpack ，Vite 直接锚定高版本浏览器，不需要在 build 产物中插入过多运行时与模板代码
5. 内置更好的分包实现：不需要用户干预，默认启用一系列智能分包规则，尽可能减少模块的重复打包
6. 更好的静态资源处理：Vite 尽量避免直接处理静态资源，而是选择遵循 ESM 方式提供服务，例如引入图片 import img from 'xxx.png' 语句，执行后 img 变量只是一个路径字符串。

## 构建流程
### 1. 创建server

通过 node 原生的 http 模块创建的 server。同时在 createServer 方法内部，使用了 connect 框架作为中间件。

### 2. 依赖预构建

兼容 CommonJS 和 AMD 模块的依赖（开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。）

减少模块间依赖引用导致过多的请求次数（Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。）

vite 主要是通过一个内置的 vite:dep-scan **esbuild** 插件分析依赖项并将其写入一个_metadata.json 文件中，并通过 esbuild插件(esbuildScanPlugin 对 import 语句的扫描，并返回了需要构建的依赖 deps) 将依赖的模块（如将 vue.runtime.esm-bundler.js）打包至.vite 文件中（产生一个 vue.js 和 vue.js.map 文件）

### 3. transformMiddleware

负责拦截处理各种文件的请求并将其内容转换成浏览器能识别的正确代码。

使用一个词法分析利器 es-module-lexer 对源代码进行词法分析，并最终能拿到 main.js 中的语句 import vue from 'vue'中的 vue

调用 reslove 方法最终其会先后调用 vite 内置的两个 plugin：vite:pre-alias 及 vite:resolve
最终在 vite:resolve 内的钩子函数 resolveId 内部调用 tryOptimizedResolve

tryOptimizedResolve 最终会通过读取依赖构建阶段的缓存的依赖映射对象，拿到 vue 对应的路径

## 相对于Webpack的优势
webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。

(webpack打包原理:1.先逐级递归识别依赖，构建依赖图谱 2.将代码转化成AST抽象语法树 3.在AST阶段中去处理代码 4.把AST抽象语法树变成浏览器可以识别的代码，然后输出)

而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。

由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。

**由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。**

在HMR（热更新）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。

当需要打包到生产环境时，vite使用传统的rollup（也可以自己手动安装webpack来）进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中（除了vite.config.js里面，这里是node的执行环境）不可以使用CommonJS 。

## 关于 Esbuild
esbuild 是新一代的 JavaScript 打包工具。

esbuild以速度快而著称，耗时只有 webpack 的 2% ～3%。

esbuild 项目主要目标是: 开辟一个构建工具性能的新时代，创建一个易用的现代打包器。

### 为什么 esbuild 这么快 ？
1. 它是用 Go 语言编写的，并可以**编译为本地代码**(纯机器码)，这肯定要比JIT快。

2. **大量使用了并行操作。**

js是单线程串行，esbuild是新开一个进程，然后多线程并行，充分发挥多核优势。

esbuild 中的算法经过精心设计，可以充分利用CPU资源，其中解析，生成最终打包文件和生成 source maps 的操作全部完全并行化。

3. 代码都是自己写的， **没有使用第三方依赖**。从一开始就牢记性能，可以确保所有内容都使用一致的数据结构来避免昂贵的转换。

4. **内存的高效利用。**

以提高编译速度为编写代码时的第一原则，并尽量避免不必要的内存分配。

如果要处理大量数据，内存访问速度可能会严重影响性能。对数据进行的遍历次数越少（将数据转换成数据所需的不同表示形式也就越少），编译器就会越快。esbuild 仅触及整个JavaScript AST 3次。

## 缺点
为了保证 esbuild 的编译效率，esbuild 没有提供 AST 的操作能力。所以一些通过 AST 处理代码的 babel-plugin 没有很好的方法过渡到 esbuild 中。

prod环境的构建，目前用的Rollup，原因在于esbuild对于css和代码分割不是很友好。

目前生态一般，完全比不上webpack。