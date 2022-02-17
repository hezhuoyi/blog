(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4178],{780:(n,l,e)=>{"use strict";e.r(l),e.d(l,{data:()=>a});const a={key:"v-54fb0807",path:"/Framework/React/Fiber.html",title:"Fiber",lang:"zh-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Fiber架构",slug:"fiber架构",children:[]},{level:2,title:"关于时间切片",slug:"关于时间切片",children:[{level:3,title:"实现一个时间切片：将长任务分解成更小的任务，避免阻塞主进程。",slug:"实现一个时间切片-将长任务分解成更小的任务-避免阻塞主进程。",children:[]}]},{level:2,title:"React的diff",slug:"react的diff",children:[{level:3,title:"1. 同层比对策略",slug:"_1-同层比对策略",children:[]},{level:3,title:"2. 唯一标识策略",slug:"_2-唯一标识策略",children:[]},{level:3,title:"3. 组件模式策略",slug:"_3-组件模式策略",children:[]},{level:3,title:"实践建议",slug:"实践建议",children:[]},{level:3,title:"diff 策略",slug:"diff-策略",children:[]},{level:3,title:"tree diff",slug:"tree-diff",children:[]},{level:3,title:"component diff",slug:"component-diff",children:[]},{level:3,title:"element diff",slug:"element-diff",children:[]},{level:3,title:"vue和react的diff算法的区别",slug:"vue和react的diff算法的区别",children:[]}]},{level:2,title:"优化策略",slug:"优化策略",children:[{level:3,title:"1. 异步化:",slug:"_1-异步化",children:[]},{level:3,title:"2. 任务分割",slug:"_2-任务分割",children:[]}]}],filePathRelative:"Framework/React/Fiber.md"}},4452:(n,l,e)=>{"use strict";e.r(l),e.d(l,{default:()=>rl});var a=e(6252);const t=e.p+"assets/img/time-slicing.06d6ac63.png",s=(0,a.Wm)("h1",{id:"fiber",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#fiber","aria-hidden":"true"},"#"),(0,a.Uk)(" Fiber")],-1),m=(0,a.Wm)("p",null,"背景: 由于浏览器它将 GUI 描绘，时间器处理，事件处理，JS 执行，远程资源加载统统放在一起。如果执行 js 的更新， 占用了太久的进程就会导致浏览器的动画没办法执行，或者 input 响应比较慢。",-1),r=(0,a.Wm)("p",null,"react fiber 使用了 2 个核心解决思想:",-1),u=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"让渲染有优先级")]),(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"可中断 React Fiber 将虚拟 DOM 的更新过程划分两个阶段"),(0,a.Uk)("，reconciler 调和阶段与 commit 阶段.")])],-1),o=(0,a.Wm)("p",null,"一次更新过程会分为很多个分片完成, 所以可能一个任务还没有执行完, 就被另一个优先级更高的更新过程打断, 这时候, 低优先级的工作就完全作废, 然后等待机会重头到来.",-1),W=(0,a.Wm)("h4",{id:"调度的过程",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#调度的过程","aria-hidden":"true"},"#"),(0,a.Uk)(" 调度的过程")],-1),i=(0,a.Wm)("p",null,[(0,a.Uk)("requestIdleCallback："),(0,a.Wm)("strong",null,"首先 react 会根据任务的优先级去分配各自的过期时间"),(0,a.Uk)(". requestIdleCallback 在每一帧的多余时间(黄色的区域)调用. 调用 channel.port1.onmessage , 先去判断当前时间是否小于下一帧时间, 如果小于则代表我们"),(0,a.Wm)("strong",null,"有空余时间去执行任务"),(0,a.Uk)(", 如果大于就去执行过期任务,如果任务没过期. 这个任务就被丢到"),(0,a.Wm)("strong",null,"下一帧执行"),(0,a.Uk)("了.由于 requestIdleCallback 的兼容性问题, react 自己实现了一个 requestIdleCallback")],-1),k=(0,a.Wm)("h2",{id:"fiber架构",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#fiber架构","aria-hidden":"true"},"#"),(0,a.Uk)(" Fiber架构")],-1),c=(0,a.Wm)("p",null,[(0,a.Uk)("React Fiber是对React来说是一次革命，解决了React项目严重依赖于手工优化的痛点，"),(0,a.Wm)("strong",null,"通过系统级别的时间调度，实现划时代的性能优化"),(0,a.Uk)("。")],-1),d=(0,a.Wm)("p",null,[(0,a.Uk)("JavaScript 是单线程运行的，同时只能做一件事情，这个和 "),(0,a.Wm)("code",null,"DOS"),(0,a.Uk)(" 的单任务操作系统一样的，事情只能一件一件的干。要是前面有一个傻叉任务长期霸占CPU，后面什么事情都干不了，浏览器会呈现卡死的状态，这样的用户体验就会非常差。对于’前端框架‘来说，解决这种问题有三个方向:")],-1),p=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Uk)("1️⃣ "),(0,a.Wm)("strong",null,"优化每个任务，让它有多快就多快。挤压CPU运算量")]),(0,a.Wm)("li",null,[(0,a.Uk)("2️⃣ "),(0,a.Wm)("strong",null,"快速响应用户"),(0,a.Uk)("，让用户觉得够快，不能阻塞用户的交互")]),(0,a.Wm)("li",null,[(0,a.Uk)("3️⃣ 尝试 "),(0,a.Wm)("strong",null,"Worker 多线程")])],-1),U=(0,a.Uk)("Vue 选择的是第1️⃣, 因为对于Vue来说，使用"),f=(0,a.Wm)("code",null,"模板",-1),h=(0,a.Uk)("让它有了很多优化的空间(比如静态节点的分析)，配合响应式机制可以让Vue可以精确地进行节点更新, 读者可以去看一下"),g={href:"https://www.yuque.com/vueconf/2019/gwn1z0",target:"_blank",rel:"noopener noreferrer"},b=(0,a.Uk)("今年Vue Conf 尤雨溪的演讲"),v=(0,a.Uk)("，非常棒!；而 React 选择了2️⃣ 。对于Worker 多线程渲染方案也有人尝试，要保证状态和视图的一致性相当麻烦。"),w=(0,a.Wm)("p",null,[(0,a.Uk)("为什么需要引入Fiber => "),(0,a.Wm)("strong",null,"React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们, 一气呵成"),(0,a.Uk)("。(Reconcilation)，此期间React 会霸占着浏览器资源，一则会"),(0,a.Wm)("strong",null,"导致用户触发的事件得不到响应, 二则会导致掉帧"),(0,a.Uk)("，用户可以感知到这些卡顿。")],-1),x=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"为了给用户制造一种应用很快的'假象'，我们不能让一个程序长期霸占着资源. 你可以将浏览器的渲染、布局、绘制、资源加载(例如HTML解析)、事件响应、脚本执行视作操作系统的'进程'，我们需要通过某些调度策略合理地分配CPU资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率"),(0,a.Uk)("。")],-1),R=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"所以 React 通过Fiber 架构，让自己的Reconcilation 过程变成可被中断。 '适时'地让出CPU执行权，除了可以让浏览器及时地响应用户的交互，还有其他好处"),(0,a.Uk)(":")],-1),y=(0,a.Uk)("与其一次性操作大量 DOM 节点相比, 分批延时对DOM进行操作，可以"),_=(0,a.Wm)("strong",null,"得到更好的用户体验",-1),C=(0,a.Uk)("。这个在"),F={href:"https://juejin.im/post/5d76f469f265da039a28aff7#heading-1",target:"_blank",rel:"noopener noreferrer"},I=(0,a.Uk)("《「前端进阶」高性能渲染十万条数据(时间分片)》"),O=(0,a.Uk)(" 以及司徒正美的"),M={href:"https://zhuanlan.zhihu.com/p/37095662",target:"_blank",rel:"noopener noreferrer"},D=(0,a.Uk)("《React Fiber架构》"),E=(0,a.Uk)(" 都做了相关实验"),V=(0,a.Uk)("司徒正美在"),S={href:"https://zhuanlan.zhihu.com/p/37095662",target:"_blank",rel:"noopener noreferrer"},q=(0,a.Uk)("《React Fiber架构》"),N=(0,a.Uk)(" 也提到："),T=(0,a.Wm)("strong",null,"🔴给浏览器一点喘息的机会，他会对代码进行编译优化（JIT）及进行热代码优化，或者对reflow进行修正",-1),P=(0,a.Uk)("."),j=(0,a.Wm)("p",null,[(0,a.Uk)("React Fiber 的思想和协程的概念是契合的: "),(0,a.Wm)("strong",null,"🔴React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染"),(0,a.Uk)("。")],-1),z=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"主动让出机制"),(0,a.Uk)(" -- 通过"),(0,a.Wm)("code",null,"requestIdleCallback"),(0,a.Uk)("实现")],-1),J=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"设置任务优先级")],-1),A=(0,a.Wm)("ol",null,[(0,a.Wm)("li",null,"数据结构的调整 栈=>链表")],-1),G=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,[(0,a.Uk)("Fiber 就是我们所说的工作单元，performUnitOfWork(深度优先遍历)负责对 "),(0,a.Wm)("code",null,"Fiber"),(0,a.Uk)(" 进行操作，并按照深度遍历的顺序返回下一个 Fiber")]),(0,a.Uk)("。")],-1),K=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,[(0,a.Uk)("因为使用了链表结构，即使处理流程被中断了，我们随时可以从上次未处理完的"),(0,a.Wm)("code",null,"Fiber"),(0,a.Uk)("继续遍历下去")]),(0,a.Uk)("。")],-1),X=(0,a.Wm)("p",null,"2.两个阶段的拆分",-1),H=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"协调阶段"),(0,a.Uk)(": 可以认为是 Diff 阶段, "),(0,a.Wm)("strong",null,"这个阶段可以被中断"),(0,a.Uk)(", 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'"),(0,a.Wm)("code",null,"副作用"),(0,a.Uk)("(Effect)' . 以下生命周期钩子会在协调阶段被调用：")],-1),L=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"提交阶段"),(0,a.Uk)(": 将上一个阶段计算出来的需要处理的 "),(0,a.Wm)("strong",null,"副作用(Effects)"),(0,a.Uk)(" 一次性执行了。"),(0,a.Wm)("strong",null,"这个阶段必须同步执行，不能被打断"),(0,a.Uk)(". 这些生命周期钩子在提交阶段被执行:")],-1),Y=(0,a.Wm)("p",null,"在协调阶段如果时间片用完，React就会选择让出控制权。因为协调阶段执行的工作不会导致任何用户可见的变更，所以在这个阶段让出控制权不会有什么问题。",-1),B=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"更新任务还是串行执行的，我们只是将整个过程碎片化了. 对于那些需要优先处理的更新任务还是会被阻塞"),(0,a.Uk)("。=>")],-1),Q=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"要让高优先级任务插队, 首先要保证状态更新的时序"),(0,a.Uk)("。=>")],-1),Z=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"所有更新任务按照顺序插入一个队列, 状态必须按照插入顺序进行计算，但任务可以按优先级顺序执行")],-1),$=(0,a.Wm)("h2",{id:"关于时间切片",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#关于时间切片","aria-hidden":"true"},"#"),(0,a.Uk)(" 关于时间切片")],-1),nn=(0,a.Wm)("p",null,[(0,a.Uk)("为什么vue3去除了时间分片？=> "),(0,a.Wm)("strong",null,"如果我们可以把更新做得足够快的话，理论上就不需要时间分片了"),(0,a.Uk)("。")],-1),ln=(0,a.Wm)("p",null,[(0,a.Wm)("img",{src:t,alt:"时间切片"})],-1),en=(0,a.Wm)("p",null,"Shared mutable state is the root of all evil（共享的可变状态是万恶之源）",-1),an=(0,a.Wm)("p",null,"JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。",-1),tn=(0,a.Wm)("p",null,[(0,a.Uk)("Immutable Data是指一旦创建，就不能被更改的数据。对Immutable对象的修改都会返回新的Immutable对象。并且目前的Immutable库，都实现了结构共享，即"),(0,a.Wm)("strong",null,"如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享，避免了deepCopy把所有节点都复制一遍带来的性能损耗。")],-1),sn=(0,a.Wm)("h3",{id:"实现一个时间切片-将长任务分解成更小的任务-避免阻塞主进程。",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#实现一个时间切片-将长任务分解成更小的任务-避免阻塞主进程。","aria-hidden":"true"},"#"),(0,a.Uk)(" 实现一个时间切片：将长任务分解成更小的任务，避免阻塞主进程。")],-1),mn=(0,a.Wm)("p",null,"通常同步代码执行超过 50 毫秒是一个很长的任务。长任务会阻塞主线程，导致页面卡顿，我们有两种解决方案，Web worker和Time slicing。我们应该尽量使用 web worker，但是 web worker 无法访问 DOM。所以我们需要把一个长任务拆分成小任务，分布在宏任务队列中。",-1),rn=(0,a.Wm)("div",{class:"language-javascript ext-js line-numbers-mode"},[(0,a.Wm)("pre",{class:"language-javascript"},[(0,a.Wm)("code",null,[(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"function"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token function"},"ts"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token parameter"},"gen"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"{"),(0,a.Uk)("\n  "),(0,a.Wm)("span",{class:"token keyword"},"if"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token keyword"},"typeof"),(0,a.Uk)(" gen "),(0,a.Wm)("span",{class:"token operator"},"==="),(0,a.Uk)(),(0,a.Wm)("span",{class:"token string"},"'function'"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(" gen "),(0,a.Wm)("span",{class:"token operator"},"="),(0,a.Uk)(),(0,a.Wm)("span",{class:"token function"},"gen"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)("\n  "),(0,a.Wm)("span",{class:"token keyword"},"if"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token operator"},"!"),(0,a.Uk)("gen "),(0,a.Wm)("span",{class:"token operator"},"||"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"typeof"),(0,a.Uk)(" gen"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Uk)("next "),(0,a.Wm)("span",{class:"token operator"},"!=="),(0,a.Uk)(),(0,a.Wm)("span",{class:"token string"},"'function'"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"return"),(0,a.Uk)("\n\n  "),(0,a.Wm)("span",{class:"token keyword"},"return"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"function"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token function"},"next"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"{"),(0,a.Uk)("\n    "),(0,a.Wm)("span",{class:"token keyword"},"const"),(0,a.Uk)(" start "),(0,a.Wm)("span",{class:"token operator"},"="),(0,a.Uk)(" performance"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Wm)("span",{class:"token function"},"now"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)("\n    "),(0,a.Wm)("span",{class:"token keyword"},"let"),(0,a.Uk)(" res "),(0,a.Wm)("span",{class:"token operator"},"="),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"null"),(0,a.Uk)("\n    "),(0,a.Wm)("span",{class:"token keyword"},"do"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"{"),(0,a.Uk)("\n      res "),(0,a.Wm)("span",{class:"token operator"},"="),(0,a.Uk)(" gen"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Wm)("span",{class:"token function"},"next"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)("\n    "),(0,a.Wm)("span",{class:"token punctuation"},"}"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"while"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token operator"},"!"),(0,a.Uk)("res"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Uk)("done "),(0,a.Wm)("span",{class:"token operator"},"&&"),(0,a.Uk)(" performance"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Wm)("span",{class:"token function"},"now"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token operator"},"-"),(0,a.Uk)(" start "),(0,a.Wm)("span",{class:"token operator"},"<"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token number"},"25"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Wm)("span",{class:"token punctuation"},";"),(0,a.Uk)("\n\n    "),(0,a.Wm)("span",{class:"token keyword"},"if"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Uk)("res"),(0,a.Wm)("span",{class:"token punctuation"},"."),(0,a.Uk)("done"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)(),(0,a.Wm)("span",{class:"token keyword"},"return"),(0,a.Uk)("\n    "),(0,a.Wm)("span",{class:"token function"},"setTimeout"),(0,a.Wm)("span",{class:"token punctuation"},"("),(0,a.Uk)("next"),(0,a.Wm)("span",{class:"token punctuation"},")"),(0,a.Uk)("\n  "),(0,a.Wm)("span",{class:"token punctuation"},"}"),(0,a.Uk)("\n"),(0,a.Wm)("span",{class:"token punctuation"},"}"),(0,a.Uk)("\n")])]),(0,a.Wm)("div",{class:"line-numbers"},[(0,a.Wm)("span",{class:"line-number"},"1"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"2"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"3"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"4"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"5"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"6"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"7"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"8"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"9"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"10"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"11"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"12"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"13"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"14"),(0,a.Wm)("br"),(0,a.Wm)("span",{class:"line-number"},"15"),(0,a.Wm)("br")])],-1),un=(0,a.Wm)("h2",{id:"react的diff",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#react的diff","aria-hidden":"true"},"#"),(0,a.Uk)(" React的diff")],-1),on=(0,a.Wm)("h3",{id:"_1-同层比对策略",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_1-同层比对策略","aria-hidden":"true"},"#"),(0,a.Uk)(" 1. 同层比对策略")],-1),Wn=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"只做同层级的比对，忽略跨层级的元素移动"),(0,a.Uk)("。")],-1),kn=(0,a.Wm)("p",null,[(0,a.Uk)("此时，性能已经大大的提升了，时间复杂度优化成 "),(0,a.Wm)("code",null,"O(n^2)"),(0,a.Uk)("。另外，"),(0,a.Wm)("strong",null,"如果真出现跨层级移动时，会直接将旧元素删除，在新的位置重新创建，也能保证更新的准确行。但可能会导致状态的丢失。")],-1),cn=(0,a.Wm)("h3",{id:"_2-唯一标识策略",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_2-唯一标识策略","aria-hidden":"true"},"#"),(0,a.Uk)(" 2. 唯一标识策略")],-1),dn=(0,a.Wm)("p",null,[(0,a.Uk)("用 "),(0,a.Wm)("code",null,"type"),(0,a.Uk)(" + "),(0,a.Wm)("code",null,"key"),(0,a.Uk)(" 便可确切地识别出节点的准确位置，从而将时间复杂度优化成了 "),(0,a.Wm)("code",null,"O(n)"),(0,a.Uk)("。")],-1),pn=(0,a.Wm)("h3",{id:"_3-组件模式策略",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_3-组件模式策略","aria-hidden":"true"},"#"),(0,a.Uk)(" 3. 组件模式策略")],-1),Un=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"碎片化 虚拟DOM"),(0,a.Uk)("。")],-1),fn=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"子级列表的比对，才是整个 diff 算法中最核心且最考验性能的部分。")],-1),hn=(0,a.Wm)("p",null,[(0,a.Uk)("列表比对 ("),(0,a.Wm)("code",null,"diffChildren"),(0,a.Uk)(") 采用 "),(0,a.Wm)("strong",null,"两端比对算法 + Key值比对"),(0,a.Uk)(" 算法，大大提高了 "),(0,a.Wm)("code",null,"Diff"),(0,a.Uk)(" 效率；")],-1),gn=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Uk)("优先从新旧列表的 "),(0,a.Wm)("strong",null,"两端"),(0,a.Uk)(" 的 "),(0,a.Wm)("strong",null,"四个节点"),(0,a.Uk)(" 开始进行 "),(0,a.Wm)("strong",null,"两两比对"),(0,a.Uk)("；")]),(0,a.Wm)("li",null,[(0,a.Uk)("如果均不匹配，则尝试 "),(0,a.Wm)("strong",null,"key 值比对"),(0,a.Uk)("； "),(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Uk)("如 "),(0,a.Wm)("strong",null,"key 值"),(0,a.Uk)(" 匹配上，则移动并更新节点；")]),(0,a.Wm)("li",null,[(0,a.Uk)("如 未匹配上，则在对应的位置上 "),(0,a.Wm)("strong",null,"新增新节点"),(0,a.Uk)("；")])])]),(0,a.Wm)("li",null,[(0,a.Uk)("最后全部比对完后，列表中 "),(0,a.Wm)("strong",null,"剩余的节点"),(0,a.Uk)(" 执行 "),(0,a.Wm)("strong",null,"删除或新增"),(0,a.Uk)("；")])],-1),bn=(0,a.Wm)("h3",{id:"实践建议",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#实践建议","aria-hidden":"true"},"#"),(0,a.Uk)(" 实践建议")],-1),vn=(0,a.Wm)("h4",{id:"_1-props的传递",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_1-props的传递","aria-hidden":"true"},"#"),(0,a.Uk)(" 1."),(0,a.Wm)("code",null,"props"),(0,a.Uk)("的传递")],-1),wn=(0,a.Wm)("p",null,[(0,a.Wm)("code",null,"JSX"),(0,a.Uk)(" 中标签可以传递属性，最简单的方式就是 "),(0,a.Wm)("strong",null,"值传递")],-1),xn=(0,a.Wm)("h4",{id:"_2-渲染树结构稳定",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_2-渲染树结构稳定","aria-hidden":"true"},"#"),(0,a.Uk)(" 2. 渲染树结构稳定")],-1),Rn=(0,a.Wm)("p",null,[(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 算法采用的 "),(0,a.Wm)("strong",null,"同层比对"),(0,a.Uk)(" 的策略，因此如果是跨层级的移动，就会 重新创建新节点并删除原来的节点，并不是真正的移动。所以保证 "),(0,a.Wm)("strong",null,"渲染树结构稳定"),(0,a.Uk)(" 可以有效提高性能。")],-1),yn=(0,a.Wm)("h4",{id:"_3-key-的使用",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_3-key-的使用","aria-hidden":"true"},"#"),(0,a.Uk)(" 3. key 的使用")],-1),_n=(0,a.Wm)("p",null,[(0,a.Uk)("当需要列表中 "),(0,a.Wm)("code",null,"VNode"),(0,a.Uk)(" 的 "),(0,a.Wm)("strong",null,"同层移动"),(0,a.Uk)(" 时，加上唯一标识 "),(0,a.Wm)("code",null,"key"),(0,a.Uk)(" 能有效提高 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 性能，避免元素的 "),(0,a.Wm)("strong",null,"重渲染"),(0,a.Uk)("。")],-1),Cn=(0,a.Wm)("h4",{id:"_4-组件化",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_4-组件化","aria-hidden":"true"},"#"),(0,a.Uk)(" 4. 组件化")],-1),Fn=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"复用性高"),(0,a.Uk)(" 且需要 "),(0,a.Wm)("strong",null,"频繁更新"),(0,a.Uk)(" 的节点抽离成 "),(0,a.Wm)("strong",null,"组件"),(0,a.Uk)("，会使 "),(0,a.Wm)("code",null,"VNode Tree"),(0,a.Uk)(" 碎片化，从而能更有效地进行 "),(0,a.Wm)("strong",null,"局部更新"),(0,a.Uk)("，减少触发 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 的节点数量，提高性能且提高代码复用率；")]),(0,a.Wm)("li",null,[(0,a.Uk)("但由于组件的创建和 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 相比普通节点来说更为 "),(0,a.Wm)("strong",null,"复杂"),(0,a.Uk)("，需要执行例如生命周期，组件比对 等，所以需要 "),(0,a.Wm)("strong",null,"合理规划"),(0,a.Uk)("，避免 "),(0,a.Wm)("strong",null,"过分组件化"),(0,a.Uk)(" 导致 "),(0,a.Wm)("strong",null,"内存的浪费和影响性能"),(0,a.Uk)("，一些 "),(0,a.Wm)("strong",null,"复用率低的静态元素"),(0,a.Uk)(" 直接使用元素节点更为合理；")])],-1),In=(0,a.Wm)("h3",{id:"diff-策略",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#diff-策略","aria-hidden":"true"},"#"),(0,a.Uk)(" diff 策略")],-1),On=(0,a.Wm)("ol",null,[(0,a.Wm)("li",null,"Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。"),(0,a.Wm)("li",null,"拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。"),(0,a.Wm)("li",null,"对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。")],-1),Mn=(0,a.Wm)("p",null,"基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化，事实也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能。",-1),Dn=(0,a.Wm)("h3",{id:"tree-diff",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#tree-diff","aria-hidden":"true"},"#"),(0,a.Uk)(" tree diff")],-1),En=(0,a.Wm)("p",null,"基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。",-1),Vn=(0,a.Wm)("h3",{id:"component-diff",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#component-diff","aria-hidden":"true"},"#"),(0,a.Uk)(" component diff")],-1),Sn=(0,a.Wm)("p",null,"React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。",-1),qn=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,"如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。"),(0,a.Wm)("li",null,"如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。"),(0,a.Wm)("li",null,"对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。")],-1),Nn=(0,a.Wm)("h3",{id:"element-diff",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#element-diff","aria-hidden":"true"},"#"),(0,a.Uk)(" element diff")],-1),Tn=(0,a.Wm)("p",null,[(0,a.Uk)("当节点处于同一层级时，React diff 提供了三种节点操作，分别为："),(0,a.Wm)("strong",null,"INSERT_MARKUP"),(0,a.Uk)("（插入）、"),(0,a.Wm)("strong",null,"MOVE_EXISTING"),(0,a.Uk)("（移动）和 "),(0,a.Wm)("strong",null,"REMOVE_NODE"),(0,a.Uk)("（删除）。")],-1),Pn=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"INSERT_MARKUP"),(0,a.Uk)("，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。")]),(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"MOVE_EXISTING"),(0,a.Uk)("，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。")]),(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"REMOVE_NODE"),(0,a.Uk)("，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。")])],-1),jn=(0,a.Wm)("p",null,"React 提出优化策略：允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，虽然只是小小的改动，性能上却发生了翻天覆地的变化！",-1),zn=(0,a.Wm)("p",null,"那么，如此高效的 diff 到底是如何运作的呢？让我们通过源码进行详细分析。",-1),Jn=(0,a.Wm)("p",null,[(0,a.Uk)("首先对新集合的节点进行循环遍历，for (name in nextChildren)，"),(0,a.Wm)("strong",null,"通过唯一 key 可以判断新老集合中是否存在相同的节点"),(0,a.Uk)("，if (prevChild === nextChild)，如果存在相同节点，则进行移动操作，但在移动前需要将当前节点在老集合中的位置与 lastIndex 进行比较，if (child._mountIndex < lastIndex)，则进行节点移动操作，否则不执行该操作。这是一种"),(0,a.Wm)("strong",null,"顺序优化手段"),(0,a.Uk)("，lastIndex 一直在更新，表示访问过的节点在老集合中最右的位置（即最大的位置），"),(0,a.Wm)("strong",null,"如果新集合中当前访问的节点比 lastIndex 大，说明当前访问节点在老集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置，因此不用添加到差异队列中，即不执行移动操作，只有当访问的节点比 lastIndex 小时，才需要进行移动操作。")],-1),An=(0,a.Wm)("p",null,"建议：在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。",-1),Gn=(0,a.Wm)("h3",{id:"vue和react的diff算法的区别",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#vue和react的diff算法的区别","aria-hidden":"true"},"#"),(0,a.Uk)(" vue和react的diff算法的区别")],-1),Kn=(0,a.Wm)("p",null,"vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。",-1),Xn=(0,a.Wm)("ol",null,[(0,a.Wm)("li",null,[(0,a.Wm)("p",null,[(0,a.Uk)("vue比对节点，当"),(0,a.Wm)("strong",null,"节点元素类型相同，但是className不同"),(0,a.Uk)("，认为是"),(0,a.Wm)("strong",null,"不同类型"),(0,a.Uk)("元素，删除重建，而react会认为是"),(0,a.Wm)("strong",null,"同类型节点"),(0,a.Uk)("，只是修改节点属性")])]),(0,a.Wm)("li",null,[(0,a.Wm)("p",null,[(0,a.Uk)("vue的列表比对，采用"),(0,a.Wm)("strong",null,"从两端到中间的比对方式，而react则采用从左到右依次比对"),(0,a.Uk)("的方式。当一个集合，只是把最后一个节点移动到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移动到第一个。总体上，vue的对比方式更高效。")])])],-1),Hn=(0,a.Wm)("h2",{id:"优化策略",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#优化策略","aria-hidden":"true"},"#"),(0,a.Uk)(" 优化策略")],-1),Ln=(0,a.Wm)("p",null,[(0,a.Uk)("回到性能优化这个点，从这里的简单实现我们可以看出: 虽然异步化了更新流程，但本质上仍然没有解决 复杂的组件 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 带来长时间执行阻塞主进程。我记得以前文章有说过: "),(0,a.Wm)("strong",null,"最有效的性能优化方式就是 异步、任务分割 和 缓存策略。")],-1),Yn=(0,a.Wm)("h3",{id:"_1-异步化",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_1-异步化","aria-hidden":"true"},"#"),(0,a.Uk)(" 1. 异步化:")],-1),Bn=(0,a.Wm)("p",null,[(0,a.Uk)("通过把同步的代码执行变成异步，把串行变成并行，可以有效提高 "),(0,a.Wm)("strong",null,"执行的时间利用率"),(0,a.Uk)(" 和 "),(0,a.Wm)("strong",null,"保证代码优先级"),(0,a.Uk)("。从这里可以延伸出两种优化方向:")],-1),Qn=(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[(0,a.Wm)("ol",null,[(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"异步"),(0,a.Uk)(": 如我们上面所做的优化，这样能保证主进程的执行优先级，保证页面渲染或者更主要任务的优先执行，避免卡顿；")])])]),(0,a.Wm)("li",null,[(0,a.Wm)("ol",null,[(0,a.Wm)("li",null,[(0,a.Wm)("strong",null,"并行"),(0,a.Uk)(": 通过把某些高消耗的操作放到 "),(0,a.Wm)("strong",null,"非主进程"),(0,a.Uk)(" 上执行，例如 worker 线程。不过由于 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 本身就较为复杂，还要需要处理好主进程与线程之间的交互，会导致复杂度极高，但也并非不可行，后续也许是个优化方向。")])]),(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,"例如我就在思考在这里引入 wasm 的可能性，代价与收益比如何，有兴趣的童鞋可以一起探讨。")])])],-1),Zn=(0,a.Wm)("h3",{id:"_2-任务分割",tabindex:"-1"},[(0,a.Wm)("a",{class:"header-anchor",href:"#_2-任务分割","aria-hidden":"true"},"#"),(0,a.Uk)(" 2. 任务分割")],-1),$n=(0,a.Wm)("p",null,[(0,a.Uk)("将原本会阻塞主进程的 "),(0,a.Wm)("strong",null,"大块逻辑执行进行拆解，分割成一个个小任务"),(0,a.Uk)("。从而可以在逻辑中找到合适的时机点 "),(0,a.Wm)("strong",null,"分段执行"),(0,a.Uk)("，即 "),(0,a.Wm)("strong",null,"不会阻塞主进程，又可以让代码快速高效的执行，最大化利用物理资源。")],-1),nl=(0,a.Wm)("p",null,[(0,a.Uk)("Facebook 的大神们选择了这条优化方向，这就是 React 16 新引入的 "),(0,a.Wm)("code",null,"Fiber"),(0,a.Uk)(" 理念的最主要目的。上面我们实现的 "),(0,a.Wm)("code",null,"diff"),(0,a.Uk)(" 中，有着一个很大的障碍:")],-1),ll=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"一棵完整 虚拟DOM树 更新，必须一次性更新完成，中间无法被暂停，也无法被分割。")],-1),el=(0,a.Wm)("p",null,[(0,a.Uk)("而 "),(0,a.Wm)("code",null,"Fiber"),(0,a.Uk)(" 最主要的功能就是 "),(0,a.Wm)("strong",null,"指针映射，保存上一个更新的组件与下一步需要更新的组件"),(0,a.Uk)("，从而完成 "),(0,a.Wm)("strong",null,"可暂停可重启"),(0,a.Uk)("。计算进程的运行时间，利用浏览器的 "),(0,a.Wm)("code",null,"requestIdleCallback"),(0,a.Uk)(" 与 "),(0,a.Wm)("code",null,"requestAnimationFrame"),(0,a.Uk)(" 接口，当有优先级更高的任务时，优先执行，暂停下一个组件的更新。待空闲时再重启更新。")],-1),al=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"(window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。)")],-1),tl=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"(window.requestAnimationFrame() 告诉浏览器—你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行)")],-1),sl=(0,a.Wm)("p",null,[(0,a.Wm)("code",null,"Fiber"),(0,a.Uk)(" 算是一种编程思想，在其它语言中也有许多应用("),(0,a.Wm)("code",null,"Ruby Fiber"),(0,a.Uk)(")。核心思想是:")],-1),ml=(0,a.Wm)("p",null,[(0,a.Wm)("strong",null,"任务拆分和协同，主动把执行权交给主线程，使主线程有时间空挡处理其他高优先级任务。")],-1),rl={render:function(n,l){const e=(0,a.up)("OutboundLink");return(0,a.wg)(),(0,a.j4)(a.HY,null,[s,m,r,u,o,W,i,k,c,d,p,(0,a.Wm)("p",null,[U,f,h,(0,a.Wm)("a",g,[b,(0,a.Wm)(e)]),v]),w,x,R,(0,a.Wm)("ul",null,[(0,a.Wm)("li",null,[y,_,C,(0,a.Wm)("a",F,[I,(0,a.Wm)(e)]),O,(0,a.Wm)("a",M,[D,(0,a.Wm)(e)]),E]),(0,a.Wm)("li",null,[V,(0,a.Wm)("a",S,[q,(0,a.Wm)(e)]),N,T,P])]),j,z,J,A,G,K,X,H,L,Y,B,Q,Z,$,nn,ln,en,an,tn,sn,mn,rn,un,on,Wn,kn,cn,dn,pn,Un,fn,hn,gn,bn,vn,wn,xn,Rn,yn,_n,Cn,Fn,In,On,Mn,Dn,En,Vn,Sn,qn,Nn,Tn,Pn,jn,zn,Jn,An,Gn,Kn,Xn,Hn,Ln,Yn,Bn,Qn,Zn,$n,nl,ll,el,al,tl,sl,ml],64)}}}}]);