# 巧用TypeScript

## 函数重载
TypeScript 提供函数重载的功能，用来处理因函数参数不同而返回类型不同的使用场景，使用时，只需为同一个函数定义多个类型即可，如下所示：

```ts
interface User {
    name: string;
    age: number;
}

const user = {
    name: 'Jack',
    age: 123
};

class SomeClass {
    public test(para: User): number;

    public test(para: number, flag: boolean): number;

    public test(para: User | number, flag?: boolean): number {
        return 1;
    }
}

const someClass = new SomeClass();

// ok
someClass.test(user);
someClass.test(123, false);

// Error
someClass.test(123);
someClass.test(user, false);
```

## 映射类型
在映射类型里，新类型以相同的形式去转换旧类型的每个属性。

**0. keyof 将一个类型的属性名全部提取出来当做联合类型**
```ts
interface Person {
  name: string
  age: number
}
type PersonKeys = keyof Person
// type PersonKeys = 'name' | 'age'
```
**1. Partial 将每个属性转换为可选属性**
```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
}

eg: type PersonPartial = Partial<Person>;
/* type PersonPartial = {
    name?: string | undefined;
    age?: number | undefined;
} */
```
**2. Required Partial刚好相反，将每个属性转换为必选属性**
```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}

eg: interface Person {
    name?: string
    age?: number
}
type RequiredPerson = Required<Person>;
/* type RequiredPerson = {
    name: string;
    age: number;
} */
```
**3. Readonly 将每个属性转换为只读属性**
```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

eg: type ReadonlyPerson = Readonly<Person>;
/* type ReadonlyPerson = {
   readonly name: string;
   readonly age: number;
} */
```
**4. Nullable 转换为旧类型和null的联合类型**
```ts
interface Nullable<T> { 
  [P in keyof T]: T[P] | null 
}

eg: type NullablePerson = Nullable<Person>;
/* type NullablePerson = {
    name: string | null;
    age: number | null;
} */
```
**5. Pick 选取一组属性指定新类型**
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

eg: interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
/* type TodoPreview = {
    title: string;
    completed: boolean;
} */
```
**6. Record 创建一组属性指定新类型，常用来声明普通Object对象。Record属于非同态，本质上会创建新属性，不会拷贝属性修饰符**
```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
}

eg: interface PageInfo {
  title: string;
}
type Page = "home" | "about" | "contact";
const nav: Record<Page, PageInfo>;
/* const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
}; */
```
**7. Exclude 去除交集，返回剩余的部分**
```ts
type Exclude<T, U> = T extends U ? never : T

eg: type Person = 'name' | 'age' | 'height';
type somePerson = Exclude<Person, 'height'>
// type somePerson = "name" | "age"
```
**8. Omit 适用于键值对对象的Exclude，去除类型中包含的键值对**
```ts
type Omit = Pick<T, Exclude<keyof T, K>>

eg: interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
/* type TodoPreview = {
    title: string;
    completed: boolean;
} */
```
**9. ReturnType 获取返回值类型，一般为函数**
```ts
type ReturnType<T extends (...args: any) => any>
  = T extends (...args: any) => infer R ? R : any;

eg: declare function f1(): { a: number; b: string };
type T4 = ReturnType<typeof f1>;
/* type T4 = {
    a: number;
    b: string;
} */
```

## 类型断言
类型断言用来明确的告诉 TypeScript 值的详细类型，合理使用能减少我们的工作量。

```ts
interface User {
  name: string;
  age: number;
}

export default class NewRoom extends Vue {
  private user = {} as User;
}
```

## 枚举类型
枚举类型分为数字类型与字符串类型，其中数字类型的枚举可以当标志使用

```ts
export const enum ObjectFlags {
  Class            = 1 << 0,  // Class
  Interface        = 1 << 1,  // Interface
  Reference        = 1 << 2,  // Generic type reference
  Tuple            = 1 << 3,  // Synthesized generic tuple type
  Anonymous        = 1 << 4,  // Anonymous
  Mapped           = 1 << 5,  // Mapped
  Instantiated     = 1 << 6,  // Instantiated anonymous or mapped type
  ObjectLiteral    = 1 << 7,  // Originates in an object literal
  EvolvingArray    = 1 << 8,  // Evolving array type
  ObjectLiteralPatternWithComputedProperties = 1 << 9,  // Object literal pattern with computed properties
  ContainsSpread   = 1 << 10, // Object literal contains spread operation
  ReverseMapped    = 1 << 11, // Object contains a property from a reverse-mapped type
  JsxAttributes    = 1 << 12, // Jsx attributes type
  MarkerType       = 1 << 13, // Marker type used for variance probing
  JSLiteral        = 1 << 14, // Object type declared in JS - disables errors on read/write of nonexisting members
  ClassOrInterface = Class | Interface
}
```

## infer关键字
在条件类型表达式中，可以在 extends 条件语句中使用 infer 关键字来声明一个待推断的类型变量。

**infer 的作用是让 TypeScript 自己推断，并将推断的结果存储到一个类型变量中，infer 只能用于 extends 语句中。**

简单示例如下：
```ts
type ParamType<T> = T extends (param: infer P) => any ? P : T;
```
复制代码在这个条件语句 T extends (param: infer P) => any ? P : T 中，infer P 表示待推断的函数参数。

整句表示为：如果 T 能赋值给 (param: infer P) => any，则结果是 (param: infer P) => any 类型中的参数 P，否则返回为 T。

### 用于提取函数类型的返回值类型
```ts
type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any

ReturnType<T> 只是将 infer P 从参数位置移动到返回值位置，因此此时 P 即是表示待推断的返回值类型。

type Func = () => User;
type Test = ReturnType<Func>;   // Test = User
```

### 用于提取构造函数中参数（实例）类型
```ts
// 一个构造函数可以使用 new 来实例化，因此它的类型通常表示如下：
type Constructor = new (...args: any[]) => any;

当 infer 用于构造函数类型中，可用于参数位置 new (...args: infer P) => any 和返回值位置 new (...args: any[]) => infer P。

// 因此就内置如下两个映射类型：
// 获取参数类型
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never;

// 获取实例类型
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;

class TestClass {
  constructor(
    public name: string,
    public string: number
  ) {}
}
type Params = ConstructorParameters<typeof TestClass>;  // [string, numbder]
type Instance = InstanceType<typeof TestClass>;         // TestClass
```