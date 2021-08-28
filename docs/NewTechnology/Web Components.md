# Web Components
Web Components API提供了一种方式，在不依赖外部模块的情况下封装自定义的组件。

## 什么是 Web Components
Web Components 本身不是一个单独的规范，而是由一组DOM API 和 HTML 规范所组成，用于创建可复用的自定义名字的 HTML 标签，并且可以直接在你的 Web 应用中使用。

代码的复用一直都是我们追求的目标，在 JS 中可复用的代码我们可以封装成一个函数，但是对于复杂的HTML（包括相关的样式及交互逻辑），我们一直都没有比较好的办法来进行复用。要么借助后端的模板引擎，要么借助已有框架对 DOM API 的二次封装，而 Web Components 的出现就是为了补足浏览器在这方面的能力。

## 如何使用 Web Components
Web Components 中包含的几个规范，都已在 W3C 和 HTML 标准中进行了规范化，主要由三部分组成：

1. Custom elements（自定义元素）：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
2. Shadow DOM（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
3. HTML templates（HTML模板）： template 和 slot 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

### 1. Custom elements（自定义元素）
自定义元素 Custom elements 是 Web components 技术的核心。

#### CustomElementRegistry
CustomElementRegistry：包含自定义元素相关功能。
CustomElementRegistry.define()方法可以用来注册新的自定义元素。
window.customElements返回的就是CustomElementRegistry对象的引用。

#### 创建自定义内置元素的扩展
is 属性：HTML的全局属性，使用 is 属性可以把一个HTML的内置属性标记成一个已注册的自定义内置元素。

#### 生命周期
自定义组件的特殊回调函数。

#### 自定义方法和属性
自定义元素就是javascript的类，因此自定义元素的方法和属性的用法和class一样。

### 2. Shadow DOM（影子DOM）
Shadow DOM（影子DOM）
如果我们希望自定义元素的内部代码不允许被外部访问到，我们可以设置Shadow DOM来将其与外部隔离，这样外部的设置无法影响到其内部，而内部的设置也不会影响到外部。

Shadow DOM 特有的术语：
```
Shadow host：一个常规 DOM节点，Shadow DOM 会被附加到这个节点上。
Shadow tree：Shadow DOM内部的DOM树。
Shadow boundary：Shadow DOM结束的地方，也是常规 DOM开始的地方。
Shadow root: Shadow tree的根节点。
```

Shadow DOM 最大的好处：

1. 向用户隐藏细节，直接提供组件。
2. 可以封装内部样式表，不会影响到外部。

### 3. HTML templates（HTML模板）
#### template模版
在JavaScript中撸dom、style是很麻烦的一件事。Web Components API提供了 template 标签，包含一个HTML片段，不会在文档初始化时渲染。但是可以在运行时使用JavaScript显示。

#### Slot
slot 元素，也叫插槽。作为Web Components技术的一部分，是Web组件内的一个占位符。该占位符可以在后期使用自己的标记语言填充，这样您就可以创建单独的DOM树，并将它与其它的组件组合在一起。插槽也分为默认插槽和具名插槽。

## Web Components 优点
1. 浏览器原生支持，不需要引入额外的第三方库；
2. 真正的内部私有化的 CSS，不会产生样式的冲突；
3. 无需经过编译操作，即可实现的组件化方案，且与外部 DOM 隔离；