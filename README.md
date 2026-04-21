# 互联网冲浪人格测试

一个偏图鉴风格的娱乐向人格测试网页项目。

它不测学历，也不走传统 MBTI 那套，而是把抖音热梗、抽象文化、圈层黑话、情绪文学和赛区语境压成一套更像 `SBTI` 结果页的互联网人格测试。

## 当前版本

- 30 道短场景题
- 10 个冲浪维度
- 21 种互联网人格
- 首页、答题页、结果页、全部人格面板统一为简洁图鉴风格
- 分享结果支持生成带二维码的图片卡
- 支持 GitHub Pages / Cloudflare Pages 静态部署

## 当前人格池

- 理论话术系
  - 性压抑派
  - 苹果人
  - 安卓人
  - 力工圣体
  - Old Money
  - 杠精
  - 口嗨哥
- 抽象镜头系
  - 嘉豪
  - 海王
  - 老鼠人
  - 小丑
  - 逆天哥
  - 高质量男性
- 情绪文学系
  - Doomer
  - Cheer Guy
  - 胖猫
  - 纯爱战士
  - 淡人
- 赛区圈层系
  - 瓦学弟
  - GO学长
  - 原批

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

1. 推送代码到 GitHub
2. 在仓库 `Settings -> Pages` 里选择发布源
3. 可直接发布根目录，或配合工作流发布 `dist/`

### Cloudflare Pages

推荐直接连接 GitHub 仓库，构建配置如下：

- Build command: `npm run build`
- Build output directory: `dist`

## 项目结构

```text
.
├── index.html
├── style.css
├── js/
│   ├── app.js
│   ├── dimensions.js
│   ├── questions.js
│   └── types.js
├── scripts/
│   └── build-static.cjs
└── dist/
```

## 说明

- 这是娱乐向互联网人格项目，不是严肃心理量表
- 文案会保留明显的梗味、损感和图鉴感，适合截图分享
- 如果继续扩题或扩人格，建议优先保持“短、损、可代入、语境真”的密度
