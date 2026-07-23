# 新闻与产品详情更新指南

本文档供 Codex、Claude Code 及其他代码 Agent 共同使用。目标是在不破坏现有页面结构、导航、响应式样式和详情页逻辑的前提下，统一更新新闻中心与产品中心内容。

## 1. 项目内容架构

### 新闻

| 文件 | 用途 |
| --- | --- |
| `news-data.js` | 新闻列表数据、标题、日期、摘要、封面和精简正文 |
| `news-content.js` | 新闻详情完整正文 HTML |
| `news.html` | 新闻列表页及分页逻辑 |
| `news-detail.html` | 通用新闻详情页，通过 `?id=` 加载内容 |
| `news-page.css` | 新闻列表、详情正文和顶栏样式 |
| `assets/news/` | 新闻封面与本地正文图片 |
| `scripts/import-news-content.mjs` | 将旧官网接口 JSON 清洗为 `news-content.js` |

新闻详情地址格式：

```text
news-detail.html?id=新闻ID
```

### 产品

| 文件 | 用途 |
| --- | --- |
| `products-data.js` | 产品分类及全部产品数据 |
| `products.html` | 产品列表页 |
| `product-detail.html` | 通用产品详情页，通过 `?id=` 加载内容 |
| `assets/products/` | 产品图片 |

产品详情地址格式：

```text
product-detail.html?id=产品ID
```

`product-xw-1d.html`、`product-xw-9300.html` 是历史独立页面。新增产品默认不要复制独立 HTML，应使用 `products-data.js + product-detail.html`。

## 2. 新闻更新模板

### 2.1 新增列表数据

在 `news-data.js` 的 `window.newsItems` 数组顶部插入最新新闻。新闻按日期从新到旧排列。

```js
{
  id: "唯一数字ID",
  date: "YYYY-MM-DD",
  title: "新闻完整标题",
  image: "assets/news/news-cover-name.jpg",
  summary: "用于列表卡片和详情页标题下方的简短摘要，建议40至70字。",
  paragraphs: [
    "完整正文不可用时显示的第一段备用内容。",
    "完整正文不可用时显示的第二段备用内容。",
    "完整正文不可用时显示的第三段备用内容。",
  ],
},
```

规则：

- `id` 必须唯一、稳定，发布后不得随意修改。
- `date` 必须使用 `YYYY-MM-DD`。
- `image` 必须使用项目内相对路径，不使用临时目录。
- `summary` 不要复制标题，需概括新闻核心信息。
- 最新新闻放在数组最前面。
- 首页只展示 `news-data.js` 中配置的精选新闻；如需替换首页精选项，还需修改 `index.html` 中对应的详情链接、标题、摘要和图片。

### 2.2 新增完整正文

在 `news-content.js` 的 `window.newsContents` 对象中增加与新闻 ID 相同的键：

```js
window.newsContents = {
  "唯一数字ID": `
    <p>第一段正文内容。</p>
    <p><strong>一、正文小标题</strong></p>
    <p>小标题下的正文内容。</p>
    <img src="assets/news/news-body-image.jpg" alt="图片说明" loading="lazy">
    <p>后续正文内容。</p>
  `,
};
```

如果直接编辑现有对象，应保留其他新闻内容。详情页会优先读取 `news-content.js`；对应内容不存在时，自动回退到 `news-data.js` 的 `paragraphs`。

正文允许使用：

- `<p>`
- `<strong>`
- `<img>`
- `<br>`

不要加入：

- `<script>`、`<style>`、`iframe`
- 复制自 Word 的大段内联样式
- 固定宽高图片
- 新闻列表封面图的重复展示

正文图片推荐格式：

```html
<img src="assets/news/news-body-image.jpg" alt="准确的图片说明" loading="lazy">
```

正文普通段落会自动首行缩进两个字符；以 `<strong>` 开头的小标题段落不会缩进。

### 2.3 从旧官网导入完整正文

先保存接口响应：

```bash
curl 'https://www.xqls.tech/api/company/news/page' \
  -H 'Content-Type: application/json' \
  --data '{"page":1,"limit":100}' \
  -o /tmp/xqls-news.json
```

再运行清洗脚本：

```bash
node scripts/import-news-content.mjs /tmp/xqls-news.json news-content.js
```

注意：

- 该命令会整体重建 `news-content.js`，运行前先检查未提交修改。
- 导入后必须检查正文段落、图片地址和特殊字符。
- 旧官网正文图片仍可能是外链。正式长期使用时，建议下载到 `assets/news/` 并替换为本地路径。
- 不要仅运行导入脚本而遗漏 `news-data.js` 的列表数据。

## 3. 产品更新模板

### 3.1 产品分类

分类定义位于 `products-data.js` 的 `window.XQLS_PRODUCT_CATEGORIES`：

```js
{
  id: "category-id",
  name: "分类中文名",
},
```

现有分类：

- `sampling`：水质采样
- `analysis`：水质分析
- `sensor`：数字传感
- `monitoring`：管网监测
- `control`：系统控制
- `solid`：固废管理

除非用户明确要求新增分类，否则优先使用现有分类。

### 3.2 新增产品数据

在 `products-data.js` 的 `window.XQLS_PRODUCTS` 数组中，按所属分类加入：

```js
{
  "id": "product-slug",
  "model": "XW-0000",
  "name": "产品中文名称",
  "title": "XW-0000 产品中文名称",
  "category": "sampling",
  "categoryName": "水质采样",
  "family": "产品系列名称",
  "summary": "产品定位、使用场景和核心能力说明。",
  "features": [
    "核心特点一",
    "核心特点二",
    "核心特点三"
  ],
  "specs": [
    ["参数名称", "参数值"],
    ["工作环境", "温度、湿度等参数"],
    ["通信方式", "4G / RS485"]
  ],
  "image": "assets/products/product-slug.jpg",
  "brochure": "产品彩页或资料路径"
},
```

规则：

- `id` 只使用小写英文字母、数字和连字符。
- `id` 必须与详情地址参数一致。
- `category` 必须是已定义分类 ID。
- `categoryName` 必须与分类中文名一致。
- `features` 每条只表达一个能力点。
- `specs` 必须是二维数组，每项严格为 `[参数名, 参数值]`。
- 缺少彩页时可将 `brochure` 设为空字符串，但不要编造文件路径。
- 不得编造参数；来源不明确时应向用户确认。

### 3.3 产品图片规范

- 存放目录：`assets/products/`
- 文件名：与产品 `id` 一致或能明确识别产品。
- 推荐使用 JPG、PNG 或 WebP。
- 图片主体居中，避免过多空白。
- 推荐最长边不超过 2000px。
- 单张图片建议控制在 1MB 以内。
- 页面中只写相对路径，不写 `/Users/...` 等本机绝对路径。

## 4. 页面样式约束

更新内容时默认不得修改以下既有规则：

- 页面最大内容宽度为 `1440px`。
- 桌面端左右边距为 `48px`，移动端为 `24px`。
- 新闻详情不重复显示列表封面图，只显示原始正文图片。
- 新闻详情普通段落首行缩进两个字符。
- 新闻详情页保留“返回新闻中心”、上一篇和下一篇。
- 新闻列表页与解决方案页顶栏保持相同滚动效果。
- 联系咨询模块、页脚、导航名称和顺序需保持全站一致。
- 联系咨询主标题保持单行并自适应字号。

只更新新闻或产品内容时，不应修改：

- 顶栏结构
- 联系咨询模块
- 页脚
- 全站颜色
- 页面最大宽度
- 解决方案数据和布局

## 5. Agent 标准执行流程

任何 Agent 接到新闻或产品更新任务时，按以下顺序执行：

1. 先运行 `git status --short`，识别并保留用户已有修改。
2. 阅读本指南及根目录 `AGENTS.md`。
3. 检查素材文件是否真实存在。
4. 将图片复制到正确的项目资源目录。
5. 只修改对应数据文件；除非需求明确涉及布局，不修改模板页面。
6. 检查 ID、分类、图片路径和详情链接。
7. 运行语法和 HTML 检查。
8. 在本地服务器中打开列表页和详情页检查。
9. 未经用户明确要求，不提交 Git、不推送、不触发部署。

禁止事项：

- 不覆盖用户未提交的修改。
- 不删除不相关文件。
- 不使用 `git reset --hard`。
- 不在代码中加入密钥、Webhook 或私密凭据。
- 不虚构新闻、日期、产品参数或认证信息。
- 不将临时附件路径直接写入网页。

## 6. 更新后检查

### 基础检查

```bash
git diff --check
node --check news-data.js
node --check news-content.js
node --check products-data.js
node --check solution-page.js
```

### HTML 解析检查

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Parser(HTMLParser):
    pass

for file in Path(".").glob("*.html"):
    parser = Parser()
    parser.feed(file.read_text(encoding="utf-8"))

print("HTML parse OK")
PY
```

### 本地预览

```bash
python3 -m http.server 8000
```

检查地址：

```text
http://127.0.0.1:8000/news.html
http://127.0.0.1:8000/news-detail.html?id=新闻ID
http://127.0.0.1:8000/products.html
http://127.0.0.1:8000/product-detail.html?id=产品ID
```

检查清单：

- 新闻或产品是否出现在列表正确位置。
- 封面和详情图片是否加载成功。
- 新闻详情完整正文是否与 ID 匹配。
- 产品名称、型号、特点和参数是否正确。
- 上一篇、下一篇链接是否正常。
- 桌面端和移动端是否溢出。
- 控制台是否存在 JavaScript 错误。
- 顶栏、联系咨询模块和页脚是否保持一致。

## 7. 可直接交给 Agent 的任务模板

```text
请根据仓库根目录 AGENTS.md 和 CONTENT_UPDATE_GUIDE.md 更新官网内容。

任务类型：新闻 / 产品
操作类型：新增 / 修改 / 下架
内容 ID：
标题或产品名称：
发布日期或产品型号：
所属分类：
摘要：
正文或产品介绍：
特点：
规格参数：
素材文件：

要求：
1. 保留工作区内与本任务无关的修改。
2. 素材保存到指南规定的本地资源目录。
3. 使用现有通用详情页，不新建重复详情 HTML。
4. 完成语法、路径、桌面端和移动端检查。
5. 未经明确要求，不提交、推送或部署。
```

