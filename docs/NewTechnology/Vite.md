# Vite

## vite构建流程
### 1. 创建server

通过 node 原生的 http 模块创建的 server。同时在 createServer 方法内部，使用了 connect 框架作为中间件。

### 2. 依赖预构建

兼容 CommonJS 和 AMD 模块的依赖（开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。）

减少模块间依赖引用导致过多的请求次数（Vite 将有许多内部模块的 ESM 依赖关系转换为单个模块，以提高后续页面加载性能。）

vite 主要是通过一个内置的 vite:dep-scan esbuild 插件分析依赖项并将其写入一个_metadata.json 文件中，并通过 esbuild插件(esbuildScanPlugin 对 import 语句的扫描，并返回了需要构建的依赖 deps) 将依赖的模块（如将 vue.runtime.esm-bundler.js）打包至.vite 文件中（产生一个 vue.js 和 vue.js.map 文件）

### 3. transformMiddleware

负责拦截处理各种文件的请求并将其内容转换成浏览器能识别的正确代码。

使用一个词法分析利器 es-module-lexer 对源代码进行词法分析，并最终能拿到 main.js 中的语句 import vue from 'vue'中的 vue

调用 reslove 方法最终其会先后调用 vite 内置的两个 plugin：vite:pre-alias 及 vite:resolve
最终在 vite:resolve 内的钩子函数 resolveId 内部调用 tryOptimizedResolve

tryOptimizedResolve 最终会通过读取依赖构建阶段的缓存的依赖映射对象，拿到 vue 对应的路径

## 相对于Webpack的优势
webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。

而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。

由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。

**由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。**

在HMR（热更新）方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。

当需要打包到生产环境时，vite使用传统的rollup（也可以自己手动安装webpack来）进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中（除了vite.config.js里面，这里是node的执行环境）不可以使用CommonJS 。