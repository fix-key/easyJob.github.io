# 项目介绍
易工作是一个结合HTML，CSS和JavaScript技术的综合实训项目，它包含了许多功能，例如：返回顶部，轮播图，在线人数统计的轮播，电梯导航等，还包含了课外的ajax技术，有着强大的搜索功能，页面上的专栏都是通过js渲染出来的，非常的自动化。

# 项目前期的准备工作
## Node.js 环境的安装
> nodejs 的下载地址：[https://nodejs.cn/](https://nodejs.cn/)
## 区分 LTS 版本和 Current 版本的不同
+ LTS为长期稳定版，对于追求稳定性的企业级项目来说，推荐安装 LTS 版本的 Node.js
+ Current 为新特性尝鲜版，对热衷于尝试新特性的用户来说，推荐安装 Current 版本的 Node.js。但是，Current 版本中可能存在隐藏的 Bug 或 安全性漏洞，因此不推荐在企业级项目中使用 Current 版本的 Node.js
## 查看已安装的 Node.js 的版本号
打开终端，在终端输入命令 node -v 后，按下回车键，即可查看已安装的 Node.js 的版本号

## 下载项目所需要的包
在 vscode 自己集成的 powershell 中输入如下命令：
```powershell
npm i
```
前提要有 package.json 文件才能进行下载

## 启动服务器
在 vscode 自己集成的 powershell 中输入如下命令：
···powershell
node server.js
···
前端要先 cd 到 js目录中才能启动服务器

# 项目功能
+ 轮播图
+ 在线人数统计
+ 电梯导航
+ 底部广告的动画
+ 返回顶部
+ 登录注册
+ 搜索岗位
