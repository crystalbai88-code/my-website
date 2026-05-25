const projects = [
  {
    title: "FamilyTrip 家庭旅行管家",
    category: "life ai",
    student: "智能少年俱乐部 · 少年CEO项目组 A",
    stage: "第二版原型",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    insight: "家庭旅行不是缺攻略，而是缺少照顾孩子、老人、天气、距离和休息节奏的一体化决策。",
    problem: "家长需要在短时间内判断酒店周边怎么玩，路线是否折返，孩子和老人是否吃得消。",
    solution: "以酒店为中心生成家庭友好路线，整合天气、餐厅、景点距离、舒适度评分和小红书搜索入口。",
    iteration: "第一版只做地点搜索；第二版加入家庭成员、路线强度、预算偏好和一日计划。",
    tags: ["AI 产品", "家庭场景", "路线规划"]
  },
  {
    title: "校园午餐排队优化",
    category: "life community",
    student: "智能少年俱乐部 · 少年CEO项目组 B",
    stage: "洞察验证",
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80",
    insight: "午餐排队最长的不是买饭时间，而是学生不知道哪个窗口当前更快。",
    problem: "学生在有限午休时间里浪费等待，食堂窗口也无法均衡分流。",
    solution: "设计一个窗口拥挤度看板，用学生反馈和现场观察生成推荐窗口。",
    iteration: "下一版准备加入高峰时段记录和志愿者人工更新机制。",
    tags: ["校园问题", "服务设计", "数据观察"]
  },
  {
    title: "AI 植物照护助手",
    category: "ai life",
    student: "智能少年俱乐部 · 少年CEO项目组 C",
    stage: "可用原型",
    image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=900&q=80",
    insight: "很多家庭养植物失败，不是因为不喜欢，而是不知道植物什么时候真的需要水和光。",
    problem: "植物照护建议太泛泛，家庭用户需要低门槛、场景化、可执行的提醒。",
    solution: "通过拍照识别植物状态，生成照护建议、浇水提醒和家庭成员分工。",
    iteration: "从固定提醒改成基于植物状态、天气和室内位置的动态提醒。",
    tags: ["AI 应用", "家庭生活", "图像识别"]
  },
  {
    title: "社区老人便利地图",
    category: "community life",
    student: "智能少年俱乐部 · 少年CEO项目组 D",
    stage: "用户访谈",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
    insight: "老人不是不会用地图，而是普通地图没有把厕所、座椅、坡道、药店这些真正重要的信息放前面。",
    problem: "社区老人外出时，需要一张按体力和安全感组织的信息地图。",
    solution: "制作老人友好点位地图，标注休息点、无障碍路线、药店、厕所和可求助地点。",
    iteration: "准备邀请老人实际走一遍路线，记录缺失点和不准确点。",
    tags: ["社区洞察", "适老设计", "线下调研"]
  },
  {
    title: "儿童零花钱实验室",
    category: "business life",
    student: "智能少年俱乐部 · 少年CEO项目组 E",
    stage: "商业实验",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    insight: "孩子不是不懂钱，而是缺少把选择、预算、延迟满足和价值判断放在一起练习的真实场景。",
    problem: "传统财商教育容易变成概念课，孩子没有真实决策和复盘过程。",
    solution: "设计一个零花钱任务系统，让孩子在真实购买、记录、比较和复盘中形成金钱判断。",
    iteration: "从记账表升级为目标卡、选择卡和复盘卡三件套。",
    tags: ["商业意识", "财商项目", "行为设计"]
  },
  {
    title: "城市热岛观察计划",
    category: "community ai",
    student: "智能少年俱乐部 · 少年CEO项目组 F",
    stage: "数据采集",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    insight: "同一个城市里，树荫、地面材质和建筑密度会让孩子体感到完全不同的夏天。",
    problem: "城市热感不是抽象环保议题，学生可以用真实测量理解公共空间设计。",
    solution: "用温度记录、路线观察和 AI 可视化生成校园周边热感地图。",
    iteration: "下一版把观察点扩展到不同时间段，并加入树荫覆盖率记录。",
    tags: ["城市观察", "数据项目", "公共议题"]
  }
];

const topicContent = {
  membership: {
    title: "年度会员俱乐部",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=80",
    text: "智能少年俱乐部不是一门短课，而是孩子长期拥有的成长场所。孩子以会员身份加入，有想法时来推进项目，想找同伴时来组队，需要帮助时预约老师。",
    points: ["按年加入，长期开放", "可约同伴一起做项目", "可预约不同方向老师", "每次来都让作品往前一步"]
  },
  ceo: {
    title: "少年CEO项目",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80",
    text: "少年CEO是俱乐部里的核心项目场景。孩子从真实世界里发现问题，用产品思维设计方案，再通过反馈和迭代把想法变成可以展示、可以使用、可以继续生长的作品。",
    points: ["真实世界洞察", "用户问题定义", "产品原型设计", "路演表达与持续迭代"]
  },
  mentor: {
    title: "导师预约系统",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80",
    text: "俱乐部会形成老师和行业导师名单。孩子可以根据项目阶段预约不同老师：有人帮他拆问题，有人帮他做技术，有人帮他改表达，也有人帮他看商业落地。",
    points: ["项目教练", "AI与工程老师", "人文表达老师", "行业专业人士"]
  },
  credits: {
    title: "学分分层系统",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80",
    text: "这里的学分不是考试分数，而是孩子在真实项目中的成长证据。每一次观察、访谈、原型、修改和公开表达，都能被记录进作品集。",
    points: ["观察学分", "问题学分", "原型学分", "迭代学分", "表达学分"]
  }
};

const creditContent = {
  observer: {
    code: "L1",
    title: "观察者",
    text: "孩子开始把注意力放回真实生活，学会看见现象、记录细节，并说出为什么这个现象值得被关注。",
    goals: ["完成一次真实场景观察", "记录不少于三个细节", "用自己的话讲清楚发现"]
  },
  questioner: {
    code: "L2",
    title: "提问者",
    text: "孩子不急着给答案，而是先学会追问：这是一个谁的问题？为什么会发生？现有方案哪里不够好？",
    goals: ["提出一个可研究的问题", "完成一次访谈或资料整理", "区分现象、原因和需求"]
  },
  builder: {
    code: "L3",
    title: "原型师",
    text: "孩子把想法做出来。可以是一张流程图、一个网页、一个工具、一个服务方案，也可以是一场小型实验。",
    goals: ["做出第一版可展示原型", "说明核心功能和用户路径", "收集至少一次真实反馈"]
  },
  leader: {
    code: "L4",
    title: "项目负责人",
    text: "孩子开始组织资源推进项目，学会分工、排优先级、预约导师、管理时间，并根据反馈持续迭代。",
    goals: ["制定项目推进计划", "组织同伴或导师协作", "完成一次明确版本迭代"]
  },
  creator: {
    code: "L5",
    title: "少年创造者",
    text: "孩子能把项目讲给别人听，形成完整作品集，并开始产生真实影响：帮助一个人、改善一个场景、启发一群同伴。",
    goals: ["完成一次公开展示或路演", "沉淀项目作品集页面", "说明项目带来的真实改变"]
  }
};

const grid = document.querySelector("#projectGrid");
const detail = document.querySelector("#projectDetail");
const filterButtons = document.querySelectorAll(".filter-button");
const year = document.querySelector("#year");
const topicDetail = document.querySelector("#topicDetail");
const tapCards = document.querySelectorAll(".tap-card");
const creditDetail = document.querySelector("#creditDetail");
const creditButtons = document.querySelectorAll(".credit-level");

let activeFilter = "all";
let activeProject = projects[0];

renderTopic("membership");
renderCredit("observer");
renderProjects();
renderDetail(activeProject);
if (year) year.textContent = new Date().getFullYear();

tapCards.forEach((button) => {
  button.addEventListener("click", () => {
    tapCards.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderTopic(button.dataset.topic);
  });
});

creditButtons.forEach((button) => {
  button.addEventListener("click", () => {
    creditButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCredit(button.dataset.level);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    const filtered = getFilteredProjects();
    activeProject = filtered[0] || projects[0];
    renderProjects();
    renderDetail(activeProject);
  });
});

function renderTopic(key) {
  if (!topicDetail || !topicContent[key]) return;
  const topic = topicContent[key];

  topicDetail.innerHTML = `
    <img src="${topic.image}" alt="${escapeHtml(topic.title)}" />
    <div class="tap-detail-body">
      <span class="label">Club Entry</span>
      <h3>${topic.title}</h3>
      <p>${topic.text}</p>
      <ul>
        ${topic.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderCredit(key) {
  if (!creditDetail || !creditContent[key]) return;
  const level = creditContent[key];

  creditDetail.innerHTML = `
    <div>
      <span class="label">Credit Level</span>
      <h3>${level.title}</h3>
      <p>${level.text}</p>
      <ul>
        ${level.goals.map((goal) => `<li>${goal}</li>`).join("")}
      </ul>
    </div>
    <div class="credit-badge" aria-label="${escapeHtml(level.title)}">
      <div>
        <strong>${level.code}</strong>
        <span>${level.title}</span>
      </div>
    </div>
  `;
}

function getFilteredProjects() {
  if (activeFilter === "all") return projects;
  return projects.filter((project) => project.category.includes(activeFilter));
}

function renderProjects() {
  if (!grid) return;
  const filtered = getFilteredProjects();
  grid.innerHTML = filtered.map((project) => `
    <article class="project-card ${project.title === activeProject.title ? "active" : ""}" data-title="${escapeHtml(project.title)}">
      <img src="${project.image}" alt="${escapeHtml(project.title)}" />
      <div class="project-card-body">
        <span>${project.stage}</span>
        <h3>${project.title}</h3>
        <p>${project.insight}</p>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      activeProject = projects.find((project) => project.title === card.dataset.title);
      renderProjects();
      renderDetail(activeProject);
    });
  });
}

function renderDetail(project) {
  if (!detail || !project) return;
  detail.innerHTML = `
    <div class="detail-header">
      <span class="label">Selected Project</span>
      <h3>${project.title}</h3>
      <p>${project.student} · ${project.stage}</p>
    </div>
    <div class="tag-row">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <dl class="project-chain">
      <div>
        <dt>真实洞察</dt>
        <dd>${project.insight}</dd>
      </div>
      <div>
        <dt>问题定义</dt>
        <dd>${project.problem}</dd>
      </div>
      <div>
        <dt>产品方案</dt>
        <dd>${project.solution}</dd>
      </div>
      <div>
        <dt>迭代意识</dt>
        <dd>${project.iteration}</dd>
      </div>
    </dl>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}
