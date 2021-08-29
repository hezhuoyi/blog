# Vue源码相关

## Vue源码之 computed和watch

### computed
**computed本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。**

computed：发生在Vue实例初始化的initState函数里。

1.遍历computed对象，拿到每一个value（userDef）对应的getter函数

2.为每一个getter创建一个watcher（computed watcher）

```js
if (this.computed) {
    this.value = undefined
    this.dep = new Dep()
  } else {
    this.value = this.get()
  }
```

3.利用 Object.defineProperty 给计算属性对应的 key 值添加 getter 和 setter getter会返回这个watcher的value

延伸：**computed watcher创建时会新建一个 dep实例，当render函数执行到this.xxx的时候触发计算属性的getter，它会执行watcher.depend()，相当于渲染 `watcher` 订阅了这个 `computed watcher` 的变化，然后再求值，也就是自定义的getter方法。**

这个时候 `Dep.target` 就是这个 `computed watcher`

computed watcher有 2 种模式 lazy和active

lazy代表没有订阅者，只有当下次再访问这个计算属性的时候才会重新求值。

active会对比新旧值，如果变化了则执行回调函数，就是 `this.dep.notify()`，会触发渲染 `watcher` 重新渲染。

这么设计是为了确保不仅仅是依赖改变才会发生变化，计算最终的值改变才触发watcher重新渲染。

缓存的关键代码： if (watcher.dirty) {  watcher.evaluate() } 当下次watcher触发update的时候才会evaluate()

### watch
watch：发生在Vue实例初始化的initState函数里。

1.遍历handle（可以一个key对应多个handle）

2.调用$watch（在执行stateMixin里）

3.实例化一个watcher，这个是user watcher

**一旦我们 `watch` 的数据发送变化，它最终会执行 `watcher` 的 `run` 方法，执行回调函数 `cb`，(为需要观察的 expOrFn 添加watcher ，expOrFn的值有改变时执行cb，在watcher的实例化的过程中会对expOrFn进行解析，并为expOrFn涉及到的data数据下的def添加该watcher)**
并且如果我们设置了 `immediate` 为 true，则直接会执行回调函数 `cb`。最后返回了一个 `unwatchFn` 方法，它会调用 `teardown` 方法去移除这个 `watcher`。

**四种不同的watcher类型 deep user computed sync**

### Vue 在二次收集依赖时**用 cleanupDeps 卸载一些无用的 dep**

为什么需要做 `deps` 订阅的移除呢，在添加 `deps` 的订阅过程，已经能通过 `id` 去重避免重复订阅了啊。

因为v-if的时候，收集完a，b的依赖，但如果我们没有依赖移除的过程，那么这时候我去修改 a 模板的数据，会通知 a 数据的订阅的回调，**造成浪费**。

watch只是收集依赖和触发更新以及相关的回调钩子，在钩子函数中触发vm.update => vm.patch更新视图？

**注意：上面的说法太蠢了，vm.update是new Watcher时传入的，和钩子函数没关系。**

**vue中的具体实现**
**异步：只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。**

**批量：如果同一个 watcher 被多次触发，只会被推入到队列中一次。去重对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列执行实际工作。**

**异步策略：Vue 在内部对异步队列尝试使用原生的 Promise.then 、 MutationObserver(监视对DOM树所做更改的能力 微任务) 和setImmediate (宏任务 IE)，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。**

[vue mixins的实现](https://www.cnblogs.com/DM428/p/10889466.html)

## Schedule 调度的作用

1. **去重**，每个Watcher有一个唯一的id。首先，如果id已经在队列里了，跳过，没必要重复执行，如果id不在队列里，**要看队列是否正在执行中**。如果不在执行中，则在下一个时间片执行队列，因此队列永远是异步执行的。
2. **排序，按解析渲染的先后顺序执行**，即Watcher小的先执行。Watcher里面的id是自增的，先创建的id比后创建的id小。所以会有如下规律：

2.1、组件是允许嵌套的，而且解析必然是先解析了父组件再到子组件。所以父组件的id比子组件小。

2.2、用户创建的Watcher会比render时候创建的先解析。所以用户创建的Watcher的id比render时候创建的小。

1. **删除Watcher**，如果一个组件的Watcher在队列中，而他的父组件被删除了，这个时候也要删掉这个Watcher。
2. 队列执行过程中，存一个对象circular，里面有每个watcher的执行次数，如果哪个watcher执行超过MAX_UPDATE_COUNT定义的次数就认为是**死循环**，不再执行，默认是100次。

总之，调用的作用就是管理 Watcher。

## next-tick原理

**1.能力检测**

Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务。

**2.执行回调队列**

1. 如何保证只在接收第一个回调函数时执行异步方法？

nextTick源码中使用了一个**异步锁**的概念，即**接收第一个回调函数时，先关上锁，执行异步方法**。此时，**浏览器处于等待执行完同步代码就执行异步代码的情况**。

1. 执行 flushCallbacks 函数时为什么需要备份回调函数队列？执行的也是备份的回调函数队列？

因为，会出现这么一种情况：nextTick 的回调函数中还使用 nextTick。如果 flushCallbacks 不做特殊处理，直接循环执行回调函数，会导致里面nextTick 中的回调函数会进入回调队列。这就相当于，下一个班车的旅客上了上一个班车。（防止nextTick中的nextTick中回调push进了同一个callbacks）在batcher中flushBatcherQueue和后面的nextTick进入的是用一个microtask！！