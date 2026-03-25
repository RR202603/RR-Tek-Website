const translations = {
  zh: {
    // 导航
    "nav.home": "首页",
    "nav.service": "服务",
    "nav.software": "软件开发",
    "nav.database": "数据库",
    "nav.contact": "联系我们",

    // database 页面标题
    "page.database.title": "数据库详情 - 长沙锐睿科技有限公司",

    // 数据库页面
    "database.hero.title": "数据库详情",
    "database.hero.desc": "为企业提供稳定、高效、安全的数据管理与应用支持。",

    "database.section.overview": "服务概述",
    "database.overview.text": "我们提供数据库设计、部署、优化、迁移、备份和运维服务，帮助企业构建高性能、可扩展的数据平台。",

    "database.section.features": "核心功能",

    "database.section.advantages": "服务优势",
    "database.advantages.item1": "高可靠性",
    "database.advantages.item2": "安全可控",
    "database.advantages.item3": "灵活扩展",
    "database.advantages.item4": "专业运维支持",

    "database.section.contact": "咨询我们",
    "database.contact.desc": "无论您需要数据库架构设计、性能优化、数据迁移还是长期运维支持，我们都可以为您提供专业服务。",
    "database.contact.button": "立即咨询"
  },

  en: {
    // 导航
    "nav.home": "Home",
    "nav.service": "Services",
    "nav.software": "Software Development",
    "nav.database": "Database",
    "nav.contact": "Contact Us",

    // database 页面标题
    "page.database.title": "Database Details - Changsha Ruirui Technology Co., Ltd.",

    // 数据库页面
    "database.hero.title": "Database Details",
    "database.hero.desc": "Providing stable, efficient, and secure data management and application support for enterprises.",

    "database.section.overview": "Service Overview",
    "database.overview.text": "We provide database design, deployment, optimization, migration, backup, and maintenance services to help enterprises build high-performance and scalable data platforms.",

    "database.section.features": "Core Features",

    "database.section.advantages": "Advantages",
    "database.advantages.item1": "High Reliability",
    "database.advantages.item2": "Secure and Controllable",
    "database.advantages.item3": "Flexible Scalability",
    "database.advantages.item4": "Professional Maintenance Support",

    "database.section.contact": "Contact Us",
    "database.contact.desc": "Whether you need database architecture design, performance optimization, data migration, or long-term maintenance support, we can provide professional services.",
    "database.contact.button": "Contact Now"
  }
};

function getCurrentLanguage() {
  return localStorage.getItem("siteLanguage") || "zh";
}

function setLanguage(lang) {
  localStorage.setItem("siteLanguage", lang);
  applyTranslations(lang);
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.zh;

  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";

  // 普通文本替换
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // HTML 内容替换
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // placeholder 替换
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });

  // title 替换
  if (window.location.pathname.includes("database.html")) {
    document.title = dict["page.database.title"] || document.title;
  }

  // 语言按钮状态
  document.querySelectorAll("[data-lang]").forEach(btn => {
    const btnLang = btn.getAttribute("data-lang");
    btn.classList.toggle("active", btnLang === lang);
  });

  // 触发页面动态内容重新渲染
  window.dispatchEvent(new CustomEvent("languageChanged", {
    detail: { lang }
  }));
}

document.addEventListener("DOMContentLoaded", function () {
  const lang = getCurrentLanguage();
  applyTranslations(lang);

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
    });
  });
});