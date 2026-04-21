# 互联网冲浪人格测试

一个偏图鉴风格的网页人格测试项目。

它不测学历，也不走传统 MBTI 那套，而是把抖音热梗全明星、三大理论、抽象人设、游戏赛区和评论区生态这些互联网日常，做成一套更像 `SBTI` 结果页的冲浪人格测试。

## 当前版本

- 30 道短场景题
- 10 个冲浪维度
- 18 种互联网人格
- 首页、结果页、全部人格面板统一为图鉴卡风格
- 支持 GitHub Pages / Cloudflare Pages 静态部署

## 人格方向

这版人格不再围着“学历焦虑”转，而是改成更贴近抖音热梗生态的几组：

- 三大理论系
- 抽象全明星
- 游戏赛区
- 评论区生态位

示例人格：

- 性压抑
- 苹果人
- 安卓人
- 山姆门徒
- 力工圣体
- 老鼠人
- 嘉欣
- 瓦学弟
- GO学长
- 嘉豪
- 赛博乐子人
- 电子斗蛐蛐师

## 本地运行

```bash
npm install
npm run dev
```

默认会在 `http://localhost:3000` 启动。

## 构建

```bash
npm run build
```

构建结果会输出到 `dist/`。

## 部署

### GitHub Pages

如果你直接把仓库发布为静态站点：

1. 推送代码到 GitHub
2. 在仓库 `Settings -> Pages` 里选择发布源
3. 可发布根目录，或者配合你自己的工作流发布 `dist/`

### Cloudflare Pages

推荐直接连接 GitHub 仓库，构建配置如下：

- Build command: `npm run build`
- Build output directory: `dist`

## 项目结构

```text
.
├─ index.html
├─ style.css
├─ js/
│  ├─ app.js
│  ├─ dimensions.js
│  ├─ questions.js
│  └─ types.js
├─ scripts/
│  └─ build-static.cjs
└─ dist/
```

## 说明

- 这是娱乐向互联网画像项目，不是严肃心理量表。
- 结果页文案会带一定梗味和嘴替风格，适合截图分享。
- 如果你还要继续扩题库，建议优先保持“短、损、好代入”的题面密度，不要又写回成大段说明文。
