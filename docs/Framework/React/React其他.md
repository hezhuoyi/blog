# React其他

## React16架构
1. **Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler（新）**
2. **Reconciler（协调器）—— 负责找出变化的组件** 会为变化的虚拟DOM打上代表增/删/更新的标记
3. **Renderer（渲染器）—— 负责将变化的组件渲染到页面上** 根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

React16将递归的无法中断的更新重构为异步的可中断更新，由于曾经用于递归的虚拟DOM数据结构已经无法满足需要。于是，全新的Fiber架构应运而生。

## 双缓存Fiber树
React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

即当workInProgress Fiber树构建完成交给Renderer渲染在页面上后，应用根节点的current指针指向workInProgress Fiber树，此时workInProgress Fiber树就变为current Fiber树。

每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。

## 常见问题
### react生命周期
挂载：
1. constructor
2. **static getDerivedStateFromProps**：让 props 能更新到组件内部 state 中，如果props传入的内容不需要影响到你的state，那么就需要返回一个null。（替代componentWillReceiveProps，即使你的props没有任何变化，而是父state发生了变化，导致子组件发生了re-render，这个生命周期函数依然会被调用。）
3. render
4. componentDidMount

更新：
1. **static getDerivedStateFromProps**
2. shouldComponentUpdate
3. render
4. **getSnapshotBeforeUpdate**：在 react 更新 dom 之前调用，此时 state 已更新； 返回值作为 componentDidUpdate 的第3个参数； 一般用于获取 render 之前的 dom 数据。
5. componentDidUpdate

卸载：componentWillUnmount

异常：componentDidCatch

### react执行流程
1. jsx 经过 babel 转变成 render 函数
2. create update：创建一个update实例
3. enqueueUpdate：将update挂载到 根fiber 的 updateQueue 属性上
4. requestWork：判断isBatchingUpdates(立即执行/批处理)/同步/需要调度的任务
4. scheduleWork：开始任务调度 更新 expiration time
5. workLoop大循环：循环执行performUnitOfWork并赋值给workInProgress，直到workInProgress值为空，则中止循环
6. commit阶段 同步更新，不可被打断

### setState 什么时候是同步,什么时候是异步?

**setState 在原生事件和 setTimeout 中都是同步的. 在合成事件和钩子函数中是异步的.**

在 setState 中, 会根据一个 **isBatchingUpdates** 判断是直接更新还是稍后更新, 它的默认值是 false. 但是 React 在调用事件处理函数之前会先调用 batchedUpdates 这个函数, **batchedUpdates 函数 会将 isBatchingUpdates 设置为 true.** 因此, 由 react 控制的事件处理过程, 就变成了异步(批量更新).

### React 事件中为什么要绑定 this 或者要用箭头函数?

这里的 this . 当事件被触发且调用时, 因为 **this 是在运行中进行绑定的this 的值会回退到默认绑定，即值为 undefined**，这是因为类声明和原型方法是以严格模式运行。

我们可以使用 bind 绑定到组件实例上. 而不用担心它的上下文.

因为箭头函数中的 this 指向的是定义时的 this，而不是执行时的 this. 所以箭头函数同样也可以解决.

### useEffect(fn, []) 和 componentDidMount 有什么差异？
useEffect 会捕获 props 和 state。所以即便在回调函数里，你拿到的还是初始的 props 和 state。如果想得到“最新”的值，可以使用 ref。

这是因为javascript闭包的机制，函数组件被调用后，函数内部的state由于被(内部定时器的)回调所依赖，所以没有被垃圾回收机制所清除，而是保存在内存里了。所以等(定时器的)回调执行时，打印的是之前闭包中存储的变量。

### componentWillXXX为什么UNSAFE？
每次父组件更新(render)都会触发当前组件的componentWillRecieveProps。(rn中不会出现 后续跟进原因)
React从Legacy模式迁移到Concurrent模式后，这些钩子的表现会和之前不一致。

### hooks 为什么不能放在条件判断里？
以 useState 为例，在 react 内部，每个组件(Fiber)的 hooks 都是以链表的形式存在 memoizeState 属性中
update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。

### 调用 setState 之后发生了什么？
1. 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2. 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3. 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
4. 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5. 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
6. 当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
7. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

### 为什么 React 元素有一个 $$typeof 属性？
目的是为了防止 XSS 攻击。因为 Symbol 无法被序列化，所以 React 可以通过有没有 $$typeof 属性来断出当前的 element 对象是从数据库来的还是自己生成的。

如果没有 $$typeof 这个属性，react 会拒绝处理该元素。

## React合成事件

React合成事件一套机制：React并不是将click事件直接绑定在dom上面，而是采用**事件冒泡**的形式冒泡到**document**上面，然后**React将事件封装给正式的函数处理运行和处理**。

#### 那么react为什么采取这种事件合成的模式呢？
一方面，将事件绑定在document统一管理，防止很多事件直接绑定在原生的dom元素上。造成一些不可控的情况。

另一方面， React 想实现一个全浏览器的框架， 为了实现这种目标就需要提供全浏览器一致性的事件系统，以此抹平不同浏览器的差异。

#### 合成事件主要过程

一 事件注册：所有事件都会注册到document上，拥有统一的回调函数dispatchEvent来执行事件分发。

二 事件合成：从原生的nativeEvent对象生成合成事件对象，同一种事件类型只能生成一个合成事件Event，如onclick这个类型的事件，dom上所有带有通过jsx绑定的onClick的回调函数都会按顺序（冒泡或者捕获）会放到Event._dispatchListeners 这个数组里，后面依次执行它。

三 事件派发：每次触发事件都会执行根节点上 addEventListener 注册的回调，也就是 ReactEventListener。dispatchEvent 方法，事件分发入口函数。该函数的主要业务逻辑如下：

1. 找到事件触发的 DOM 和 React Component
2. 从该 React Component，调用 findParent 方法，遍历得到所有父组件，存在数组中。
3. 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法，执行，详细过程为：
4. 根据 DOM 事件构造 React 合成事件。
5. 将合成事件放入队列。
6. 批处理队列中的事件（包含之前未处理完的，先入先处理）

**React合成事件的冒泡并不是真的冒泡，而是节点的遍历。**

### React在事件处理的优点
1. 几乎所有的事件代理(delegate)到 document ，达到性能优化的目的
2. 对于每种类型的事件，拥有统一的分发函数 dispatchEvent
3. 事件对象(event)是合成对象(SyntheticEvent)，不是原生的，其具有跨浏览器兼容的特性
4. react内部事件系统实现可以分为两个阶段: 事件注册、事件分发，几乎所有的事件均委托到document上，而document上事件的回调函数只有一个:ReactEventListener.dispatchEvent，然后进行相关的分发
5. 对于冒泡事件，是在 document 对象的冒泡阶段触发。对于非冒泡事件，例如focus，blur，是在 document 对象的捕获阶段触发，最后在 dispatchEvent 中决定真正回调函数的执行

### React合成事件理解

如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

（SyntheticEvent，跨浏览器原生事件包装器。 它具有与浏览器原生事件相同的接口）

1. 当用户在为onClick添加函数时，React并没有将Click事件绑定在DOM上面。
2. 而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
3. 所以当事件触发的时候，对使用统一的分发函数dispatchEvent将指定函数执行

## Hooks的闭包陷阱

- React Hooks只能用于函数组件，而每一次函数组件被渲染，都是一个全新的开始；
- 每一个全新的开始，所有的局部变量全都重来，全体失忆；
- 每一次全新的开始，只有Hooks函数（比如useEffect）具有上一次渲染的“记忆”；

起因：`useEffect` 是异步执行的，他要在 React 走完本次更新之后才会执行解绑以及重新绑定的函数。

### 使用 `useLayoutEffect`

`useLayoutEffect` 可以看作是 `useEffect` 的**同步版本**。使用 `useLayoutEffect` 就可以达到我们上面说的，在同一次更新流程中解绑 `interval` 的目的。

### 不使用 `useLayoutEffect`

逃出闭包 => useReducer的 **state 不来自于闭包**，state 是作为参数传入到 Reducer 中的，也就是不论何时我们调用了 ，dispatch，在 Reducer 中得到的 State 都是最新的，这就帮助我们避开了闭包的问题。

## Vue和React对比

### 框架设计思路
1. 原生 VS 抽象 
原生的就是 JavaScript 本身，React 需要理解 Component， State， Hooks， JSX 等概念就可以上手了，抽象比较多的就是 Angular，上手就需要了解十几个概念，学习曲线很陡峭， Vue 就处在 React 和 Angular 中间，了解完 data，methods，单文件组件后就可以上手了

2. 运行时 VS 预编译
所谓运行时，在浏览器内存里进行的任务，React 的 Runtime 比较重一些，数据发生变化后，并没有直接去操作 dom，而是生成一个新的虚拟 dom，并且通过 diff 算法得出最小的操作行为，全部都是在运行时来做的
这个维度的另外一个极端，也就是重编译的框架，在上线之前经过通过工程化的方式做了预处理，典型代表就是Svelte，基本上是一个 Compiler Framework，写的是模板和数据，经过处理后，基本解析成了原生的 dom 操作，Svelte 的性能也是最接近原生 js 的
Vue 依然处于比较中庸的地位，在运行时和预编译取了一个很好地权衡，保留了虚拟 dom，通过响应式控制虚拟 dom 的颗粒度，在预编译里又做了足够多的性能优化，做到了按需更新

在 Vue 和 React 中的体现，主要体现在 JSX 和 template 的区别上，React 是完全的 JSX，可以 JSX 在里面写 JavaScipt，所以特点就是足够的动态，与之对应的就是 Vue 的 template，template 的特点是语法受限，可以执行的语法技术 v-if v-for 等指定的语法，虽然不够动态，但是由于语法是可便利的，所以可以再预编译层面做更多的预判，让 Vue 在运行时有更好的性能

3. 可变数据 VS 不可变数据
Vue1 就是把响应式数据玩出了花，通过拦截操作，修改一个数据的同时收集依赖，然后数据修改的时候去通知更新 dom，体验很是舒爽，我们修改了一个 JavaScript 的对象，视图层就修改好了， 这是 Vue 的黑魔法，React 的虚拟 Dom 创建初期，就是通过计算新老数据的 diff，去决定操作那些 dom，所以每次修改数据，需要生成一份新的数据，说不上优劣之分，只不过路线不同

4. 权衡
随着应用越来越复杂，React15 架构中，dom diff 的时间超过 16.6ms，就可能会让页面卡顿，Vue1 中的监听器过多，也会让性能雪崩，为了解决这个问题，Vue 选择了权衡，以组件作为颗粒度，组件层面用响应式通知，组件内部通过 dom diff 计算 ，既控制了应用内部 Watcher 的数量，也控制了 dom diff 的量级。

5. 时间切片
Vue3 通过静态标记 + 响应式 + 虚拟 dom 的方式，控制了 diff 的颗粒度，让 diff 的时间不会超过 16ms，但是 React 自上而下的 diff 过程，项目大了之后，一旦 diff 的时间超过 16.6ms，就会造成卡顿，对此 React 交出的解决方案就是时间切片
简单的来说就是把 diff 的任务按照元素拆开，利用浏览器的空闲时间去算 diff，React 把各种优化的策略都留给了开发者，Vue 则是帮开发者做了很多优化的工作

6. 组合优于集成
现在 hooks 和 composition 大行其道的原因，代码写出来也会更加易于维护，这个图可以很好地体现出可维护性上的变化

7. 跨端
Svelte 可以做到直接编译成 JavaScript，性能接近原生，这么优秀的思想，为什么 Vue 还要保留虚拟 dom 这个额外的 runtime 损耗呢，我觉得比较重要的一个答案就是跨端，虚拟 dom 除了可以用来计算最小的 diff 之外，另外一个重要的功能就是可以用 JavaScript 的对象来去描述一个 dom，这就是一个普通的对象，在跨端领域意义重大，视图层返回的是一个对象，渲染层可以调用不同平台的渲染 api 去绘制即可

### 不同之处

**Vue 使用的是 web 开发者更熟悉的模板与特性**，Vue的API跟传统web开发者熟悉的模板契合度更高，比如Vue的单文件组件是以模板+JavaScript+CSS的组合模式呈现，它跟web现有的HTML、JavaScript、CSS能够更好地配合。**React 的特色在于函数式编程的理念和丰富的技术选型**。Vue 比起 React 更容易被前端工程师接受，这是一个直观的感受；React 则更容易吸引在 FP 上持续走下去的开发者。

从**使用习惯和思维模式**上考虑，对于一个没有任何Vue和React基础的web开发者来说， **Vue会更友好**，更符合他的思维模式。React对于拥有**函数式编程背景的开发者**以及一些并不是以web为主要开发平台的开发人员而言，React更容易接受。可以说，**Vue更加注重web开发者的习惯**。

**实现上，Vue跟React的最大区别在于数据的reactivity，就是反应式系统上。**

**监听数据变化的实现原理不同** 依赖收集 vs 显式调用

**数据流的不同** 双向绑定 vs 单向数据流

**模板渲染方式的不同**  拓展的HTML语法 vs 原生JS实现模板 jsx

**渲染过程不同** 会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树 vs 全部子组件都会重新渲染

**react遵循的是数据的不可变性，永远不在原对象上修改属性，也无法使用 Object.defineProperty 或 Proxy等语法进行响应式的依赖收集机制，因为会返回新的对象。所以React 每次只能递归的把所有子组件都重新render一遍。**