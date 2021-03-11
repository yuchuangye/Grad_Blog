#### 1、项目简介

​		一个类似于掘金、思否这样的多人博客，或者说是开发者社区，而不是Hexo那样的个人博客系统。项目整体包括服务端(server)、后台管理系统(admin)、前台博客展示(web)三大部分，为了提高体验也对移动端进行了适配。

 

#### 2、技术栈

​	前端：vue全家桶 + scss +element-ui + dayjs + axios + echarts + vue-awesome-swiper

​	后端：nodejs + mongodb + mongoose + koa2

 

#### 3、开发环境和工具

​	前端：[vue@2.6.11 / vue-cli@4.2.3](mailto:vue@2.6.11/vue-cli@4.2.3),  [git@2.18.0](mailto:git@2.18.0),  postman

​		    vscode / sublimetext3,  chrome / FireFox,  github / gitee

​	后端：[nodejs@14.15.5,](mailto:nodejs@14.15.5,)  [npm@6.14.11](mailto:npm@6.14.11) / [yarn@1.22.10,](mailto:yarn@1.22.10,)  [nodemon@2.0.4](mailto:nodemon@2.0.4)

​         	  [pm2@4.4.0,](mailto:pm2@4.4.0,)  [mongodb@4.2.6,](mailto:mongodb@4.2.6,)  [robo3T@1.3.1](mailto:robot3T@1.3.1)

​	部署：阿里云轻量应用服务器

​       

#### 4、功能模块

​	Web端：登录、注册、重置密码，文章模块、问答模块、个人中心、用户模块、搜索模块、排行榜、新闻模块

​	后台管理系统：登录、数据总览、管理员管理、标签管理、文章管理、问答管理、用户管理、密保管理、广告管理

​	服务端：文章表、问答表、用户表、管理员表、标签表、广告表、文章评论表、问答答案表、密保表

 

#### 5、需求分析

**Web端：**

​	① 登录：输入用户名、密码和验证码进行登录，可以记住登录状态。第三方登录先放个按钮不做功能。

​	② 注册：输入用户名，两次密码，密保暗号（用于重置密码），验证码 即可进行注册。注册成功后会初始化新用户包括默认头像，职业方向，个人简介，注册时间等个人信息。

​	③ 重置：输入用户名、密保验证身份，然后输入两次新密码和验证码 即可重置密码。

​	④ 个人中心：文章列表、提问列表、收藏列表、关注列表、粉丝列表，个人基本信息和资料展示，个人资料修改，另外还可以查看别人的个人中心信息。

​	⑤ 用户模块：用户之间可以互相关注或取消关注，用户不能关注自己。

​	⑥ 搜索模块：可以通过关键字进行文章、提问和用户的搜索。

​	⑦ 排行榜：根据关注数或获赞数对用户进行排名展示。

​	⑧ 文章模块：

​        写文章：提供标题和正文，选择分类（标签分类就不写了）即可发布文章，发布后会初始化文章的一些基本数据信息。

​        编辑文章：在用户个人中心文章列表中可以对已发布文章进行删除和修改。

​        文章信息：一篇文章包含以下信息：点赞、收藏、创建日期、作者信息、标题正文、分类、评论模块、相关文章。

​	⑨ 问答模块

​        提问题：提供标题和描述，选择分类（标签分类就不写了）即可提问，发布后会初始化问题的一些基本数据信息。

​        编辑问题：在用户个人中心提问列表中可以对已发布问题进行删除和修改。

​        问题信息：一个问题包含以下信息：回答数、创建日期、作者信息、标题描述、分类、回答模块（回答展示和编写，回答者可以删除自己的回答）。

​	⑩ 首页侧边最近IT新闻轮播展示。

 

**后台管理系统：**

​	① 登录：输入管理员账号和密码即可进行登录

​    ② 数据总览：首页数据统计及展示

​    ③ 管理员管理：分为 admin 和 visitor 两种角色，对应不同权限

​	④ 标签管理：标签的增删改查，分为一级和二级标签

​	⑤ 文章管理：文章的删改查，只能修改部分文章信息

​	⑥ 问答管理：问答的删改查，只能修改部分问答信息

​	⑦ 用户管理：用户列表，仅把用户列出来，不设删除及修改操作

​    ⑧ 密保管理：密保问题的增删改查，用于web端找回密码

​    ⑨ 广告管理：广告的增删改查，用于 web 端轮播展示

 

**服务端：**

   ① 文章表 ② 问答表 ③ 用户表  ④ 管理员表 

   ⑤ 标签表 ⑥ 广告表 ⑦ 文章评论表 ⑧ 问答答案表

   ⑨ 密保表

   


#### 6、项目架构

 

 

#### 7、页面设计

​	响应式、自适应、三栏布局、ElementUI风格

 

#### 8、参考资料

掘金：<https://juejin.cn/>

思否：<https://segmentfault.com/>

极术社区：<https://aijishu.com/>

CorderGroup：<https://github.com/kevinvcc/CoderGroup>

Feng：<https://github.com/Fengfengfeng-up/vue-comment-component>

评论设计：<https://blog.csdn.net/to_study/article/details/107578783> 

慕课网：

​        Node开发Web Server博客 Node.js+Express+Koa2+MySQL

​        Node.js仿知乎服务端-深入理解RESTful API

​        Node.js-Koa2框架生态实战－从零模拟新浪微博

​        毕设一课通 从开题到答辩高效完成（含全栈项目）

 

#### 许可证
MIT license

Copyright (c) [2021] [name of copyright yuchuangye]