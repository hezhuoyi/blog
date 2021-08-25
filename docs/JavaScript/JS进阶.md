# JS进阶

## Proxy
Proxy意思为“代理”，即在访问对象之前建立一道“拦截”，任何访问该对象的操作之前都会通过这道“拦截”，即执行Proxy里面定义的方法。

```js
let pro = new Proxy(target,handler);
```
1. new Proxy()表示生成一个Proxy实例
2. target参数表示所要拦截的目标对象
3. handler参数也是一个对象，用来定制拦截行为。

## Reflect

Reflect正是ES6 为了操作对象而提供的新 API。

### 基本特点
只要Proxy对象具有的代理方法，Reflect对象全部具有，以静态方法的形式存在。这些方法能够执行默认行为，无论Proxy怎么修改默认行为，总是可以通过Reflect对应的方法获取默认行为。

修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

Reflect对象一共有 13 个静态方法（匹配Proxy的13种拦截行为）。

