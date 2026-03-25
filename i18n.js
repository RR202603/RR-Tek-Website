const languages = {
    en: {
        nav: {
            home: "Home",
            about: "About Us",
            products: "Products & Services",
            news: "News",
            contact: "Contact",
            switchLang: "切换至中文"
        },
        hero: {
            title: "Welcome to RR-Tek Technology",
            description: "Leading the way in innovative technology solutions for industries worldwide.",
            learnMore: "Learn More"
        },
        about: {
            title: "About Us",
            description: "Changsha RR-Tek Technology Co., Ltd. was founded in April 2021. The company specializes in the development and sales of scientific research software, materials thermodynamics and thermophysical databases, industry training and academic conferences, as well as new material technology development and consulting services. With a professional technical team, an excellent software development team, and an advisory team composed of well-known professors and experts from universities in China and abroad, the company has established an efficient and streamlined operation model integrating R&D, sales, and after-sales service. It is committed to building internationally advanced and fully independently owned intelligent material design software, databases, and material design service platforms, becoming a preferred partner for research institutes and enterprises in scientific and new material development."
        },
        products: {
            title: "Our Products & Services",
            description: "Explore our cutting-edge solutions and products that help transform industries.",
            software: {
                title: "Software",
                product1: "CALculation of Thermo-Physical Properties (CALTPP)",
                product2: "Intelligent CALculation of PHAse Diagrams (ICALPHAD)",
                product3: "Microstructure of Multi-Phase Materials (MID)",
                product4: "PreCalc",
                product5: "Crystal Plasticity Calculation Package (CPCP)"
            },
            database: {
                title: "Thermodynamic Databases",
                database1: "Copper Alloy Database",
                database2: "Aluminum Alloy Database",
                database3: "Hard Alloy Database",
                database4: "Iron-based Alloy Database",
                database5: "Rare Earth Permanent Magnet Database"
            },
            service: {
                title: "Services",
                service1: "Materials Calculation Service",
                service2: "Project Application Guidance Service",
                service3: "Material Characterization Testing Service",
                service4: "Conference Services"
            }
        },
        news: {
            title: "News",
            description: "Stay updated with our latest announcements, product updates, and industry insights."
        },
        contact: {
            title: "Contact Us",
            address: "Address: Room 806, Building 5, Aux Plaza, Yuelu District, Changsha",
            email: "Email: rrui_info@163.com"
        },
        footer: {
            text: "© 2025 RR-Tek Technology Co., Ltd. All Rights Reserved. | Address: Room 806, Building 5, Aux Plaza, Yuelu District, Changsha | Email: rrui_info@163.com"
        }
    },
    zh: {
        nav: {
            home: "首页",
            about: "关于我们",
            products: "产品与服务",
            news: "新闻",
            contact: "联系方式",
            switchLang: "Switch to English"
        },
        hero: {
            title: "欢迎来到锐睿科技",
            description: "我们在全球范围内引领创新技术解决方案。",
            learnMore: "了解更多"
        },
        about: {
            title: "关于我们",
            description: "长沙锐睿科技有限公司成立于2021年4月，专业从事科研软件开发和销售、材料热力学和热物性数据库开发和销售、行业培训和学术会议、新材料技术开发和咨询等科技服务业务。公司拥有专业的技术开发人才、优秀的科研软件开发团队，以及国内外知名教授专家组成的顾问团队，构建了以研发、销售和售后服务为一体的高效、精简的运营模式。致力于打造具有国际一流水平和完全自主知识产权的材料智能设计软件、数据库及材料设计服务平台，引领多尺度和制备全流程的材料设计及开发技术，成为国内外科研院所和企业开展科技和新材料开发的首选合作伙伴。"
        },
        products: {
            title: "我们的产品与服务",
            description: "探索我们的创新技术解决方案，帮助行业转型。",
            software: {
                title: "软件",
                product1: "热物性计算软件 CALTPP",
                product2: "相图热力学计算软件 ICALPHAD",
                product3: "相场软件 MID",
                product4: "析出模拟软件 PreCalc",
                product5: "晶体塑性有限元模拟软件 CPCP"
            },
            database: {
                title: "热力学数据库",
                database1: "铜合金数据库",
                database2: "铝合金数据库",
                database3: "硬质合金数据库",
                database4: "铁基合金数据库",
                database5: "稀土永磁体数据库"
            },
            service: {
                title: "服务",
                service1: "材料计算服务",
                service2: "项目申请指导服务",
                service3: "材料表征检测服务",
                service4: "会务服务"
            }
        },
        news: {
            title: "新闻",
            description: "展示公司公告、产品更新和行业动态等最新信息。"
        },
        contact: {
            title: "联系方式",
            address: "地址：长沙市岳麓区奥克斯5栋806号",
            email: "邮箱：rrui_info@163.com"
        },
        footer: {
            text: "© 2025 锐睿科技有限公司 版权所有 | 地址：长沙市岳麓区奥克斯5栋806号 | 邮箱：rrui_info@163.com"
        }
    }
};

// 默认语言：中文
let currentLanguage = "zh";

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    updateContent();
    updateLogo();
    updateFooter();
}

// 更新页面内容
function updateContent() {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const keys = key.split(".");
        let translation = languages[currentLanguage];

        for (const k of keys) {
            if (translation && Object.prototype.hasOwnProperty.call(translation, k)) {
                translation = translation[k];
            } else {
                translation = null;
                console.warn(`Missing translation key: ${key} (${currentLanguage})`);
                break;
            }
        }

        if (translation !== null && translation !== undefined) {
            element.textContent = translation;
        }
    });
}

// 更新 logo
function updateLogo() {
    const logo = document.getElementById("company-logo");
    if (logo) {
        logo.textContent = currentLanguage === "zh" ? "锐睿科技有限公司" : "RR-Tek Technology";
    }
}

// 更新 footer
function updateFooter() {
    const footerText = document.getElementById("footer-text");
    if (footerText) {
        footerText.textContent = languages[currentLanguage].footer.text;
    }
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    updateContent();
    updateLogo();
    updateFooter();
});