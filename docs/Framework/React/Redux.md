# Redux

## redux的一些理解

redux的核心思想（工作流程）：

- 将状态统一放在一个state中，由store来管理这个state。
- 这个store按照reducer的“shape”（形状）创建。
- reducer的作用是接收到action后，输出一个新的状态，对应地更新store上的状态。
- 根据redux的原则指导，外部改变state的最佳方式是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，完成state更新。
- 可以通过subscribe在store上添加一个监听函数。每当调用dispatch方法时，会执行所有的监听函数。
- 可以添加中间件（中间件是干什么的我们后面讲）处理副作用。

在这个工作流程中，redux需要提供的功能是：

- 创建store，即：`createStore()`
- 创建出来的store提供`subscribe`，`dispatch`，`getState`这些方法。
- 将多个reducer合并为一个reducer，即：`combineReducers()`
- 应用中间件，即`applyMiddleware()`

### createStore

函数内利用闭包的结构，只暴露了几个接口，增强了“封装性”（没有其他办法能接触到内部变量）

1.dispatch 调用reducer并触发所有的listener

2.subscribe 订阅state改变 返回的是一个取消订阅的方法

3.getState 获取store

4.replaceReducer 修改reducer

### combineReducers

把子reducer合并成一个总的reducer （利用闭包绑定参数）

1.从参数reducers中筛选出有效的reducer

2.返回合并后的reducer

**combination**：取得每个子reducer对应的state，与action一起作为参数给每个子reducer执行

调用reducer，根据状态是否改变返回新/旧state

### applyMiddleware

输入为若干中间件，输出为enhancer

1. 调用（若干个）中间件函数，获取（若干个）改造函数 const chain = middlewares.map(middleware => middleware(middlewareAPI))
2. 把所有改造函数compose成一个改造函数  dispatch = compose(...chain)(store.dispatch)
3. 改造dispatch方法  return {  ...store,  dispatch  }

compose：将多个函数参数转化成连续调用的函数形式

compose(fn1, fn2, fn3) (...args) = > fn1(fn2(fn3(...args)))

## react-redux是如何工作的

- **Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store**
- **connect: 负责连接React和Redux**
  - **获取state**: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state
  - **包装原组件**: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent
  - **监听store tree变化**: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用`this.setState()`方法触发Connect及其子组件的重新渲染