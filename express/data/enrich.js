/* =====================================================================
 * 双语内容库 · Bilingual Enrichment Library
 * 暖身问题 / 通识卡片 / 思辨题 / 伙伴台词 —— 全部原创，中英双语
 * 伙伴设定：小羽 Quill，一只爱提问的小猫头鹰。
 *   它读过很多故事，但爪子握不住笔，所以只能靠提问收集故事。
 *   它不是老师，是同桌；它也会试着回答问题，但常常答得没你好。
 * ===================================================================== */
window.ENRICH = {

  buddy: {
    name: { zh: "小羽", en: "Quill" },
    intro: {
      zh: "嗨！我是小羽，一只特别爱问问题的猫头鹰。我读过好多好多故事，可惜我的爪子握不住笔——所以今天换你来讲，我来问！",
      en: "Hi! I'm Quill, an owl who's bursting with questions. I've read piles of stories, but my claws can't hold a pen — so today YOU tell the story, and I'll ask!",
    },
    praise: [
      { zh: "哇，这句我能想象出画面！", en: "Wow, I can picture that!" },
      { zh: "这个我从来没想到过——记到我的羽毛笔记本里！", en: "I'd never have thought of that — into my feather notebook it goes!" },
      { zh: "你刚才说的，比我读过的好多书都真实。", en: "That felt more real than lots of books I've read." },
      { zh: "停一下——这句太棒了，让我多看两眼。", en: "Wait — that line is so good I need a second look." },
    ],
    thinking: { zh: "让我想想怎么问……", en: "Hmm, let me think of a good question..." },
    taught: {
      zh: "学到了！我把它写进我的羽毛笔记本啦。下次有小朋友卡住，我就把你的办法借给ta。",
      en: "Got it! It's going straight into my feather notebook. Next time a kid gets stuck, I'll lend them YOUR trick.",
    },
  },

  /* ---------- 暖身 · Warm-ups（开脑洞，无对错） ---------- */
  warmups: [
    { id: "W1", zh: "如果动物会说话，你最想采访哪一只？想问它什么？", en: "If animals could talk, which one would you interview — and what would you ask?" },
    { id: "W2", zh: "二选一：会飞但飞得很慢，还是跑得超快但刹不住车？为什么？", en: "Would you rather fly very slowly, or run super fast with no brakes? Why?", chips: [{ zh: "慢慢飞", en: "Fly slowly" }, { zh: "狂奔不停", en: "Run with no brakes" }] },
    { id: "W3", zh: "如果「错误」会发光，世界会更好玩，还是更尴尬？", en: "If mistakes glowed in the dark, would the world be more fun or more embarrassing?", chips: [{ zh: "更好玩", en: "More fun" }, { zh: "更尴尬", en: "More embarrassing" }] },
    { id: "W4", zh: "时间机器只能坐一次：你去过去还是未来？去干嘛？", en: "One ride in a time machine: past or future? What for?", chips: [{ zh: "过去", en: "The past" }, { zh: "未来", en: "The future" }] },
    { id: "W5", zh: "月亮上要开第一家商店，店长是你——你打算卖什么？", en: "The Moon is opening its very first shop, and you're the boss. What do you sell?" },
    { id: "W6", zh: "给「勇敢」选一种颜色，你会选什么？为什么？", en: "If courage had a color, what would it be? Why?" },
    { id: "W7", zh: "二选一：听懂全世界的语言，还是能和任何动物聊天？", en: "Understand every human language, or chat with any animal?", chips: [{ zh: "全部语言", en: "Every language" }, { zh: "动物聊天", en: "Animal chat" }] },
    { id: "W8", zh: "如果你的影子今天可以替你做一件事，你让它做什么？", en: "If your shadow could do ONE thing for you today, what would you make it do?" },
    { id: "W9", zh: "一种味道可以装进瓶子永远保存，你装哪种？", en: "You can bottle one smell and keep it forever. Which one?" },
    { id: "W10", zh: "如果回忆是照片，你最想先保存哪一张？", en: "If memories were photos, which one would you save first?" },
    { id: "W11", zh: "「无聊」是一件坏事吗？", en: "Is being bored a bad thing?", chips: [{ zh: "是坏事", en: "Yes, bad" }, { zh: "不一定", en: "Not always" }] },
    { id: "W12", zh: "今天悄悄多出一个小时，只有你知道——你用来干嘛？", en: "You secretly get one extra hour today, and nobody else knows. What do you do with it?" },
  ],

  /* ---------- 通识卡 · Wonder Cards（科学/历史/中西哲思/媒介素养） ---------- */
  cards: [
    {
      id: "K1", theme: "perseverance", emoji: "💡",
      title: { zh: "大脑是怎么变强的", en: "How Your Brain Gets Stronger" },
      hook: {
        zh: "爱迪生为灯泡试了上千种材料。有人问他失败这么多次难不难过，他说：我没有失败，我只是找到了一千种行不通的方法。",
        en: "Edison tried over a thousand materials for the light bulb. Asked if failing so often hurt, he said: \"I haven't failed — I've found a thousand ways that don't work.\"",
      },
      fact: {
        zh: "科学家发现：每次你练习一件难的事，大脑里的神经连接真的会变粗——就像走的人多了，小路会变成大路。",
        en: "Scientists found that practicing something hard makes your brain's connections physically stronger — like a footpath turning into a road the more people walk it.",
      },
      quote: { zh: "「锲而不舍，金石可镂。」——荀子", en: "\"Keep carving, and even metal and stone can be engraved.\" — Xunzi, ancient Chinese philosopher" },
      think: { zh: "「放弃」和「休息一下再来」有什么不一样？", en: "What's the difference between giving up and taking a break?" },
      buddyTry: { zh: "我的答案是：休息的人还会回来，放弃的人不回来了。你觉得我说得对吗？", en: "My guess: a rester comes back; a quitter doesn't. Am I close?" },
    },
    {
      id: "K2", theme: "time", emoji: "⏳",
      title: { zh: "时间为什么会变快变慢", en: "Why Time Speeds Up and Slows Down" },
      hook: {
        zh: "排队十分钟像一小时，玩游戏一小时像十分钟。钟没有变，变的是你的注意力——心理学家发现：越盯着时间，时间走得越慢。",
        en: "Ten minutes in a queue feels like an hour; an hour of games feels like ten minutes. The clock didn't change — your attention did. Psychologists found: the harder you watch time, the slower it crawls.",
      },
      fact: {
        zh: "中文说「度日如年」，英文说 A watched pot never boils（盯着的水壶永远不开）。两种语言，同一个发现！",
        en: "Chinese says \"a day drags like a year\"; English says \"a watched pot never boils.\" Two languages, one discovery!",
      },
      quote: { zh: "「逝者如斯夫，不舍昼夜。」——孔子（时间像河水，日夜不停）", en: "\"Time flows on like this river, never stopping day or night.\" — Confucius" },
      think: { zh: "你愿意活在「过得快」的日子里，还是「过得慢」的日子里？", en: "Would you rather live days that feel fast, or days that feel slow?" },
      buddyTry: { zh: "我猜：开心的时候，我们忘了看钟，所以时间偷偷跑掉了。", en: "My guess: when we're happy we forget to watch the clock, so time sneaks away." },
    },
    {
      id: "K3", theme: "failure", emoji: "🧫",
      title: { zh: "发霉的盘子救了几亿人", en: "The Moldy Dish That Saved Millions" },
      hook: {
        zh: "1928年，科学家弗莱明度假回来，发现培养皿发霉了——实验失败。但他凑近一看：霉菌周围的细菌全死了。这个「失败」后来变成了青霉素，救了上亿人的命。",
        en: "In 1928, scientist Alexander Fleming came back from holiday to a ruined, moldy dish — a failed experiment. But up close, all the bacteria around the mold were dead. That \"failure\" became penicillin, which has saved millions of lives.",
      },
      fact: {
        zh: "很多大发现都来自「出错的瞬间」：微波炉、便利贴、薯片，都是失误的副产品。",
        en: "Lots of big inventions came from mistakes: the microwave oven, sticky notes, even potato chips.",
      },
      quote: { zh: "「失败是成功之母。」——中国谚语", en: "\"Failure is the mother of success.\" — Chinese proverb" },
      think: { zh: "失败要在什么时候，才会变成一份礼物？", en: "When does a failure turn into a gift?" },
      buddyTry: { zh: "我觉得：失败变礼物，要等有人弯腰从里面捡走点什么。", en: "I think a failure becomes a gift only when someone bends down and picks something out of it." },
    },
    {
      id: "K4", theme: "independence", emoji: "🐾",
      title: { zh: "人是在哪里长大的", en: "Where Growing Up Happens" },
      hook: {
        zh: "心理学家把你已经会的事叫「舒适区」，把踮起脚才够得着的事叫「学习区」。人不是在舒服的时候长大的——是在学习区里，一次次踮脚的时候长大的。",
        en: "Psychologists call what you can already do your \"comfort zone,\" and what you can barely reach your \"learning zone.\" We don't grow while comfortable — we grow in the learning zone, one tiptoe-stretch at a time.",
      },
      fact: {
        zh: "第一次自己做某件事时心跳加速，是身体在给你调集能量，不是出毛病。",
        en: "A racing heart during your first solo try is your body sending you extra power — not something going wrong.",
      },
      quote: { zh: "「千里之行，始于足下。」——老子", en: "\"A journey of a thousand miles begins with a single step.\" — Laozi" },
      think: { zh: "为什么很多事，第二次做就突然变简单了？", en: "Why do things suddenly get easier the second time?" },
      buddyTry: { zh: "我猜：因为第一次把大部分「害怕」用掉了？", en: "Maybe because the first time used up most of the scary?" },
    },
    {
      id: "K5", theme: "change", emoji: "🐎",
      title: { zh: "塞翁失马", en: "The Old Man Who Lost His Horse" },
      hook: {
        zh: "古时候一位老人丢了马，邻居说「真倒霉」，他说「未必」。马自己回来了，还带回一群野马，邻居说「真幸运」，他说「未必」。儿子骑野马摔断了腿——却因此躲过了战争。",
        en: "An old man lost his horse. \"Bad luck!\" said the neighbors. \"We'll see,\" he said. The horse came back leading wild horses. \"Good luck!\" \"We'll see.\" His son broke a leg riding one — and was spared from going to war.",
      },
      fact: {
        zh: "英文里也有同样的智慧：When one door closes, another opens（一扇门关上，另一扇会打开）。",
        en: "English has the same wisdom: \"When one door closes, another opens.\"",
      },
      quote: { zh: "「祸兮福之所倚，福兮祸之所伏。」——老子", en: "\"Good fortune leans on bad; bad fortune hides behind good.\" — Laozi" },
      think: { zh: "你有没有遇到过「当时觉得糟糕，后来觉得幸好」的事？", en: "Has something ever felt terrible at first, but turned out fine — or even lucky?" },
      buddyTry: { zh: "我有！有次我迷路了，结果发现了一棵全是萤火虫的树。", en: "I have! Once I got lost — and found a tree full of fireflies." },
    },
    {
      id: "K6", theme: "misunderstanding", emoji: "🐘",
      title: { zh: "盲人摸象", en: "The Blind Men and the Elephant" },
      hook: {
        zh: "几个盲人摸同一头大象。摸到腿的说「像柱子」，摸到耳朵的说「像扇子」，摸到尾巴的说「像绳子」。没有一个人说谎——但也没有一个人摸到完整的大象。",
        en: "Several blind men touched the same elephant. One felt a leg: \"It's a pillar!\" One felt an ear: \"A fan!\" One felt the tail: \"A rope!\" Nobody lied — but nobody had the whole elephant either.",
      },
      fact: {
        zh: "心理学家说，每个人都戴着自己经历做成的「眼镜」看世界，所以同一件事会有好几种讲法。",
        en: "Psychologists say we each see the world through glasses made of our own experiences — so one event can have many true-feeling versions.",
      },
      quote: { zh: "「横看成岭侧成峰，远近高低各不同。」——苏轼", en: "\"A range when seen sideways, a peak when seen head-on.\" — Su Shi, on how one mountain has many faces" },
      think: { zh: "两个人对同一件事的说法不一样，一定有一个人在说谎吗？", en: "If two people describe the same event differently, must one of them be lying?" },
      buddyTry: { zh: "我觉得未必——也许他们只是摸到了大象的不同地方。", en: "Not necessarily — maybe they just touched different parts of the elephant." },
    },
    {
      id: "K7", theme: "courage", emoji: "🔥",
      title: { zh: "勇敢不是不害怕", en: "Courage Isn't Not Being Afraid" },
      hook: {
        zh: "心理学家研究消防员和宇航员，发现他们出任务时也会心跳加速、手心出汗。勇敢不是没有害怕——而是害怕的时候，手和脚还愿意往前。",
        en: "Psychologists studied firefighters and astronauts: on missions, their hearts race and their palms sweat too. Courage isn't the absence of fear — it's hands and feet that keep moving while you're afraid.",
      },
      fact: {
        zh: "「紧张」和「兴奋」在身体里几乎长得一模一样——心理学家发现，对自己说「我很兴奋」的人，表现比说「冷静点」的人更好。",
        en: "\"Nervous\" and \"excited\" look almost identical inside your body. People who tell themselves \"I'm excited!\" perform better than those who say \"calm down.\"",
      },
      quote: { zh: "「虽千万人，吾往矣。」——孟子", en: "\"Though thousands stand against me, still I go forward.\" — Mencius" },
      think: { zh: "「勇敢」和「鲁莽」（不看危险乱冲）的差别在哪里？", en: "What's the difference between being brave and being reckless?" },
      buddyTry: { zh: "我猜：鲁莽是没看见危险，勇敢是看见了，还是往前走了一步。", en: "My guess: reckless doesn't see the danger; brave sees it — and steps forward anyway." },
    },
    {
      id: "K8", theme: "observation", emoji: "🔍",
      title: { zh: "看见 ≠ 观察", en: "Seeing Is Not Observing" },
      hook: {
        zh: "达·芬奇的笔记本里画满了水的旋涡、鸟的翅膀、人皱眉的样子。别人每天也看水、看鸟，为什么只有他画得出来？因为他不只是「看见」，他是带着问题在「观察」。",
        en: "Leonardo da Vinci's notebooks overflow with water swirls, birds' wings, frowning faces. Everyone else saw water and birds daily — why could only he draw them? Because he didn't just see. He observed — with a question in his eyes.",
      },
      fact: {
        zh: "侦探福尔摩斯对华生说过一句名言：You see, but you do not observe（你只是在看，没有在观察）。",
        en: "Sherlock Holmes once told Watson: \"You see, but you do not observe.\"",
      },
      quote: { zh: "「世界上不缺少美，缺少的是发现美的眼睛。」——罗丹", en: "\"The world isn't short of beauty — only of eyes that notice it.\" — Auguste Rodin" },
      think: { zh: "挑一样你天天见的东西，你能说出三个别人没注意过的细节吗？", en: "Pick something you see every day. Can you name three details nobody else has noticed?" },
      buddyTry: { zh: "我天天看自己的翅膀，今天才发现每根羽毛的条纹都不一样！", en: "I look at my own wings every day — and only today noticed every feather's stripes are different!" },
    },
    {
      id: "K9", theme: "imagination", emoji: "🚀",
      title: { zh: "小说预言了潜水艇", en: "The Novel That Predicted Submarines" },
      hook: {
        zh: "150多年前，凡尔纳在小说里写了一艘潜入深海的「鹦鹉螺号」——那时真正的潜水艇还没造出来。后来的工程师说，正是这本小说让他们想造一艘真的。",
        en: "Over 150 years ago, Jules Verne wrote about the Nautilus diving deep beneath the sea — before real submarines existed. Engineers later said it was his novel that made them want to build one for real.",
      },
      fact: {
        zh: "手机、视频通话、登月……都先出现在故事里，再出现在世界上。想象是发明的草稿。",
        en: "Phones, video calls, Moon landings — all appeared in stories first, then in the world. Imagination is invention's rough draft.",
      },
      quote: { zh: "「想象力比知识更重要。」——爱因斯坦", en: "\"Imagination is more important than knowledge.\" — Albert Einstein" },
      think: { zh: "想象出来的东西，算不算「真的存在」？", en: "Do imaginary things \"really exist\"?" },
      buddyTry: { zh: "我觉得它们存在于一个叫「还没发生」的世界里。", en: "I think they live in a world called \"Not Yet.\"" },
    },
    {
      id: "K10", theme: "explain", emoji: "🎓",
      title: { zh: "费曼的「笨办法」", en: "Feynman's \"Dumb\" Trick" },
      hook: {
        zh: "大物理学家费曼有个出了名的学习法：把难的东西讲给完全不懂的人听。讲到哪里卡住了，哪里就是你自己其实还没懂的地方。",
        en: "Physicist Richard Feynman had a famous trick: explain hard things to someone who knows nothing about them. Wherever your explanation gets stuck — that's exactly where YOU don't understand yet.",
      },
      fact: {
        zh: "这就是为什么「当小老师」是最快的学习方法——教别人一遍，等于自己学三遍。",
        en: "That's why playing teacher is the fastest way to learn — explaining once equals studying three times.",
      },
      quote: { zh: "「教，然后知困。」——《礼记》（教了别人，才知道自己哪里不懂）", en: "\"Only by teaching do you discover what you don't know.\" — The Book of Rites" },
      think: { zh: "给6岁的小孩讲「为什么天会黑」，和给同学讲，会有什么不一样？", en: "How would you explain \"why it gets dark at night\" to a 6-year-old — versus to a classmate?" },
      buddyTry: { zh: "对6岁小孩，我会说：太阳去地球的另一边串门啦。", en: "To a 6-year-old I'd say: the Sun went to visit the other side of the Earth." },
    },
    {
      id: "K11", theme: "opinion", emoji: "⚖️",
      title: { zh: "事实和观点不是一回事", en: "Facts vs. Opinions" },
      hook: {
        zh: "「今天30度」是事实——可以查证。「今天真热」是观点——隔壁怕冷的爷爷可能觉得刚刚好。分清这两样，是聪明地讨论问题的第一步。",
        en: "\"It's 30°C today\" is a fact — you can check it. \"It's so hot today\" is an opinion — the grandpa next door might find it just right. Telling them apart is step one of every smart discussion.",
      },
      fact: {
        zh: "新闻里、广告里、网上，每天都有人把观点说得像事实。会分辨的人，不容易被忽悠。",
        en: "In news, ads, and online posts, opinions get dressed up as facts every day. People who can tell the difference are much harder to fool.",
      },
      quote: { zh: "「君子和而不同。」——孔子（好的讨论者可以友好地不同意）", en: "\"The wise seek harmony, not sameness.\" — Confucius: good thinkers can disagree and stay friends" },
      think: { zh: "「大家都这么说」，能算一个好理由吗？", en: "Is \"everyone says so\" a good reason?" },
      buddyTry: { zh: "我的检验法：能查证的是事实；会吵起来的，多半是观点。", en: "My test: if you can look it up, it's a fact; if it starts an argument, it's probably an opinion." },
    },
    {
      id: "K12", theme: "promise", emoji: "🪨",
      title: { zh: "秘密是有重量的", en: "Secrets Have Weight" },
      hook: {
        zh: "心理学家发现，守着一个大秘密的人，连看一段上坡路都会觉得更陡——秘密真的会让人觉得「重」。但有一种秘密不该守：让你不舒服、不安全的秘密，要告诉信任的大人。",
        en: "Psychologists found that people carrying a big secret judge hills to be steeper — secrets literally feel heavy. But one kind of secret should never be kept: if it makes you feel unsafe or icky, tell a trusted grown-up.",
      },
      fact: {
        zh: "分清「惊喜的秘密」（生日礼物，迟早会揭晓）和「沉重的秘密」（让你难受的），是保护自己的本领。",
        en: "Telling apart \"surprise secrets\" (a birthday gift, soon revealed) and \"heavy secrets\" (ones that hurt) is a self-protection superpower.",
      },
      quote: { zh: "「与朋友交，言而有信。」——《论语》", en: "\"With friends, let your word be trustworthy.\" — The Analects of Confucius" },
      think: { zh: "什么样的秘密应该守？什么样的必须说出来？", en: "Which secrets should be kept — and which MUST be told?" },
      buddyTry: { zh: "我觉得让人不安的秘密像一块太烫的石头——必须放下，交给大人。", en: "A secret that feels unsafe is like a stone that's too hot — you must put it down and hand it to a grown-up." },
    },
    {
      id: "K13", theme: "people", emoji: "📖",
      title: { zh: "每个人都是一本书", en: "Everyone Is a Book" },
      hook: {
        zh: "作家们有个共识：人物是行动的总和。一个人是谁，不看他说什么，看他做什么。所以写人最好的办法，不是说他「善良」，而是写下他做过的一件小事。",
        en: "Writers agree: a character is the sum of their actions. Who someone is isn't what they say — it's what they do. So the best way to write a person isn't to call them \"kind\" — it's to show one small thing they did.",
      },
      fact: {
        zh: "电影编剧的行话叫 Show, don't tell（演出来，别说出来）——这也是写人的金钥匙。",
        en: "Screenwriters call it \"Show, don't tell\" — the golden key for writing people.",
      },
      quote: { zh: "「听其言而观其行。」——孔子", en: "\"Listen to their words, but watch their deeds.\" — Confucius" },
      think: { zh: "如果只能用一个动作来介绍你最好的朋友，你会选哪个动作？", en: "If you could introduce your best friend with only ONE of their actions, which would you pick?" },
      buddyTry: { zh: "我会选她下雨天把伞悄悄斜向我那个动作。", en: "I'd pick the way she quietly tilts the umbrella toward me in the rain." },
    },
  ],

  /* ---------- 思辨角 · Debate Corner（无标准答案；小羽永远站对面） ---------- */
  debates: [
    {
      id: "D1", theme: "perseverance",
      claim: { zh: "只要坚持，就一定会成功。", en: "If you keep trying, you will always succeed." },
      counterYes: { zh: "可是有人练了十年也没拿到冠军——那他的坚持白费了吗？", en: "But some people train for ten years and never win. Was all that effort wasted?" },
      counterNo: { zh: "可是如果大家都不坚持，是不是什么都做不成？那哪些事值得坚持到底？", en: "But if nobody persisted, nothing would ever get done. So what IS worth sticking with to the very end?" },
    },
    {
      id: "D2", theme: "time",
      claim: { zh: "等待就是浪费时间。", en: "Waiting is a waste of time." },
      counterYes: { zh: "农民要等庄稼长大，医生要等伤口愈合——这些等待也是浪费吗？", en: "Farmers wait for crops to grow; doctors wait for wounds to heal. Is that wasted time too?" },
      counterNo: { zh: "那排一个小时队就为了买一杯奶茶呢？什么样的等待才值得？", en: "What about queuing a whole hour for one bubble tea? Which kinds of waiting are actually worth it?" },
    },
    {
      id: "D3", theme: "failure",
      claim: { zh: "失败是一件好事。", en: "Failure is a good thing." },
      counterYes: { zh: "如果一次失败让一个人再也不敢尝试了呢？失败本身是好事，还是「失败之后做的事」才是好事？", en: "What if one failure makes someone never try again? Is failure itself good — or only what you do AFTER it?" },
      counterNo: { zh: "可是不失败，怎么知道哪条路走不通？发明青霉素的那个发霉盘子怎么说？", en: "But without failing, how do you learn which paths are dead ends? What about that moldy dish that became penicillin?" },
    },
    {
      id: "D4", theme: "change",
      claim: { zh: "计划被打乱，一定是坏事。", en: "A ruined plan is always a bad thing." },
      counterYes: { zh: "可是「塞翁失马」里，坏事过几天就变成了好事。你怎么解释？", en: "But in the lost-horse story, bad luck kept turning into good luck. How do you explain that?" },
      counterNo: { zh: "如果打乱你计划的，是别人的粗心大意呢？还觉得无所谓吗？", en: "What if your plan was ruined by someone else's carelessness? Still totally fine with it?" },
    },
    {
      id: "D5", theme: "courage",
      claim: { zh: "勇敢的人从来不害怕。", en: "Brave people are never afraid." },
      counterYes: { zh: "消防员冲进火场时心跳加速、手心出汗——那他们就不算勇敢了吗？", en: "Firefighters' hearts pound and palms sweat as they run into fires. Are they not brave, then?" },
      counterNo: { zh: "那「勇敢」和「害怕」能同时住在一个人身体里吗？它们会打架吗？", en: "So can courage and fear live in one body at the same time? Do they fight?" },
    },
    {
      id: "D6", theme: "misunderstanding",
      claim: { zh: "亲眼看到的，就一定是真的。", en: "If you saw it with your own eyes, it must be true." },
      counterYes: { zh: "魔术师也让你「亲眼看到」人被锯成两半了，那是真的吗？", en: "A magician lets you \"see with your own eyes\" a person sawn in half. Is that true?" },
      counterNo: { zh: "如果连亲眼看到的都不可信，那我们还能相信什么？怎么判断？", en: "If even our own eyes can't be trusted, what CAN we trust? How do we judge?" },
    },
    {
      id: "D7", theme: "opinion",
      claim: { zh: "观点没有对错，所以不需要讲理由。", en: "Opinions can't be wrong, so they don't need reasons." },
      counterYes: { zh: "「冰淇淋好吃」可以不讲理由，那「某某同学很讨厌」也可以不讲理由吗？", en: "\"Ice cream is yummy\" needs no reason. Does \"that classmate is annoying\" need no reason either?" },
      counterNo: { zh: "那「我最喜欢蓝色」需要理由吗？哪些观点需要理由，哪些不需要？", en: "Does \"blue is my favorite color\" need a reason? Which opinions need reasons, and which don't?" },
    },
    {
      id: "D8", theme: "promise",
      claim: { zh: "答应朋友保守的秘密，永远都不能说出去。", en: "A secret you promised a friend must never, ever be told." },
      counterYes: { zh: "如果这个秘密会让朋友受到伤害呢？守约和保护朋友，哪个更重要？", en: "What if keeping it could get your friend hurt? Which matters more — your promise, or their safety?" },
      counterNo: { zh: "可如果你说出去了，朋友以后还敢把心事告诉你吗？坏掉的信任怎么修？", en: "But if you tell, will your friend ever trust you with a secret again? How do you mend broken trust?" },
    },
    {
      id: "D9", theme: "imagination",
      claim: { zh: "想象出来的朋友，不是真的朋友。", en: "An imaginary friend is not a real friend." },
      counterYes: { zh: "可是书里的人物陪伴了无数孤单的人。「真的」一定要摸得到吗？", en: "But book characters have kept millions of lonely people company. Must \"real\" mean touchable?" },
      counterNo: { zh: "想象的朋友能在你摔倒时扶你一把吗？做「朋友」最重要的是什么？", en: "Can an imaginary friend catch you when you fall? What matters MOST in a friend?" },
    },
    {
      id: "D10", theme: "independence",
      claim: { zh: "长大，就是不再需要别人帮忙。", en: "Growing up means not needing help anymore." },
      counterYes: { zh: "可是大人也要看医生、也要请教别人。需要帮助等于弱小吗？", en: "But grown-ups see doctors and ask for advice too. Does needing help mean being weak?" },
      counterNo: { zh: "那「自己能做的事推给别人」和「请人帮忙」，区别在哪里？", en: "Then what's the difference between dumping your own work on others — and asking for help?" },
    },
    {
      id: "D11", theme: "explain",
      claim: { zh: "懂得越多的人，讲得越清楚。", en: "The more someone knows, the better they explain." },
      counterYes: { zh: "可有的教授讲课没人听得懂，有的同学一讲你就明白了。「知道」和「讲清楚」是一回事吗？", en: "Yet some professors lose everyone, while a classmate makes it click in a minute. Is knowing the same as explaining?" },
      counterNo: { zh: "那完全不懂的人能讲清楚吗？要讲清楚，至少得懂多少？", en: "Could someone who knows nothing explain it well? How much DO you need to know first?" },
    },
    {
      id: "D12", theme: "observation",
      claim: { zh: "无聊的时候，什么也得不到。", en: "You gain nothing from being bored." },
      counterYes: { zh: "科学家发现，发呆的时候大脑反而在悄悄整理东西——很多好点子就是无聊时冒出来的。", en: "Scientists found that daydreaming brains quietly tidy things up — lots of great ideas pop out of boredom." },
      counterNo: { zh: "那一直无聊下去也没关系吗？无聊什么时候有用，什么时候该停下？", en: "So is endless boredom fine too? When is boredom useful — and when should it stop?" },
    },
  ],

  /* ---------- 主题匹配：根据所选题目挑通识卡和思辨题 ---------- */
  themeOf(task) {
    if (!task) return "observation";
    const t = task.title || "";
    const kw = [
      [/放弃|重新|坚持|返工/, "perseverance"],
      [/漫长|等待|十分钟/, "time"],
      [/没有成功|失败/, "failure"],
      [/独立|第一次/, "independence"],
      [/打乱|意外|计划/, "change"],
      [/误会/, "misunderstanding"],
      [/勇敢|害怕/, "courage"],
      [/秘密|承诺|保守/, "promise"],
    ];
    for (const [re, theme] of kw) if (re.test(t)) return theme;
    const byType = {
      imagination: "imagination", knowledge_explanation: "explain", opinion: "opinion",
      people_relationships: "people", observation_discovery: "observation", real_experience: "perseverance",
    };
    return byType[task.type] || "observation";
  },
  cardFor(task) {
    const th = this.themeOf(task);
    return this.cards.find(c => c.theme === th) || this.cards[7]; // 兜底：观察卡
  },
  debateFor(task) {
    const th = this.themeOf(task);
    // people 主题没有专属思辨题 → 用观点题
    return this.debates.find(d => d.theme === th) || this.debates.find(d => d.theme === "opinion");
  },
};
