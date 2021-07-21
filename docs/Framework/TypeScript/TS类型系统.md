# TS 类型系统

## 接口 
接口(interface)主要用于类型检查，它只是一个结构契约，定义了具有相似的名称和类型的对象结构。除此之外，接口还可以定义方法和事件。

## 类型别名 
类型别名(type)不同于 interface 只能定义对象类型，type 声明还可以定义基础类型、联合类型或交叉类型。

两者差异：
1. 定义类型的范围：接口只能定义对象类型, 而类型声明可以声明任何类型，包括基础类型、联合类型或交叉类型。
2. 扩展性：接口可以 extends、implements，从而扩展多个接口或类。类型没有扩展功能，只能交叉合并。
3. 合并声明：定义两个相同名称的接口会合并声明，定义两个同名的 type 会出现异常。
4. 类型可以获取 typeof 返回的值作为类型。
5. 类型能使用 in 关键字计算属性，生成映射类型。
总的来说，公共类型先考虑用 interface 实现，不能用 interface 实现的再用 type 实现。

## 联合类型
联合类型能使属性为多种类型之一（它使用 | 作为标记，如 string | number）。

```ts
const say = (name: string | undefined) => {};
```

## 交叉类型
交叉类型类似于 JavaScript 中的 extend，从两个对象中创建一个新对象，新对象拥有着两个对象所有的功能（T & U ）。

```ts
function extend<T extends object, U extends object>(first: T, second: U): T & U {
    const result = <T & U>{};
    for (let id in first) {
        (<T>result)[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
        (<U>result)[id] = second[id];
        }
    }
    return result;
}
```

## 元组类型
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```ts
let tuple: [string, number];
tuple = ['aaa', 111];
```

## 枚举
枚举（Enum）是组织收集有关联变量的一种方式，用于取值被限定在一定范围内的场景。

```ts
enum CardSuit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
}
let Card = CardSuit.Clubs;
```

## 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```ts
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}
```

## 泛型约束
在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，这个时候需要对泛型进行约束，
只允许传入符合条件的变量，比如要访问某个属性，先确保变量包含该属性。

```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

## 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。

语法：值 as 类型 (推荐) 或者 <类型>值

### 用途
1. 将一个联合类型断言为其中一个类型

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

2. 将一个父类断言为更加具体的子类

```ts
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

3. 将任何一个类型断言为 any

```ts
(window as any).foo = 1;
```

4. 将 any 断言为一个具体的类型

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
interface Cat {
    name: string;
    run(): void;
}
const tom = getCacheData('tom') as Cat;
tom.run();
```