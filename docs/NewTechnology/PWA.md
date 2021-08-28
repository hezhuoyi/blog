# PWA

## 渐进式Web应用程序

**渐进式**：

- 第一步，应该是安全，将全站 HTTPS 化，因为这是 PWA 的基础，没有 HTTPS，就没有 Service Worker
- 第二步，应该是 Service Worker 来提升基础性能，离线提供静态文件，把用户首屏体验提升上来
- 第三步，App Manifest，这一步可以和第二步同时进行
- 后续，再考虑其他的特性，离线消息推送等

**PWA 本质上是 Web App，借助一些新技术也具备了 Native App 的一些特性，兼具 Web App 和 Native App 的优点。**

PWA应用的超前的体验方式已经可以开始使用，这是它的优点。

- 极其可靠的：PWA应用 拥有极其快速的载入速度，即便是在离线无网络的环境下也不会出现网络异常。
- 它的响应非常的迅速并且拥有丝滑流畅的动画，绝对不会出现异常卡顿滑动。
- 你会感觉就像在使用一个原生应用，并且拥有它会提供给你沉浸式的用户体验。

由以下几种技术构成：

- **App Manifest**
- **Service Worker**
- **Notifications API**
- **Push API**

Manifest是一个JSON格式的文件，你可以把它理解为一个指定了Web App桌面图标、名称、开屏图标、运行模式等一系列资源的一个清单。

> manifest 的目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验。 —— MDN

## Service Worker
其中Service Worker是PWA技术的关键，它们可以让app满足上面的三基准。其他技术则是锦上添花，让app更加的强大。

在Web Worker的基础上，W3C新增了service worker来满足我们持久化的需求。其生命周期与页面无关，关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动功能。

Service Worker虽然满足了离线缓存来，其功能可不仅仅局限于此。 可以提供

- **丰富的离线体验，**
- **周期的后台同步，**
- **消息推送通知，**
- **拦截和处理网络请求，**
- **管理资源缓存**
  这些正好也是PWA的目的，所以说Service Worker是PWA的关键技术。

**Service Worker本质上也是浏览器缓存资源用的，只不过他不仅仅是cache，也是通过worker的方式来进一步优化。他基于h5的web worker，所以绝对不会阻碍当前js线程的执行**，sw最重要的工作原理就是

1、**后台线程**：独立于当前网页线程；

2、**网络代理**：在网页发起请求时代理，来缓存文件；

1. 它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用。
2. 出于安全考量，Service Worker 只能使用在 https 或本地的 localhost 环境下。
3. 不同于Web Worker，Service Worker 是一个进程而不是线程，其生命周期与页面无关（关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动），且可以被多个页面公用。

## Web Worker
JavaScript是单线程的，JS和UI更新共享同一个进程的部分原因是它们之间互访频繁，但由于共享同一个进程也就会造成js代码在运行的时候用户点击界面元素而没有任何响应这样的情况，有一种方法可以打破 与浏览器渲染线程同步的 代码执行。

我们可以将一些代码挪到另一个不同的线程。一旦进入不同的线程，我们就可以任由 持续运行的 JavaScript 代码 阻塞，而不需要接受 代码分割 和 出让控制权 所带来的 复杂度 和 成本。使用这种方法，渲染进程甚至都不会注意到另一个线程在执行阻塞任务。在 Web 上实现这一点的 API就是 Web Worker。通过传入一个独立的 JavaScript 文件路径 就可以 创建一个 Web Worker，而这个文件将在新创建的线程里加载和运行。

Worker 和 主线程互不干扰，通常用于替主线程分担计算密集型任务，防止主线程中JS执行时阻塞UI。

Worker本身也会耗费资源，因此一旦使用完毕，就应该分别使用terminate和close方法关闭。

所以**Web Worker适合于那些纯数据的，或者说与浏览器UI没关系的长运行脚本。**
### 优势
1. 可以加载一个JS进行大量的复杂计算而不挂起主进程，并通过postMessage，onmessage进行通信，使用ternimate方法停止工作
2. 可以在worker中通过importScripts(url)加载另外的脚本文件

### 缺点
1. 不能跨域加载JS
2. worker内代码不能访问DOM
3. 因为它是html5中新的API，所以各个浏览器支持都不一样

### 对比
1. ServiceWorker 是一个 短期的 ，运行在 独立线程里的 JavaScript 作用域，作为一个 代理（proxy）处理 同源页面中发出的所有网络请求。最重要的一点，你能通过使用 Service Worker 来实现任意的复杂缓存逻辑。除此之外，你也可以利用 Service Worker 进一步实现 后台长请求，消息推送 和 其他那些无需关联特定页面的功能。它挺像 Web Worker 的，但是不同点在于 Service Worker 有一个特定的目的 和 额外的约束。

2. Worklet 是一个 API 收到严格限制的 独立 JavaScript 作用域，它可以选择是否运行在独立的线程上。Worklet 的重点在于，浏览器可以在线程间移动 Worklet。AudioWorklet，CSS Painting API 和 Animation Worklet 都是 Worklet 应用的例子。

3. SharedWorker 是特殊的 Web Worker，同源的多个 Tab 和 窗口可以引用同一个 SharedWorker。这个 API 几乎不可能通过 polyfill 的方式使用，而且目前只有 Blink 实现过。