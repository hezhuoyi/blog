(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5303],{9431:(t,e,o)=>{"use strict";o.r(e),o.d(e,{data:()=>r});const r={key:"v-0390f20e",path:"/Network/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8.html",title:"网络安全",lang:"zh-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"跨站脚本攻击 XSS",slug:"跨站脚本攻击-xss",children:[]},{level:2,title:"跨站请求伪造 CSRF",slug:"跨站请求伪造-csrf",children:[]},{level:2,title:"SQL 注入攻击",slug:"sql-注入攻击",children:[]},{level:2,title:"跨域",slug:"跨域",children:[{level:3,title:"跨域解决方案",slug:"跨域解决方案",children:[]}]}],filePathRelative:"Network/网络安全.md"}},1225:(t,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>s});const r=(0,o(6252).uE)('<h1 id="网络安全" tabindex="-1"><a class="header-anchor" href="#网络安全" aria-hidden="true">#</a> 网络安全</h1><p><strong>常见 Web 攻击技术</strong></p><h2 id="跨站脚本攻击-xss" tabindex="-1"><a class="header-anchor" href="#跨站脚本攻击-xss" aria-hidden="true">#</a> 跨站脚本攻击 XSS</h2><p>跨站脚本攻击（Cross-Site Scripting， XSS）是指通过<strong>存在安全漏洞的 Web 网站注册用户的浏览器内运行非法的 HTML 标签或者 JavaScript 代码</strong>的一种攻击方式。<strong>动态创建的 HTML 可能存在安全漏洞</strong>。</p><p>该攻击可能造成以下影响：</p><ul><li>利用<strong>虚假输入表单</strong>骗取用户个人信息</li><li>利用脚本窃取用户的 <strong>Cookie</strong> 值，被害者在不知情的情况下，帮助攻击者发送恶意请求</li><li>显示<strong>伪造的文章或者图片和广告</strong></li></ul><p>防范：</p><ul><li>一个信念: 不要相信用户的输入，对<strong>输入内容转码或者过滤，让其不可执行</strong>。</li><li>两个利用: 利用 <strong>CSP</strong>(内容安全策略)，它的核心思想就是<strong>服务器决定浏览器加载哪些资源</strong>，利用 Cookie 的 <strong>HttpOnly</strong> 属性（js脚本将无法读取到cookie信息）。</li></ul><h2 id="跨站请求伪造-csrf" tabindex="-1"><a class="header-anchor" href="#跨站请求伪造-csrf" aria-hidden="true">#</a> 跨站请求伪造 CSRF</h2><p>攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。</p><p><strong>诱导自动发 GET POST 请求</strong></p><p>CSRF 攻击并不需要将恶意代码注入用户当前页面的<code>html</code>文档中，而是跳转到新的页面，利用服务器的<strong>验证漏洞</strong>和<strong>用户之前的登录状态</strong>来模拟用户进行操作。</p><p>防范：</p><ol><li><p>利用Cookie的<strong>SameSite</strong>属性，对请求中 Cookie 的携带作一些限制，<strong>Strict模式下，浏览器完全禁止第三方请求携带Cookie。</strong></p></li><li><p>验证来源站点 <strong>Origin</strong>和<strong>Referer</strong>，通过验证 Referer 来判断该请求是否为第三方网站发起的。</p></li><li><p>验证<strong>Token</strong>，服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。</p></li></ol><h2 id="sql-注入攻击" tabindex="-1"><a class="header-anchor" href="#sql-注入攻击" aria-hidden="true">#</a> SQL 注入攻击</h2><p>SQL 注入（SQL Injection）是<strong>指针对 Web 应用使用的数据库，通过运行非法的 SQL 而产生的攻击</strong>。该安全隐患有可能引发极大的安全威胁，有时会直接导致个人信息及机密信息的泄露。</p><p>SQL 注入可能会导致如下影响：</p><ul><li>非法查看或篡改数据库内的数据</li><li>规避认证</li><li>执行和数据库服务器业务关联的程序等</li></ul><p>防范：</p><p><strong>不要使用动态SQL</strong> <strong>不要将敏感数据保留在纯文本中</strong> <strong>限制数据库权限和特权</strong> <strong>使用Web应用程序防火墙</strong></p><h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域" aria-hidden="true">#</a> 跨域</h2><p>因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。</p><p>那么是出于什么安全考虑才会引入这种机制呢？ 其实主要是用来防止 CSRF 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。</p><h3 id="跨域解决方案" tabindex="-1"><a class="header-anchor" href="#跨域解决方案" aria-hidden="true">#</a> 跨域解决方案</h3><ol><li><strong>通过JSONP跨域</strong></li></ol><p>通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。</p><p>JSONP 的原理很简单，就是利用 <code>&lt;script&gt;</code> 标签没有跨域限制的漏洞。通过 <code>&lt;script&gt;</code> 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。</p><p><strong>JSONP 使用简单且兼容性不错，但是只限于 get 请求。</strong></p><ol start="2"><li><strong>跨域资源共享（CORS）</strong></li></ol><p>CORS，是 HTML5 的一项特性，它定义了一种浏览器和服务器交互的方式来确定是否允许跨域请求。</p><p><strong>服务端设置 Access-Control-Allow-Origin 就可以开启 CORS</strong>。该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。</p><ol start="3"><li><strong>nodejs中间件代理跨域</strong></li></ol><p>跨域原理: 同源策略是浏览器的安全策略, 不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行js脚本, 不需要检验同源策略,也就不存在跨域问题。</p><p>实现思路：通过起一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头cookie中域名,实现当前域下cookie的写入。</p><ol start="4"><li>nginx反向代理中设置proxy_cookie_domain</li></ol><p>和使用node中间件跨域原理相似。前端和后端都不需要写额外的代码来处理， 只需要配置一下Ngnix。</p><ol start="5"><li><strong>postMessage</strong></li></ol><p>postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。</p><ol start="6"><li><strong>websocket</strong></li></ol><p>Websocket是HTML5的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。WebSocket和HTTP都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。</p>',40),s={render:function(t,e){return r}}}}]);