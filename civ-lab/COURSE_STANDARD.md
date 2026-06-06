> ⚠️ **已被取代**：最新权威标准请用同目录 **`章节标准模板.md`**（以「古典思想与帝国」为定型范本）。
> 本文件为早期版本，仅留作参考。

# 🏛 AI 世界文明实验室 · 标准模式 Master Prompt（旧版·已被章节标准模板取代）

> 这是产品最终定型的「模式」完整说明书。任何新课程/新阶段都按它复制。
> 用法：开新对话，复制「===== PROMPT 开始 =====」到「===== PROMPT 结束 =====」之间全部内容，
> 粘贴给 Claude，在最后一行写明本次要做的课程即可（示例已填「古典帝国」）。

---

===== PROMPT 开始 =====

你是「AI 世界文明实验室」的课程开发工程师。这是给 10–15 岁中学生的世界历史互动学习产品。
下面是产品**最终定型的标准模式**（已在「早期文明」阶段完整跑通）。请用**完全相同的架构、数据结构、设计、功能、自检标准**开发我指定的新课程，做到与现有模块一致、可直接接入主站。**不要重新发明交互或结构，只新增同结构的内容数据。**

## 0. 项目与部署
- 源码目录：`/Users/baibai/CivLab/`
- 部署：`crystalbai88-code/my-website` 仓库的 `civ-lab/` 子目录；本地
  `/Users/baibai/Documents/Codex/2026-05-10/ai-ai-a-i-a-i/my-website/civ-lab/`
- 线上：`https://ai00.tech/civ-lab/`
- 发布流程：改文件 → `cp` 到部署 civ-lab/ → `git add && commit && push`（GitHub Pages 自动发布）。
- 主站 `index.html` 用 `?v=NN` 给 app.js/data.js/styles.css 做缓存刷新；改这三个文件就把版本号 +1。

## 1. 文件清单与职责（复制时照此组织）
- `index.html` + `app.js` + `data.js` + `styles.css`：主站（7 阶段大卡片导航）。`data.js→MAIN_NETWORK.stages` 定义阶段；`app.js→enterStage()` 拦截已上线阶段跳转到其探索应用；卡片 `featured:true` 显示「✨ 完整版」徽章。
- `civ-explorer-d.html`：**总览页**（宇宙时间长河，独立页，自带 4 主题/AI/总地图/总汇表）。
- `civ-deep.html`：**深度页路由器**，按 hash 渲染：`#/civ/<id>` 文明页（教科书三段）、`#/person/<id>` 人物页（放射）、`#/event/<id>` 事件页（放射）；含 AI/朗读/维基/遗址地图/前进返回/主题切换。
- `early_civ_deep.js`：**内容数据库**（CIV_DEEP / EVENT_DEEP / PERSON_DEEP / CIV_MAP / SITE_MODERN / CIV_MYTHS）。新阶段可新建 `<stage>_deep.js` 同结构，并在两个页面 `<script>` 引入。
- `chapters_data.js`：**章节骨架**（CHAPTERS 按 500 年分章 + FINAL_OVERVIEW 总汇）。
- `early_civ_explorer_data.js`：文明基础信息（id/name/color/起止年/地理 lane）。
- 其它 `civ-explorer-a/b/c/e.html`、`civ-explorer-compare.html`、`civ-explorer.html` 是历史风格/旧版，保留备查，勿动。

## 2. 三层导航（核心模式，务必复用）
1. **总览页（宇宙时间长河）**：横轴=真实时间，每个文明一条「存续光条」(淡→浓→淡 = 崛起→巅峰→衰落)，按地理 lane 分行。悬浮显示「同期共存文明」。右下竖排圆按钮 🏁总汇表/🗺总地图/🤖AI。点文明 → 进深度页。文明只显名字（无多余小字），起止年放进悬浮提示避免遮挡。
2. **文明深度页**：教科书三段——① Hero(大图标球+名+时间范围+一句话) ② 「了解这个文明」通识卡片网格(📖叙事/🏛基础/💡发明/🌍关系/🗺地图/⚠️误解/⏳崩溃/🎁遗产) ③ 「时间线·事件与人物」按 500 年分期、每期事件行+人物行**一一对应**。
3. **人物/事件页**：放射宇宙图（中心大球+周围卫星）。人物卫星=朋友圈/参与事件；事件卫星=因果链/关键人物/证据。点实体卫星跳转；点章节卫星 → 底部滑出米黄卷轴文字面板。**球/字号/半径要大，铺满画面不显空；手机版由 JS 按断点放大。**

## 3. 数据结构（新内容＝填同结构）
- `CIV_DEEP[id]={pronunciation,capital_at_peak,territory_max,population_peak,language,writing,religion,economy,opening_narrative(400+字),nine_inventions:[{name,year,body}],collapse_chain:[]}`
- `EVENT_DEEP[id]={full_title,one_liner,narrative(300+字),context_before,what_happened:[时间线],significance,evidence:[{artifact,what,held}],leads_to,misconception?,related_people:[]}`
- `PERSON_DEEP[id]={full_name(中+英),pronunciation,lifespan_real/lifespan_mythic,historical_or_mythic,biography(500+字),childhood,achievements_detail:[{name,detail,proof}],death,legacy,sources:[],related:[{id,relation,note}]}`
- `CIV_MAP[id]=[{name:'中文 English',coords:[lat,lng],note}]` （Leaflet+OSM 真实遗址）
- `SITE_MODERN['遗址名']='今 X国·X省/市'`（遗址现代位置，地图弹窗+清单显示）
- `CIV_MYTHS[id]=[{myth:'❌',truth:'✓',why:'为何误解'}]`
- `CHAPTERS[]`：`{no,range,range_y,title,subtitle,hero_question,icon,mood_grad,world_context,active_civs:[{id,state,in_period_summary,L1,L2,L3_events:[],L4_people:[],L5_full:'CIV_DEEP.xxx'}]}`
- `FINAL_OVERVIEW={civs:[{id,name,color,spans:[[章号,'rise|peak|fade|collapse']],legacy}],today_legacy:[{what,from,why}]}`
- 图标映射（在 civ-deep + 总览页各定义一份，保持一致）：`CIV_ICON`（文明）、`PERSON_ICON`（人物按身份）、`EVENT_ICON`（事件按内容）。

## 4. 内容标准
- **来源分级只用 A/B/C，禁 D**：A=博物馆/Nature/Britannica/UNESCO/大学教材；B=DK/NatGeo Kids（生动但成人也能读，不要"小朋友"语气）；C=自有课程模型；D（短视频/未标注网页/AI编造）严禁。
- 每文明：完整叙事+9大基础字段+关键发明+崩溃链+≥3事件+≥3人物+遗址坐标+现代位置+常见误解。
- 事件 300+字、人物 500+字；史实准确、有争议处注明（如「纣王暴行可能被周朝夸大，历史由胜利者书写」）；客观、培养批判性思维。
- 可查到的专名才链维基，遗址都标"今天在哪"。

## 5. 设计规范
- **4 主题**（CSS 变量，一键切换，localStorage `civ_theme` 全站共享），默认 **textbook**：
  textbook 现代教科书=白底+靛蓝#2d4a7c+无衬线；museum 博物馆=象牙白#f7f3ea+墨黑+赭石#9c5b34+衬线；parchment 羊皮纸=米黄#efe3c8+陶土#b5642a；deepblue 深蓝=#131a2a+暖金#d4a858。
  主题只改背景/文字/强调色/星空；**文明身份色不变**。
- 字大、对比强、留白足、节点铺满。
- **图标必须贴合内容、不出戏**：🚫禁 📅(苹果渲染成"JUL 17")；事件用 🏛️🏙️✍️⚱️⚔️⚖️🔺🌋🐴⛵💥 等；人物按身份 👑⚔️📜🌙⚖️🦁🐂 等；文明用 CIV_ICON 统一。

## 6. 功能组件（已实现，直接复用）
- 🤖 AI 问答：千问 qwen-turbo SSE 流式，带当前实体上下文，面板用主题变量配色，Key 存 `civ_qwen_key`。
- 🔊 朗读：Web Speech zh-CN，播放变绿脉冲再点停。
- 🔍 维基双语：文字面板底部，**扫描该段正文真出现的专名**才挂（KB_DICT 词典），中文维基+英文维基双链，去重，只链专名实体。
- 🗺 遗址地图：Leaflet+OSM(无 key)，真实坐标+现代位置；总览页有「文明总地图」汇总。
- ◀▶ 前进/返回（自维护历史栈）+「返回主站」。

## 7. 手机适配（必做）
- viewport meta；宇宙图字号/球体由 JS 按 `matchMedia('(max-width:768px)')` 计算放大（不要只用 CSS media 改字号→气泡宽度不匹配会溢出）；跨断点重新渲染。文明页卡片手机 2 列、时间线竖排、地图降高、AI 全宽。

## 8. 交付前自检（每次必跑）
- chapters 引用的所有 event/person id 都有 DEEP 定义；无重复 key；L5_full 的 CIV_DEEP 都存在；CIV_MAP 每遗址都有 SITE_MODERN。
- id 拼写一致（踩坑：homepage 用 `mycenaean` 但底层 `mycenae` → 颜色回退灰色，要用完整配色 fallback map）。
- 无 📅、无残留英文/指令式文字（HOW TO / FORM X / 点击→ / BIOGRAPHY 等）。
- 括号平衡；Chrome 可解析（JSC 对中文正则 `[一-鿿]` 误报"range out of order"，忽略）。
- 桌面+手机都验证。

## 9. 「早期文明」内容现状（已完成，作为标准样板与去重参照）
已完成 13 文明：sumer / egypt_predynastic / egypt_old / egypt_new / indus_early / indus / akkad / babylon / minoan / mycenaean / hittite / shang / collapse。
约 30+ 事件、37 人物、50 遗址坐标，全部含现代位置与常见误解。做新阶段时，新阶段文明若与已有有承接关系（如波斯继承巴比伦、希腊继承迈锡尼），在叙事/关系里呼应。

## 工作方式
- 大批量内容分批写、分批 commit，每批跑自检；改完即 push 并给我线上验证地址；史实存疑就标注，不编造。

【本次要做的课程/阶段】：古典帝国（STAGE_02 古典思想与帝国，约前 1000 – 公元 500）。覆盖：中国（西周/春秋战国诸子百家/秦/汉，孔子·老子·墨子·孟子·韩非·秦始皇·汉武帝）、印度（吠陀/佛教/孔雀王朝，释迦牟尼·阿育王）、波斯（居鲁士·大流士·阿契美尼德帝国）、希腊（雅典民主/苏格拉底·柏拉图·亚里士多德/亚历山大）、罗马（共和到帝国，凯撒·奥古斯都）。做成同款：宇宙总览页 + 文明/人物/事件深度页 + 遗址地图(带现代位置) + 常见误解 + 同时代视图 + 总汇表；并把它接入主站 STAGE_02。

===== PROMPT 结束 =====
