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

```typescript
const say = (name: string | undefined) => {};
```

## 交叉类型
交叉类型类似于 JavaScript 中的 extend，从两个对象中创建一个新对象，新对象拥有着两个对象所有的功能（T & U ）。

```typescript
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

```typescript
let tuple: [string, number];
tuple = ['aaa', 111];
```

## 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function reverse<T>(items: T[]): T[] {
  const toreturn = [];
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i]);
  }
  return toreturn;
}
```