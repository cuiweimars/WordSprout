# Sight Word 互动学习平台 — 完整产品方案

> 项目代号：**WordSprout**
> 文档版本：v1.1（综合修订版）
> 日期：2026-05-13

---

## 一、产品定位与核心差异化

### 1.1 一句话定位

**"为 4-7 岁儿童打造的 AI 驱动互动高频词学习平台 — 游戏化闪卡 + 智能进度追踪 + 一键可打印"**

### 1.2 为什么现有产品不够好（市场空白点）

| 痛点 | 现有产品的问题 | 我们的解决方案 |
|------|---------------|---------------|
| SightWords.com 免费但只是静态 PDF | 没有互动、没有进度追踪、没有游戏化 | 互动闪卡 + 游戏化学习 + 进度追踪 |
| ABCmouse / Reading Eggs 太重太贵 | $14.99/月，功能臃肿，sight word 只是冰山一角 | 专注 sight word 垂直，免费可用 + 轻量付费 |
| TPT / Etsy 资源碎片化 | 买 10 个不同卖家的资源，风格不统一，无法追踪学习进度 | 统一平台，从学习到练习到评估全链路 |
| 教师缺乏工具 | 无法管理班级学生进度，无法自定义词表 | 教师仪表盘 + 自定义词表 + 班级管理 |
| 打印资源与在线学习割裂 | 在线学完不知道该打印什么练习 | AI 根据学习弱项自动生成对应可打印练习 |

### 1.3 目标用户画像

**主要用户 A — 美国本土家长（占比 55%）**
- 年龄 28-42 岁，孩子 4-7 岁（PreK - 2nd Grade）
- 孩子正在学阅读或被老师标记为"识字落后"
- 在 Google / Pinterest 搜索 "sight word flashcards printable"
- 付费意愿：$4.99-$9.99/月 或 $39.99/年

**主要用户 B — 美国小学教师（占比 25%）**
- K-2 年级教师，每个班级 20-30 名学生
- 需要差异化打印闪卡、追踪学生个人进度、生成评估报告（家长 PDF + 管理员 CSV）
- 90%+ 的教师每年自费 $500-895 购买教学用品，$9.99/月在承受范围内
- 标杆竞品 ESGI 定价 $225-288/年，教师普遍嫌贵，WordSprout 定价仅其 1/3
- 学区采购流程需数周到数月（含 COPPA/FERPA 审查），早期主攻教师自费市场
- 关键渠道：TPT、Pinterest、教师 Facebook 群组、Reddit r/kindergarten
- **注意：教师对 Science of Reading 方向敏感，产品需体现 Heart Words 理念**

**次要用户 C — Homeschool 家庭（占比 12%）**
- 美国有 340 万+ homeschool 学生
- 需要系统化的阅读教学方案，不是碎片资源
- 付费意愿：$9.99-$14.99/月（愿意为完整课程方案付更多）

**次要用户 D — ESL/EFL 全球用户（占比 8%）**
- 非英语母语国家的家长/教师教孩子学英语高频词
- 付费意愿较低，主要通过广告变现

---

## 二、产品功能架构

### 2.1 功能全景图

```
WordSprout 产品架构
│
├── 🎯 模块一：互动闪卡学习核心
│   ├── 1.1 数字闪卡（带真人发音 + 动画反馈）
│   ├── 1.2 Heart Words 标注（可解码部分绿色 / 需记忆部分红色♥，所有用户可见）
│   ├── 1.3 智能学习模式（间隔重复算法 SRS）
│   ├── 1.4 语音识别跟读（Web Speech API）
│   └── 1.5 自适应难度（根据掌握程度动态调整）
│
├── 🎮 模块二：游戏化练习
│   ├── 2.1 Sight Word Bingo（单词宾果）
│   ├── 2.2 Word Match（配对翻牌游戏）
│   ├── 2.3 Build the Word（字母拖拽拼词）
│   ├── 2.4 Word Hunt（在句子中找词）
│   ├── 2.5 Color by Sight Word（涂色游戏）
│   └── 2.6 Sight Word Whack-a-Mole（打地鼠）
│
├── 📊 模块三：进度追踪与报告
│   ├── 3.1 学生个人仪表盘（掌握率、学习天数、成就徽章）
│   ├── 3.2 家长周报（邮件自动推送）
│   ├── 3.3 可视化学习曲线
│   └── 3.4 薄弱词汇智能标记
│
├── 🖨️ 模块四：可打印资源生成器
│   ├── 4.1 一键生成闪卡 PDF（根据学生弱项定制）
│   ├── 4.2 工作表生成器（描红、填空、连线）
│   ├── 4.3 Bingo 卡片生成器（随机生成不同卡片）
│   ├── 4.4 评估测试页（可打印评估表）
│   └── 4.5 多种主题风格（动物、太空、海洋等）
│
├── 👩‍🏫 模块五：教师工具（付费核心）
│   ├── 5.1 班级邀请链接（教师分享链接，学生家长自行加入，无需手动输入）
│   ├── 5.2 自定义词表（导入学校指定词表）
│   ├── 5.3 学生个人进度视图（每个学生：已掌握/未掌握词表）
│   ├── 5.4 差异化批量打印（按每个学生弱项生成不同闪卡集）
│   ├── 5.5 学生评估报告导出（家长版 PDF + 管理员版 CSV）
│   └── 5.6 Google Classroom 同步（P2b 高级功能，仅学区采购版）
│
├── 🤖 模块六：AI 增值功能
│   ├── 6.1 AI 自动生成含目标词的短句/故事
│   ├── 6.2 AI 语音评估（发音准确度反馈）
│   └── 6.3 AI 个性化学习路径推荐
│
└── 📱 模块七：SEO 内容矩阵
    ├── 7.1 词表页（Dolch 220词 / Fry 1000词，每个词独立页面）
    ├── 7.2 年级页（PreK / K / 1st / 2nd / 3rd）
    ├── 7.3 活动页（worksheets / flashcards / games）
    ├── 7.4 博客内容（教学指南、家长攻略）
    └── 7.5 结构化数据（Schema.org Education markup）
```

### 2.2 MVP 功能优先级（V1 只做这些）

**P0 — 第一版必须有（6-8 周开发）：**

| 模块 | 功能 | 说明 |
|------|------|------|
| 互动闪卡 | Dolch 220 词 + Fry 前 300 词的数字闪卡 | 带发音、动画翻转效果 |
| Heart Words | 可解码/需记忆部分标注 | 所有用户可见，颜色编码（绿色=可拼读，红色♥=需记忆） |
| 互动闪卡 | 基础 SRS 间隔重复算法 | Leitner System 简化版 |
| 游戏 | Word Match（配对翻牌）| 最简单的实现 |
| 游戏 | Build the Word（字母拖拽）| HTML5 Drag & Drop |
| 可打印 | 一键生成闪卡 PDF | 基于学习进度定制内容 |
| 可打印 | 基础工作表（描红 + 填空）| 客户端 PDF 生成（@react-pdf/renderer） |
| SEO | Dolch 220 词独立页面（每个词一页）| 核心流量入口 |
| SEO | 年级分类页面 | 5 个年级页面 |
| 用户系统 | 注册/登录（邮箱 + Google OAuth）| NextAuth.js |
| 用户系统 | **家长同意机制（COPPA 合规）** | 学生不能自行注册，必须由家长/教师创建档案 |
| 进度 | 基础掌握率仪表盘 | 简单的进度条 + 星级 |

**P1 — 第二版迭代（V2，6-8 周）：**

| 模块 | 功能 |
|------|------|
| 游戏 | Bingo、Color by Sight Word、打地鼠 |
| 语音 | Web Speech API 跟读 + 基础发音评估 |
| 可打印 | 多主题风格、Bingo 卡片生成器 |
| 进度 | 家长邮件周报 |
| SEO | 博客系统 + 程序化生成长尾页 |

**P2a — 教师基础功能（V3a，第 15-20 周，6 周）：**

| 模块 | 功能 |
|------|------|
| 教师工具 | 教师通过分享班级邀请链接添加学生（非 Google Classroom 同步，降低复杂度） |
| 教师工具 | 自定义词表导入（支持学校指定词表） |
| 教师工具 | 学生个人进度视图（每个学生：已掌握/未掌握词表） |
| 教师工具 | 评估报告导出（家长版 PDF + 管理员版 CSV） |
| 教师工具 | 基础批量打印（按学生弱项分别打印不同闪卡集） |
| 进度 | 可视化学习曲线、成就系统 |

**P2b — 高级功能（V3b，第 21-30 周，按需开发）：**

| 模块 | 功能 |
|------|------|
| 教师工具 | Google Classroom OAuth 同步（仅学区采购版需要，需通过 Google 安全审查） |
| AI 功能 | AI 生成故事、AI 语音评估、学习路径推荐 |
| 可打印 | 评估测试页生成器、多主题风格 |
| 移动端 | PWA 离线支持 |
| 商务 | 学区/学校团购方案（含 COPPA/FERPA 合规文档） |
| 内容 | YouTube 频道开设 |

---

## 三、技术架构与实现方案

### 3.1 技术栈选型

```
┌─────────────────────────────────────────────────┐
│                    前端                           │
│  Next.js 14+ (App Router) + TypeScript           │
│  Tailwind CSS + Framer Motion（动画）             │
│  状态管理: Zustand                                │
│  UI 组件: Radix UI + 自定义游戏组件               │
│  音频: 原生 HTML5 Audio API                       │
│  语音识别: Web Speech API（浏览器原生）            │
│  PDF: @react-pdf/renderer（客户端，dynamic import）│
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│                  后端 / BFF                       │
│  Next.js API Routes + Server Actions             │
│  认证: NextAuth.js (Auth.js v5)                  │
│  文件存储: Supabase Storage（音频文件）           │
│  邮件: Resend（家长周报、验证邮件）               │
│  支付: Stripe                                     │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│                  数据层                           │
│  数据库: Supabase Free → Pro（PostgreSQL）       │
│  ORM: Drizzle ORM（prepare:false，Supavisor）    │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│                基础设施                           │
│  部署: Vercel Hobby → Pro（随流量升级）           │
│  CDN: Vercel Edge                                │
│  域名: .com 域名（如 wordsprout.com）            │
│  监控: Vercel Analytics（免费额度内）             │
└─────────────────────────────────────────────────┘
```

### 3.2 核心数据模型

```sql
-- 词库表
CREATE TABLE word_lists (
  id UUID PRIMARY KEY,
  name VARCHAR(100),        -- 'Dolch Pre-Primer', 'Fry 1st 100'
  type VARCHAR(20),         -- 'dolch' | 'fry' | 'custom'
  grade_level VARCHAR(10),  -- 'pre-k' | 'k' | '1st' | '2nd' | '3rd'
  word_count INT,
  created_at TIMESTAMP
);

-- 单词表
CREATE TABLE words (
  id UUID PRIMARY KEY,
  text VARCHAR(50) NOT NULL,
  list_id UUID REFERENCES word_lists(id),
  audio_url TEXT,            -- 发音音频 URL
  example_sentence TEXT,     -- 示例句
  image_url TEXT,            -- 配图 URL
  difficulty INT DEFAULT 1   -- 1-5 难度等级
);

-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  role VARCHAR(20),          -- 'parent' | 'teacher' | 'student'
  avatar_url TEXT,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP
);

-- 学生档案（一个家长/教师下可有多个学生）
CREATE TABLE students (
  id UUID PRIMARY KEY,
  parent_id UUID REFERENCES users(id),
  name VARCHAR(100),
  grade_level VARCHAR(10),
  avatar VARCHAR(50),
  created_at TIMESTAMP
);

-- 学习进度追踪（SRS 核心）
CREATE TABLE learning_progress (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  word_id UUID REFERENCES words(id),
  status VARCHAR(20),        -- 'new' | 'learning' | 'reviewing' | 'mastered'
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  last_reviewed_at TIMESTAMP,
  next_review_at TIMESTAMP,  -- SRS 算法计算的下一次复习时间
  ease_factor FLOAT DEFAULT 2.5,  -- SM-2 算法参数
  interval_days INT DEFAULT 1
);

-- 游戏记录
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),
  game_type VARCHAR(50),     -- 'match' | 'bingo' | 'build_word' 等
  words_practiced TEXT[],    -- PostgreSQL 数组
  score INT,
  duration_seconds INT,
  completed_at TIMESTAMP
);

-- 打印任务
CREATE TABLE print_jobs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  student_id UUID REFERENCES students(id),
  type VARCHAR(50),          -- 'flashcards' | 'worksheet' | 'bingo' | 'assessment'
  config JSONB,              -- 打印配置（主题、纸张大小、词列表等）
  pdf_url TEXT,
  created_at TIMESTAMP
);
```

### 3.3 关键技术实现难点与方案

#### 难点 1：SRS（间隔重复）算法

**复杂度：⭐⭐（低）**

采用简化版 SM-2 算法（SuperMemo），业界成熟方案：

```
核心逻辑（伪代码）：
if 正确：
  ease_factor = max(1.3, ease_factor + 0.1)
  interval = interval * ease_factor
if 错误：
  interval = 1
  correct_streak = 0
next_review = today + interval
```

Anki / Duolingo 都是这个算法的变体，教育领域验证充分。

#### 难点 2：互动游戏引擎

**复杂度：⭐⭐⭐（中）**

不需要游戏引擎，用 HTML5 + CSS + JS 实现：

| 游戏 | 技术方案 | 复杂度 |
|------|---------|--------|
| Word Match（翻牌配对）| CSS 3D Transform + 状态管理 | 低 |
| Build the Word（拖拽拼词）| HTML5 Drag & Drop API | 低 |
| Bingo | CSS Grid + 随机布局算法 | 中 |
| Color by Sight Word | Canvas API + 区域填充 | 中 |
| 打地鼠 | CSS Animation + setTimeout | 低 |
| Word Hunt（句子中找词）| 文本处理 + 高亮交互 | 低 |

**所有游戏都可以用 React 组件 + Framer Motion 实现，不需要 Canvas/WebGL。**

#### 难点 3：PDF 可打印资源生成

**复杂度：⭐⭐⭐（中）**

两种方案：

**方案 A（推荐）：服务端渲染 HTML → PDF**
```
用户配置 → 生成 HTML 模板 → Puppeteer/playwright 截图 → 输出 PDF
优点：样式精确控制，支持复杂布局
缺点：需要服务端渲染资源
```

**方案 B：客户端 PDF 生成**
```
用户配置 → @react-pdf/renderer 在浏览器生成 PDF → 直接下载
优点：无需服务端资源，成本低
缺点：复杂布局能力有限
```

MVP 推荐方案 B（客户端），后续迁移到方案 A。

#### 难点 4：语音识别跟读

**复杂度：⭐⭐⭐（中）**

```
Web Speech API（浏览器原生）
  ↓
用户对着麦克风读单词
  ↓
SpeechRecognition 返回识别文本
  ↓
与目标单词比对（模糊匹配，容错小错误）
  ↓
给予视觉 + 音效反馈（✅ 或 ❌ + 鼓励音效）
```

**关键限制：**
- Safari/iOS 支持有限，需要降级方案（不支持时隐藏跟读按钮）
- 不需要真正的"发音评分"，只需"识别是否正确"即可
- 这大幅降低了技术复杂度

#### 难点 5：SEO 程序化页面生成

**复杂度：⭐⭐（低）**

Next.js 的 `generateStaticParams` 天然支持：

```typescript
// app/sight-words/dolch/[word]/page.tsx
export async function generateStaticParams() {
  return dolchWords.map(word => ({ word: word.text }));
  // 一次性生成 220 个静态页面
}

// app/sight-words/[grade]/page.tsx
export async function generateStaticParams() {
  return grades.map(g => ({ grade: g.slug }));
  // 生成 5 个年级页面
}
```

220 个词 + 5 个年级 + 2 个词表（Dolch/Fry）+ 6 种活动类型 = 约 **250+ 个 SEO 页面**，全部 SSG 静态生成，加载极快。

### 3.4 技术复杂度总评

| 模块 | 复杂度 | 开发工期（1人） | 关键风险 |
|------|--------|----------------|---------|
| 互动闪卡 | ⭐⭐ | 1.5 周 | 音频预加载优化 |
| SRS 算法 | ⭐⭐ | 0.5 周 | 无 |
| 游戏化练习 | ⭐⭐⭐ | 2 周 | 移动端触摸适配 |
| PDF 生成 | ⭐⭐⭐ | 1 周 | 打印样式精确控制 |
| SEO 页面矩阵 | ⭐⭐ | 1 周 | 内容质量 |
| 用户系统 | ⭐⭐ | 1 周 | 无 |
| 进度追踪 | ⭐⭐ | 0.5 周 | 无 |
| 教师工具 | ⭐⭐⭐⭐ | P2a 6 周 | 数据权限设计 + COPPA 合规 |
| AI 功能 | ⭐⭐⭐ | 2 周 | API 成本控制 |
| **MVP 总计** | — | **6-8 周** | — |
| **完整版总计** | — | **20-30 周** | — |

**技术结论：完全可行，没有不可逾越的技术障碍。单人全栈开发者 6-8 周可交付 MVP。**

---

## 四、SEO 策略与内容矩阵

### 4.1 URL 结构设计

```
核心架构：子目录结构（不用子域名，权重集中）

wordsprout.com/
├── /sight-words/                          → 总览页（核心关键词入口）
├── /sight-words/dolch/                    → Dolch 词表总览
│   ├── /sight-words/dolch/pre-primer/     → Dolch Pre-Primer (40词)
│   ├── /sight-words/dolch/primer/         → Dolch Primer (52词)
│   ├── /sight-words/dolch/first-grade/    → Dolch 1st Grade (41词)
│   ├── /sight-words/dolch/second-grade/   → Dolch 2nd Grade (46词)
│   └── /sight-words/dolch/third-grade/    → Dolch 3rd Grade (41词)
├── /sight-words/fry/                      → Fry 词表总览
│   ├── /sight-words/fry/first-100/        → Fry 第 1-100 词
│   ├── /sight-words/fry/second-100/       → Fry 第 101-200 词
│   └── ...
├── /sight-words/word/[word]/              → 单词详情页（220+ 页面）
│   └── 例如：/sight-words/word/the/
│       ├── 释义、发音、示例句、配图
│       ├── 在线闪卡练习（嵌入互动组件）
│       ├── 可打印闪卡下载
│       └── 含该词的工作表下载
├── /sight-words/kindergarten/             → 按年级入口
├── /sight-words/first-grade/
├── /sight-words/second-grade/
├── /flashcards/                           → 闪卡工具页
│   ├── /flashcards/printable/             → "sight word flashcards printable"
│   ├── /flashcards/dolch/                 → "dolch sight word flashcards"
│   └── /flashcards/fry/                   → "fry sight word flashcards"
├── /worksheets/                           → 工作表页
│   ├── /worksheets/kindergarten/
│   └── /worksheets/first-grade/
├── /games/                                → 游戏页
│   ├── /games/word-match/
│   ├── /games/bingo/
│   └── /games/build-the-word/
├── /blog/                                 → 博客
│   ├── /blog/what-are-sight-words/
│   ├── /blog/dolch-vs-fry-sight-words/
│   ├── /blog/how-to-teach-sight-words/
│   └── ...
└── /teachers/                             → 教师专用入口
```

### 4.2 关键词矩阵（目标排名词）

**第一梯队 — 高搜索量核心词（8-10 月集中攻坚）：**

| 关键词 | 月搜索量 | 目标页面 | KD 评估 |
|--------|---------|---------|---------|
| sight word flashcards | 12K-18K | /flashcards/ | 中高 |
| kindergarten sight words | 40K-60K | /sight-words/kindergarten/ | 高 |
| sight words | 50K-80K | /sight-words/ | 高 |
| dolch sight words | 15K-25K | /sight-words/dolch/ | 中 |
| sight word worksheets | 20K-35K | /worksheets/ | 高 |

**第二梯队 — 中等搜索量精准词（长期积累）：**

| 关键词 | 月搜索量 | 目标页面 |
|--------|---------|---------|
| fry sight words | 10K-18K | /sight-words/fry/ |
| first grade sight words | 15K-25K | /sight-words/first-grade/ |
| sight word games | 8K-14K | /games/ |
| sight word list | 20K-30K | /sight-words/ |
| printable sight words | 10K-15K | /flashcards/printable/ |

**第三梯队 — 长尾词（程序化生成，数量取胜）：**

| 关键词模式 | 预计页面数 | 示例 |
|-----------|-----------|------|
| "[word] sight word" | 220+ | "the sight word"、"and sight word" |
| "sight word flashcards [grade]" | 5+ | "sight word flashcards kindergarten" |
| "dolch [level] sight words" | 5+ | "dolch pre-primer sight words" |
| "fry [nth] 100 sight words" | 10+ | "fry first 100 sight words" |
| "sight word [game_name]" | 6+ | "sight word bingo" |

**长尾词总页面数：300+ 页面，全部 SSG 静态生成**

### 4.3 页面 SEO 模板设计

每个单词详情页包含：

```html
<!-- 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Sight Word: [word]",
  "educationalLevel": "PreK-2nd Grade",
  "learningResourceType": "Flashcard",
  "educationalSubject": "Reading",
  "audience": { "@type": "PeopleAudience", "suggestedMinAge": 4, "suggestedMaxAge": 7 },
  "isAccessibleForFree": true,
  "interactionStatistic": { "@type": "InteractionCounter", "interactionType": "PlayAction" }
}
</script>

<!-- 页面内容模块 -->
1. H1: "Sight Word: [word]" + 发音按钮
2. 大卡片展示（视觉焦点）
3. 互动练习区（在线闪卡 / 配对游戏）
4. 含该词的示例句子（3-5句，带图片）
5. 可打印资源下载（闪卡 PDF + 工作表）
6. 相关词汇推荐（Internal Linking）
7. FAQ（Schema.org FAQPage markup）
```

### 4.4 内容发布计划

| 阶段 | 时间 | 内容目标 |
|------|------|---------|
| 上线前 | 第 1-2 月 | 250+ 程序化页面全部上线 + 10 篇核心博客 |
| 增长期 | 第 3-6 月 | 每周 2-3 篇博客，覆盖长尾关键词 |
| 成熟期 | 第 7-12 月 | 每月 4-6 篇深度指南 + 用户 UGC 内容 |
| 持续 | 长期 | 季节性内容（返校季、暑期学习等） |

**博客选题（前 20 篇高价值博客，含 Science of Reading 对齐主题）：**

1. What Are Sight Words? Complete Guide for Parents
2. Dolch vs Fry Sight Words: Which List Should You Use?
3. How to Teach Sight Words: 15 Proven Strategies
4. **What Are Heart Words? A Parent's Guide to the Science of Reading**
5. **Sight Words vs Phonics: Why Your Child Needs Both (Not Just One)**
6. Free Printable Sight Word Flashcards (Dolch & Fry)
7. Sight Word Assessment: How to Test Your Child's Progress
8. How Many Sight Words Should a Kindergartener Know?
9. Best Sight Word Games for Kindergarten
10. Fun Ways to Practice Sight Words This Summer
11. Sight Word Bingo: Free Printable Cards
12. Color by Sight Word: Free Worksheets
13. **How to Teach High-Frequency Words Using Orthographic Mapping**
14. ESL Sight Words: Teaching Non-Native Speakers
15. Homeschool Sight Word Curriculum Guide
16. Best Sight Word Apps (对比评测，含自家产品)
17. Sight Word Worksheets by Grade Level
18. **Science of Reading: What Parents Need to Know in 2026**
19. Building Reading Fluency with High-Frequency Words
20. Common Sight Word Mistakes Parents Make (and How to Fix Them)

---

## 五、商业模式与变现方案

### 5.1 变现模式总览

```
┌─────────────────────────────────────────────────────────────┐
│                    收入来源架构                               │
│                                                              │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│   │ 订阅收入      │  │ 数字产品销售  │  │ 广告收入      │      │
│   │ (核心收入)    │  │ (补充收入)    │  │ (基础收入)    │      │
│   │              │  │              │  │              │      │
│   │  家长 $4.99/月│  │  TPT 销售    │  │  Mediavine   │      │
│   │  教师 $9.99/月│  │  Etsy 销售   │  │  AdSense     │      │
│   │  年付 7 折    │  │  站内购买    │  │  (非付费用户) │      │
│   └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│   预期收入占比（成熟期）:                                      │
│   订阅 55%  │  数字产品 25%  │  广告 20%                      │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Freemium 功能分层

| 功能 | Free 免费版 | Pro 家庭版 $4.99/月 | Teacher 教师版 $9.99/月 |
|------|------------|-------------------|----------------------|
| 在线互动闪卡 | ✅ Dolch 全部 220 词浏览 | ✅ 全部 1000+ 词 | ✅ 全部 1000+ 词 |
| Heart Words 标注 | ✅ 所有用户可见 | ✅ | ✅ |
| 基础游戏 | ✅ Word Match | ✅ 全部 6 种游戏 | ✅ 全部 6 种游戏 |
| 进度追踪（SRS） | ❌ | ✅ 多学生档案 | ✅ 学生个人进度视图 |
| 可打印闪卡 | ✅ 每月 3 次（固定词表） | ✅ 无限次（基于弱项定制） | ✅ 无限次（基于弱项定制） |
| 可打印工作表 | ❌ | ✅ 无限次 | ✅ 无限次 |
| 家长周报 | ❌ | ✅ | ✅ |
| 班级邀请链接 | ❌ | ❌ | ✅ 分享链接，家长自行加入 |
| 自定义词表 | ❌ | ❌ | ✅ 导入学校指定词表 |
| Google Classroom 同步 | ❌ | ❌ | 🔜 P2b 学区采购版 |
| 差异化批量打印 | ❌ | ❌ | ✅ 按学生弱项分别打印 |
| 学生评估报告 | ❌ | ❌ | ✅ 家长 PDF + 管理员 CSV |
| AI 生成故事 | ❌ | ✅ 每月 20 个 | ✅ 无限 |
| 语音跟读 | ❌ | ✅ | ✅ |
| 广告展示 | ✅ 有广告 | ❌ 无广告 | ❌ 无广告 |
| 学生档案数 | 1 个（无进度保存） | 最多 5 个 | 最多 40 个 |

> **免费版策略说明**：免费用户可以浏览全部 220 个 Dolch 闪卡（含 Heart Words 标注 + 发音）和玩 Word Match 游戏，体验完整的内容价值。但进度不会保存（无 SRS 追踪），打印限制为固定词表（非弱项定制）。转化逻辑：**用户看到完整内容 → 想要保存进度和定制打印 → 付费升级**。

### 5.3 定价逻辑

**家长定价 $4.99/月 或 $39.99/年（$3.33/月）**
- 对标竞品：低于 ABCmouse（$14.99/月）、Education.com（$10/月）
- 心理锚点：比一杯星巴克便宜
- 年付折扣：67% off，鼓励长期锁定
- 转化率预期：8-14%（教育类高于行业平均）

**教师定价 $9.99/月 或 $79.99/年（$6.67/月）**
- 对标竞品：**ESGI（Educational Software for Guiding Instruction）$225-288/年**，教师普遍嫌贵，Facebook 教师群频繁询问"有没有更便宜的替代品"
- 教师自费是常态：90%+ 的美国教师每年自费 $500-895 购买教学用品和工具，$9.99/月完全在承受范围内
- $10/月 是教师自费的心理舒适线，略低于此价会大幅降低决策阻力
- 学校/学区采购：提供团队报价（$199.99/年/学校，最多 10 位教师）
- 注意：学区采购流程通常需数周到数月，涉及 COPPA/FERPA 合规审查，早期应重点打教师自费市场

### 5.4 数字产品销售策略

#### TPT（TeachersPayTeachers）店铺

| 产品 | 定价 | 说明 |
|------|------|------|
| Dolch Flashcards Complete Set (220词) | $4.99 | 全套可打印闪卡 |
| Fry Flashcards (First 300) | $3.99 | Fry 前 300 词 |
| Sight Word Worksheets Bundle | $6.99 | 工作表 + 描红 + 填空 |
| Sight Word Bingo Cards | $2.99 | 30 张不同 Bingo 卡 |
| Seasonal Activities Bundle | $8.99 | 万圣节/圣诞/复活节主题 |
| Mega Bundle (全套) | $14.99 | 以上全部打包 |

**平台策略：TPT 是引流 + 收入双赢渠道，产品页内嵌网站链接引导至平台注册。**

#### Etsy 店铺

| 产品 | 定价 | 说明 |
|------|------|------|
| 单套闪卡 | $1.99 | 冲动购买价 |
| 主题闪卡套装 | $3.99 | 动物/太空/海洋主题 |
| 闪卡 + 工作表组合包 | $5.99 | 高附加值 |
| 全套大礼包 | $9.99 | 最全面的选择 |

**Etsy 定价略低于 TPT，走量策略，每个产品内附网站引流二维码/链接。**

### 5.5 广告收入模型

**前提条件：月访问量达到 50,000 sessions 才能申请 Mediavine**

| 阶段 | 月访问量 | 广告网络 | 预期 RPM | 月广告收入 |
|------|---------|---------|---------|-----------|
| 第 1-3 月 | 500-2,000 | Google AdSense | $5-8 | $2.5-$16 |
| 第 4-6 月 | 5,000-15,000 | AdSense | $6-10 | $30-$150 |
| 第 7-12 月 | 20,000-50,000 | AdSense | $8-12 | $160-$600 |
| 第 12+ 月 | 50,000+ | **Mediavine** | $15-30 | $750-$1,500 |
| 成熟期 | 100,000+ | Mediavine | $20-35 | $2,000-$3,500 |

**广告只对免费用户展示，付费用户去广告。这同时是付费转化的动力。**

### 5.6 收入预测模型

#### 保守场景（流量增长缓慢）

| 时间节点 | 月访问量 | 订阅用户 | 月订阅收入 | 数字产品 | 广告收入 | 月总收入 |
|---------|---------|---------|-----------|---------|---------|---------|
| 第 3 月 | 2,000 | 5 | $25 | $50 | $10 | $85 |
| 第 6 月 | 8,000 | 25 | $125 | $150 | $50 | $325 |
| 第 12 月 | 30,000 | 80 | $400 | $300 | $240 | $940 |
| 第 18 月 | 60,000 | 180 | $900 | $500 | $900 | $2,300 |
| 第 24 月 | 100,000 | 350 | $1,750 | $800 | $2,000 | $4,550 |

#### 中等场景（SEO 增长符合预期）

| 时间节点 | 月访问量 | 订阅用户 | 月订阅收入 | 数字产品 | 广告收入 | 月总收入 |
|---------|---------|---------|-----------|---------|---------|---------|
| 第 3 月 | 5,000 | 15 | $75 | $100 | $25 | $200 |
| 第 6 月 | 20,000 | 60 | $300 | $300 | $120 | $720 |
| 第 12 月 | 80,000 | 250 | $1,250 | $600 | $640 | $2,490 |
| 第 18 月 | 150,000 | 500 | $2,500 | $1,000 | $2,250 | $5,750 |
| 第 24 月 | 250,000 | 900 | $4,500 | $1,500 | $5,000 | $11,000 |

#### 乐观场景（内容病毒传播 + 开学季爆发）

| 时间节点 | 月访问量 | 订阅用户 | 月订阅收入 | 数字产品 | 广告收入 | 月总收入 |
|---------|---------|---------|-----------|---------|---------|---------|
| 第 3 月 | 10,000 | 30 | $150 | $200 | $60 | $410 |
| 第 6 月 | 50,000 | 150 | $750 | $500 | $500 | $1,750 |
| 第 12 月 | 200,000 | 600 | $3,000 | $1,200 | $2,800 | $7,000 |
| 第 18 月 | 400,000 | 1,200 | $6,000 | $2,000 | $7,200 | $15,200 |
| 第 24 月 | 600,000 | 2,000 | $10,000 | $3,000 | $12,000 | $25,000 |

**注意：教育产品有强烈的季节性，8-10 月收入可能是 6-7 月的 2-3 倍。以上为年均月收入。**

### 5.7 成本结构

**阶段一：免费基础设施（前 6 个月，月访问量 < 5 万）**

| 项目 | 月成本 | 说明 |
|------|--------|------|
| Vercel Hobby | $0 | SSG 架构下 100GB 带宽/月够用 |
| Supabase Free | $0 | 500MB 数据库 + 50K MAU + 1GB 存储 |
| 域名 | $1 | 年付 $12 |
| Resend | $0 | 免费 3,000 封/月 |
| 音频文件 | $0 | 存储在 Supabase Storage（1GB 内免费，520 个 mp3 约 26MB） |
| **总计** | **$1/月** | **约 $12/年** |

**阶段二：按需升级（月访问量 5 万+，有收入后）**

| 项目 | 月成本 | 说明 |
|------|--------|------|
| Vercel Pro | $20 | 更大带宽 + 更多 serverless 额度 |
| Supabase Pro | $25 | 8GB 数据库 + 250GB 流量 |
| Resend | $0-20 | 按需 |
| OpenAI API | $20-50 | AI 功能上线后 |
| **总计** | **$45-95/月** | **约 $540-1,140/年** |

**成本策略**：前 6 个月几乎零成本运行，用 GitHub Actions 每 6 小时 ping 一次防止 Supabase 暂停。有收入后再升级。
- 保守场景：第 18-24 月升级（月收入稳定 $500+）
- 中等场景：第 8-12 月升级（月收入稳定 $300+）
- 乐观场景：第 4-6 月升级（月收入稳定 $200+）

---

## 六、推广与增长策略

### 6.1 流量获取渠道（按优先级排序）

#### 渠道 1：SEO（核心流量来源，占 60-70%）

**为什么 SEO 是首选：**
- 教育关键词搜索意图明确、转化率高
- 一旦排名上去，流量长期稳定且免费
- 300+ 程序化页面 = 大量长尾词入口

**执行节奏：**
- 第 1 月：上线 250+ 程序化页面 + 提交 Sitemap + Google Search Console
- 第 2-3 月：每周发布 2-3 篇博客，覆盖"what/why/how"类关键词
- 第 4-6 月：根据 Search Console 数据优化已有页面 + 建内链
- 第 7-12 月：冲击第一梯队核心词前 10 排名

#### 渠道 2：Pinterest（教育垂直第二大流量源，占 15-20%）

**Pinterest 是教育可打印资源的黄金渠道：**
- 教师和家长在 Pinterest 上搜索资源的比例极高
- Pin 的生命周期长（一个优质 Pin 可以持续带来流量 6-12 个月）
- 视觉化内容天然适合闪卡展示

**执行策略：**
- 每个可打印资源创建 3-5 个不同风格的 Pin
- 使用关键词优化的 Pin 描述和标题
- 加入教育相关的 Group Board（协同画板）
- 工具：Tailwind 自动化发布，每天 3-5 个 Pin
- 目标：每月从 Pinterest 获得 5,000-15,000 访问

#### 渠道 3：TPT / Etsy 交叉引流（占 5-10%）

**策略：在 TPT/Etsy 售卖产品，同时把用户引回主站**
- 每个 TPT 产品 PDF 最后一页放 "更多免费资源" + 网站链接
- TPT 产品描述中提及 "在线互动版本" 并附链接
- 免费产品（Freebie）作为引流利器：发布 2-3 个免费小产品

#### 渠道 4：教师/家长社区（占 5-10%）

| 平台 | 策略 |
|------|------|
| Facebook 教师群组 | 分享有价值的教学技巧（不直接推销），附资源链接 |
| Reddit r/teaching r/kindergarten | 回答问题，提供工具推荐 |
| Teachers.net 论坛 | 参与讨论 |
| Instagram | 展示产品使用场景（孩子学习的短视频） |
| YouTube | 制作 "how to teach sight words" 教程视频 |

#### 渠道 5：邮件营销（转化引擎，不直接引流）

**邮件列表是付费转化的核心渠道：**
- 所有下载免费 PDF 的用户必须提供邮箱
- 邮件自动化序列：
  - Day 0: 欢迎邮件 + 额外免费资源
  - Day 3: 教学技巧（价值内容）
  - Day 7: Pro 版功能介绍 + 限时优惠
  - Day 14: 用户成功案例 + 社会证明
  - 每周: 新资源通知 + 季节性内容
- 目标：邮件列表 5,000 人时，月转化 1-2% = 50-100 新付费用户

### 6.2 增长飞轮设计

```
                 ┌──────────────────────┐
                 │   SEO 内容页面矩阵    │
                 │  (300+ 页面获取流量)   │
                 └──────────┬───────────┘
                            │ 免费访问
                            ▼
                 ┌──────────────────────┐
                 │   免费互动工具/下载    │
                 │  (收集邮箱 + 展示价值) │
                 └──────────┬───────────┘
                            │ 邮箱获取
                            ▼
                 ┌──────────────────────┐
                 │   邮件营销序列        │
                 │  (教育内容 + 产品引导) │
                 └──────────┬───────────┘
                            │ 转化
                            ▼
                 ┌──────────────────────┐
                 │   付费用户            │
                 │  (订阅 + 数字产品)     │
                 └──────────┬───────────┘
                            │ 好评/推荐
                            ▼
                 ┌──────────────────────┐
                 │   口碑传播 + UGC       │
                 │  (Pinterest Pin 分享   │
                 │   教师群组推荐)        │
                 └──────────┬───────────┘
                            │ 新用户 + 反链
                            ▼
                    回到 SEO 内容页面 ↺
```

### 6.3 季节性营销日历

| 月份 | 营销主题 | 内容/活动 |
|------|---------|----------|
| **7-8月** | 返校季准备 | "School Readiness" 指南、词表评估工具、教师开学资源包 |
| **9月** | 返校高峰 | 限时优惠（首月 $0.99）、教师免费试用 |
| **10月** | 万圣节主题 | Halloween Sight Word 游戏、主题闪卡 |
| **11月** | 感恩季 + 黑五 | 年度最大折扣（年付 50% off）、感恩主题工作表 |
| **12月** | 圣诞主题 | Christmas Sight Word Activities、假期学习建议 |
| **1月** | 新学期/新年 | 新学年目标、阅读挑战活动 |
| **2月** | 情人节 + 阅读月预热 | Valentine's Day 主题闪卡、阅读月预告 |
| **3月** | 全国阅读月 | 阅读挑战赛、每日一词活动、大促 |
| **4月** | 春季 + 地球日 | Spring/Earth Day 主题、期末评估工具 |
| **5月** | 学年末 | 学年总结报告、暑期学习包预售 |
| **6-7月** | 暑期学习 | "Prevent Summer Slide" 专题、暑期学习计划 |

---

## 七、开发路线图

### Phase 0：前期准备（第 0-1 周）

- [ ] 注册域名（wordsprout.com 或备选）
- [ ] 搭建 Next.js 项目脚手架
- [ ] 配置 Supabase 免费版数据库 + 认证
- [ ] 导入 Dolch 220 词 + Fry 前 300 词数据
- [ ] **准备 Heart Words 标注数据**：为 220 个 Dolch 词标注可解码部分（绿色）和需记忆部分（红色♥），约 60-70% 的词完全可解码不需标注，30-40% 含不规则部分。参考 Really Great Reading 的 Heart Word Magic 资源或聘请阅读教学顾问协助
- [ ] 录制/生成所有单词的发音音频（TTS 或真人录制）
- [ ] 设计基础 UI 设计系统（配色、字体、组件库）
- [ ] **设置 GitHub Actions 心跳**：每 6 小时 ping /api/health 端点，防止 Supabase 免费版 7 天无活动自动暂停
- [ ] **起草隐私政策和 COPPA 家长同意流程**

### Phase 1：MVP 开发（第 1-6 周）

**第 1-2 周：SEO 页面 + 基础闪卡**
- [ ] Dolch 220 词详情页（SSG）
- [ ] 年级分类页面
- [ ] 互动闪卡组件（翻转动画 + 发音播放）
- [ ] 基础 SRS 算法实现

**第 3-4 周：游戏 + PDF 生成**
- [ ] Word Match 游戏
- [ ] Build the Word 拖拽游戏
- [ ] 可打印闪卡 PDF 生成（@react-pdf/renderer）
- [ ] 基础工作表生成（描红 + 填空）

**第 5-6 周：用户系统 + 上线**
- [ ] 注册/登录（NextAuth.js）
- [ ] 学生档案创建
- [ ] 进度仪表盘（基础版）
- [ ] Stripe 支付集成
- [ ] 部署上线 + Google Search Console 提交
- [ ] 10 篇核心博客发布

### Phase 2：增长迭代（第 7-14 周）

- [ ] 新增 4 个游戏（Bingo、Color by Word、打地鼠、Word Hunt）
- [ ] 语音跟读功能（Web Speech API）
- [ ] 家长邮件周报（Resend 集成）
- [ ] Mediavine 广告申请（流量达标后）
- [ ] TPT 店铺开设 + 首批 6 个产品
- [ ] Etsy 店铺开设 + 首批产品
- [ ] Pinterest 营销启动
- [ ] 邮件自动化序列搭建
- [ ] 每周 2-3 篇博客持续发布

### Phase 3a：教师基础功能（第 15-20 周）

- [ ] 教师工具模块开发
- [ ] 班级邀请链接（教师分享链接，家长自行加入，无需手动输入学生姓名）
- [ ] 自定义词表导入（支持学校指定词表）
- [ ] 学生个人进度视图（取代原热力图方案）
- [ ] 差异化批量打印（按每个学生的弱项生成不同闪卡集）
- [ ] 评估报告双版本（家长友好 PDF + 管理员数据 CSV）
- [ ] 可视化学习曲线、成就系统

### Phase 3b：高级功能（第 21-30 周，按需开发）

- [ ] Google Classroom OAuth 同步（需注册 Google Workspace Marketplace 应用 + 安全审查）
- [ ] AI 生成故事功能
- [ ] 多主题可打印资源
- [ ] PWA 离线支持
- [ ] 学区/学校团购方案（含 COPPA/FERPA 合规文档准备）
- [ ] YouTube 频道开设

---

## 八、风险评估与应对

| 风险 | 严重度 | 概率 | 应对措施 |
|------|--------|------|---------|
| **COPPA 合规风险** | **高** | **高** | 产品面向 4-7 岁儿童，必须遵守 COPPA；学生不能自行注册，必须由家长/教师创建档案；不直接收集儿童个人信息 |
| **Science of Reading 冲击** | **高** | **高** | 采用 Heart Words 方法，标注可解码/需记忆部分；营销语言避免"memorize"，改用"learn high-frequency words with phonics support" |
| SEO 排名上不去 | 高 | 中 | 程序化页面 + 长尾词策略 + 高质量内容 |
| 免费用户不转付费 | 高 | 中 | 强 Free → Pro 转化漏斗（邮件序列 + 功能限制） |
| 暑假流量断崖 | 中 | 高 | 暑期专题内容 + "Summer Slide" 营销 |
| 教师工具重复建设（班级管理已有 Google Classroom） | 中 | 高 | 不做手动班级管理，改为班级邀请链接；Google Classroom 同步推迟到学区采购阶段 |
| 竞品快速跟进 | 中 | 低 | 深耕垂直 + 教师社区壁垒 + 快速迭代 |
| 广告收入波动 | 低 | 中 | 多元化收入结构，不依赖单一来源 |
| AI 生成内容质量 | 低 | 中 | 人工审核 + 模板化生成而非完全自由生成 |
| 技术债务积累 | 中 | 中 | 保持 MVP 心态，不过度设计 |

---

## 八.五、教师模块设计依据与修正说明

> 本章记录教师工具的设计决策依据，基于 2025-2026 年美国 K-2 教师市场调研。

### 8.5.1 为什么删除"班级管理（手动添加学生）"

**教师已经在 Google Classroom / Seesaw / PowerSchool 管理学生名册。** 让教师在另一个工具中重新输入 25 个学生的姓名是阻力而非功能。EdWeek 研究显示：学区平均部署 200+ 个教育软件，但 **2/3 的教育软件从未被使用**，主要原因是教师反感重复数据录入。

**修正方案**：教师通过生成班级邀请链接分享给家长，家长点击后自行创建学生档案并加入班级。教师无需手动输入任何学生信息。Google Classroom 同步推迟到 P2b 学区采购阶段。

### 8.5.2 为什么"热力图"改为"学生个人进度视图"

教师在 Reddit（r/kindergarten, r/Teachers）和 Facebook 教师群中一致反馈：他们关心的是 **"Johnny 还差哪些词"**，不是全班掌握率热力图。热力图是校长和学区管理员的需求，不是一线教师的工作日常。

**修正方案**：
- 教师视图：学生列表 → 点击学生 → 个人词表（已掌握 ✓ / 学习中 ◐ / 未开始 ○）
- 管理员视图（可选附加）：班级/年级级别的汇总热力图
- 家长视图：每月自动发送的 PDF 进度报告

### 8.5.3 为什么新增 Heart Words 标注

**这是最大的外部风险。** "Sold a Story" 播客引发全美阅读教学改革，26+ 个州已通过阅读改革法案。纯视觉记忆式 sight word 教学正在被淘汰：

| 传统方法 | Science of Reading 方法 |
|---------|----------------------|
| 闪卡展示整个词 → 视觉记忆 | 拆分词为可解码部分 + 不可解码部分 |
| 所有高频词都"整体认读" | 只有真正不规则的词需要记忆（Heart Words） |
| "记住 the 长什么样" | "the 的 th 可以拼读，e 是不规则部分（标心形♥）" |

**Heart Words 方法**：将每个高频词标注为可解码部分（绿色，可拼读）和需记忆部分（红色心形♥，不规则拼写）。例如：
- **the** → th（可拼读）+ **e**（♥ 需记忆）
- **said** → s（可拼读）+ **ai**（♥ 需记忆）+ d（可拼读）
- **and** → a-n-d（全部可拼读，不需要 Heart Word 方法）

**产品实现**：
- 闪卡上视觉区分可解码/需记忆部分（颜色编码）
- 游戏中加入音素分解（phoneme segmentation）环节
- 博客内容采用 SoR 对齐的教学语言

**营销语言调整**：
- ~~"memorize sight words"~~ → "learn high-frequency words with phonics support"
- ~~"sight word flashcards"~~ → "high-frequency word practice aligned with Science of Reading"
- SEO 页面同时覆盖 "sight words" 和 "heart words" 搜索词

### 8.5.4 为什么"统一批量打印"改为"差异化批量打印"

教师从 TPT 上已能获取大量免费/低价的可打印闪卡。如果 WordSprout 只能打印全班统一的闪卡集，与 TPT 相比没有优势。

**差异化打印**是杀手功能：根据每个学生的进度数据，自动为每个学生生成包含其**未掌握单词**的个性化闪卡集。这在一键打印 25 份不同闪卡集的场景下，没有任何现有工具能做到。

### 8.5.5 为什么评估报告需要双版本

- **家长版 PDF**：直观的进度可视化 + 哪些词已掌握 + 哪些词正在学 + 家庭练习建议
- **管理员版 CSV**：详细的逐词数据 + 季度对比 + 班级/年级统计汇总

教师需要向两个不同受众报告进度，单一格式无法满足。

### 8.5.6 竞品对标

| 竞品 | 价格 | 教师评价 | WordSprout 差异化 |
|------|------|---------|-----------------|
| ESGI | $225-288/年 | 功能强但太贵，教师群频繁问"有没有便宜替代品" | **价格仅 1/3**，且包含闪卡+游戏+打印 |
| Boom Cards | 免费/付费 | 练习工具，不含评估和进度追踪 | WordSprout 有完整 SRS + 评估 |
| Seesaw | 免费/学区付费 | 学生作品集平台，非专门的识字工具 | WordSprout 垂直聚焦识字 |
| TPT 免费资源 | 免费 | 碎片化，无进度追踪，不统一 | WordSprout 统一平台 + 进度追踪 |
| Education.com | $10/月 | 工具全面但臃肿，sight word 只是冰山一角 | WordSprout 专注垂直，轻量 |
| **Starfall** | **$35/年** | **K-5 读写+数学，homeschool 社区口碑极好** | **WordSprout 年付 $39.99 略贵且范围窄，但垂直深度更强** |

### 8.5.7 Starfall 竞品补充说明

Starfall 是 WordSprout **年付家长订阅**的直接竞品。以 $35/年提供完整的 K-5 读写 + 数学内容，且在 homeschool 社区有极强口碑。

**应对策略**：
- WordSprout 的差异化在于**垂直深度**（SRS 间隔重复、差异化打印、Heart Words 标注），Starfall 不提供这些
- 定价考虑：$39.99/年 vs Starfall $35/年，WordSprout 价格略高但功能更专业
- 如果家长只需要基础的"给孩子玩着学"，Starfall 是更好的选择；如果家长需要**数据驱动的进度追踪和定制化资源**，WordSprout 更优
- 建议年付价格考虑降至 **$29.99/年** 以建立对 Starfall 的价格优势

---

## 八.六、COPPA 合规说明

> 产品面向 4-7 岁儿童，**COPPA（Children's Online Privacy Protection Act）** 是美国联邦法律，不合规将面临 FTC 罚款（最高 $50,120/次违规）。

### 合规要求与实现方案

| COPPA 要求 | WordSprout 实现方案 |
|-----------|-------------------|
| 不得直接向 13 岁以下儿童收集个人信息 | 学生不能自行注册账号，必须由家长/教师创建学生档案 |
| 收集儿童数据前需获得可验证的家长同意 | 注册时家长需勾选同意条款 + 邮件确认（Parental Consent Gate） |
| 需要公开的隐私政策 | 上线前发布 /privacy 页面，说明收集哪些数据、如何使用 |
| 家长有权查看/删除孩子的数据 | 设置页面提供"删除学生档案及所有学习数据"功能 |
| 数据最小化原则 | 只收集必要的进度数据（哪个词对/错），不收集照片、位置等敏感信息 |

### 技术实现

- 用户表 `role` 字段区分 `parent` / `teacher`，**没有 `student` 角色**
- 学生档案 (`students` 表) 由家长/教师创建和管理，学生自身无登录凭据
- 学习进度数据 (`learning_progress`) 关联到学生档案，不直接关联到任何可识别身份的账户
- 不使用第三方追踪 SDK（如 Google Analytics）收集儿童行为数据，使用自托管的 PostHog 或仅服务端日志

---

## 九、最终结论与建议

### 值不值得做？

**值得做，但需要管理预期：**

1. **这是一个慢生意** — SEO 需要 6-12 个月才能看到显著效果，不是快钱项目
2. **天花板有限但下限有保障** — 垂直领域工具站不太可能月入 $50K，但月入 $5K-$15K 是可实现的
3. **成本极低** — 年运营成本 $1,000-1,700，风险极小
4. **可复制性强** — 一旦跑通 sight word 赛道，可复制到 phonics、math、handwriting 等其他教育垂直

### 最关键的三个成功因素

1. **SEO 内容执行力** — 300+ 页面的质量和数量决定了流量基础
2. **免费 → 付费的转化设计** — 用户体验到价值后自然转化，而不是硬卖
3. **Pinterest + TPT 双渠道引流** — 这两个渠道是教育垂直的流量富矿

### 如果只能做三件事

1. **把 300+ SEO 页面做好** — 这是流量基石
2. **做好免费可打印 PDF** — 这是邮箱收集和用户留存的利器
3. **开学季（8-9 月）前上线** — 全年最大的流量窗口不可错过

---

*文档结束 — 如需进一步细化任何模块，请提出具体需求。*

核心词：  sight word flashcards（主流量入口）
         ↓ 扩展为完整矩阵
长尾词簇：
├── sight word flashcards printable（最高搜索量变体）
├── dolch sight word flashcards（按词表分类）
├── fry sight word flashcards（按词表分类）
├── sight word flashcards kindergarten（按年级分类）
├── sight word flashcards 1st grade / 2nd grade / 3rd grade
├── sight word flashcards with pictures（带图片版）
├── sight word flashcards PDF（PDF 下载意图）
├── sight word flashcards online / interactive（在线互动版）
├── color by sight word flashcards（游戏化变体）
├── sight word flashcards app（App 意图）
└── editable sight word flashcards（可编辑版，教师刚需）

再扩展到相关工具词：
├── sight word games
├── sight word worksheets
├── sight word assessment
├── phonics flashcards
└── cvc word flashcards