<p align="center">
  <a href="https://nav3.cn/?g">
    <img src="https://gcore.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/logo.svg" width="130" />
  </a>
  <br />
  <b>发现导航</b>
  <p align="center">一个纯静态、支持SEO、在线编辑的强大导航网站</p>
  <p align="center">
    <img src="https://img.shields.io/github/v/release/xjh22222228/nav" />
    <a href="https://github.com/xjh22222228/nav/stargazers"><img src="https://img.shields.io/github/stars/xjh22222228/nav" alt="Stars"/></a>
    <img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&color=C82B38">
    <img src="https://img.shields.io/github/license/xjh22222228/nav" />
  </p>
</p>


## 特性

三不需：`无需数据库`、`无需服务器`、`无需成本`

`发现导航` 的理念就是做一款无需依赖后端服务既简单又方便，没有繁杂的配置和数据库等配置概念, 做到开箱即用。

<details>
  <summary>点击查看功能</summary>

  - 🍰 内置 `800+` 优质网站
  - 🍰 支持 [码云 Gitee](https://gitee.com/xiejiahe/nav)
  - 🍰 支持从浏览器书签导入
  - 🍰 支持将数据导出到浏览器书签
  - 🍰 支持用户提交收录
  - 🍰 支持自有部署/Fork
  - 🍰 丰富的资源配置系统
  - 🍰 支持 SEO 搜索引擎
  - 🍰 支持网站关联多个网址
  - 🍰 支持检测网站存活状态
  - 🍰 支持配置仅自己可见
  - 🍰 自动抓取网站图标/名称/描述
  - 🍰 支持暗黑模式
  - 🍰 支持后台管理, 无需部署
  - 🍰 支持多种浏览模式，创新
  - 🍰 支持足迹记忆
  - 🍰 支持多种搜索查询
  - 🍰 支持自定义引擎搜索
  - 🍰 多款高颜值主题切换
  - 🍰 强大的响应式系统
  - 🍰 多种 Loading 加载动画
  - 🍰 多种卡片风格设计
  - 🍰 完全纯静态, 提供自动化部署功能
  - 🍰 三叉树分类、结构清晰、分类清晰

</details>

## 部署

零成本部署，像数 `321` 一样简单。

#### Github Pages (免费)

1、右上角点击 `Fork` 当前项目。

2、[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new) 申请 `token`, 勾选相应的权限, 如果不懂就全部选中，复制并保存 Token；
3、https://github.com/licoba/nav/settings/secrets/actions/new 添加申请的 token， name 填写 `TOKEN` 大写。

4、打开 https://github.com/licoba/nav/actions 开启 action 自动部署

5、修改项目根目录配置文件 [package.json](package.json) 只需要修改仓库地址 `gitRepoUrl` 字段

6、打开 https://licoba.github.io/nav 就能看到一个非常强大的导航网站了。

#### Netlify 推荐(免费)

作者目前使用，速度较快

[https://www.netlify.com/](https://www.netlify.com/)

#### Vercel 推荐(免费)

国内访问速度较慢，建议测试后使用

[https://github.com/apps/vercel](https://github.com/apps/vercel)

#### 私有部署



只需要修改根目录 `package.json` 以下相关字段，即可实现私有部署
|Fork |自有部署 | 字段 | 说明 |
| --------------------------------------------- | -------- |--- |--- |
|√ | | gitRepoUrl | 填写您的仓库地址 |
|√ | | provider | 部署平台，`Github` / `Gitee`, 作者 `Gitee` 仓库地址 [https://gitee.com/xiejiahe/nav](https://gitee.com/xiejiahe/nav) |
|√ | | branch | 部署分支 |
|√ | √| hashMode | 路由是否 Hash 模式, 如果是部署在 `github pages` 务必设为 true |
| | √| password | 自有部署登录密码，`Fork` 用户无需填写 |
| | √| address | 自有部署, 一旦填写认为你是自有部署，`https://你的域名或IP:7777` |

## 后台

将路由地址修改为 `system` 即可进入，
- 前台地址: https://licoba.github.io/nav/#/light 
- 后台地址: https://licoba.github.io/nav/#/system

## 手动升级


将你的仓库克隆下来执行以下命令

```bash
git pull
git remote add upstream https://gitee.com/xiejiahe/nav.git
git fetch upstream main
git merge upstream/main --allow-unrelated-histories --no-edit
git push
# 如果安装了node只需执行
npm run update
```


## 开发构建

> NODE版本 >= v20

```bash
# 下载
git clone --depth=1 https://github.com/xjh22222228/nav.git
cd nav
# 安装依赖
yarn
# 启动
yarn start
# 打包
yarn build
```
