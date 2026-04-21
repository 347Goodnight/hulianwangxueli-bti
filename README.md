# 互联网冲浪人格测试

一个偏图鉴风格的网页人格测试项目。

它不测学历，也不走传统 MBTI 那套，而是把抖音热梗、抽象文化、评论区对线、热搜吃瓜、深夜刷机这些互联网日常，做成一套更像 `SBTI` 结果页的冲浪人格测试。

## 当前版本

- 30 道短场景题
- 10 个冲浪维度
- 24 种互联网人格
- 首页、结果页、全部人格面板统一为图鉴卡风格
- 支持 GitHub Pages / Cloudflare Pages 静态部署

## 人格方向

这版人格不再围着“学历焦虑”转，而是改成更贴近真实平台生态的几组：

- 热梗现行犯
- 评论区作战部
- 赛博生存组
- 整活出道班

示例人格：

- 抖音圣体
- 热梗复读机
- 抽象带师
- 键盘判官
- 赛博乐子人
- 电子仓鼠
- 深夜 emo 机
- 整活导演

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
