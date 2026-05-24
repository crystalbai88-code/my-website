const projects = [
  {
    title: "FamilyTrip 家庭旅行管家",
    category: "life ai",
    student: "智造少年 · 少年CEO项目组 A",
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
    student: "智造少年 · 少年CEO项目组 B",
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
    student: "智造少年 · 少年CEO项目组 C",
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
    student: "智造少年 · 少年CEO项目组 D",
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
    student: "智造少年 · 少年CEO项目组 E",
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
    student: "智造少年 · 少年CEO项目组 F",
    stage: "数据采集",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
    insight: "同一个城市里，树荫、地面材质和建筑密度会让孩子体感到完全不同的夏天。",
    problem: "城市热感不是抽象环保议题，学生可以用真实测量理解公共空间设计。",
    solution: "用温度记录、路线观察和 AI 可视化生成校园周边热感地图。",
    iteration: "下一版把观察点扩展到不同时间段，并加入树荫覆盖率记录。",
    tags: ["城市观察", "数据项目", "公共议题"]
  }
];

const grid = document.querySelector("#projectGrid");
const detail = document.querySelector("#projectDetail");
const filterButtons = document.querySelectorAll(".filter-button");
const year = document.querySelector("#year");

let activeFilter = "all";
let activeProject = projects[0];

renderProjects();
renderDetail(activeProject);
if (year) year.textContent = new Date().getFullYear();

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

function getFilteredProjects() {
  if (activeFilter === "all") return projects;
  return projects.filter((project) => project.category.includes(activeFilter));
}

function renderProjects() {
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
