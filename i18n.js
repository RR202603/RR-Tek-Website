const languages = {
    en: {
        nav: {
            home: "Home",
            about: "About Us",
            products: "Products & Services",
            news: "News",
            contact: "Contact",
            switchLang: "Switch to Chinese"
        },
        hero: {
            title: "Welcome to RR-Tek Technology",
            description: "Leading the way in innovative technology solutions for industries worldwide.",
            learnMore: "Learn More"
        },
        about: {
            title: "About Us",
            description: "Changsha RR-Tek Technology was founded in April 2021, specializing in the development and sales of research software, materials thermodynamics and thermophysical databases, industry training and academic conferences, new material technology development and consulting services. The company has a professional technical development team, an excellent research software development team, and a consultant team composed of well-known professors and experts from domestic and foreign universities, forming an efficient and streamlined operating model integrating R&D, sales, and after-sales services."
        },
        products: {
            title: "Our Products & Services",
            description: "Explore our cutting-edge solutions and products that help transform industries.",
            software: {
                title: "Software",
                product1: "CALculation of Thermo-Physical Properties CALTPP",
                product2: "Intelligent CALculation of PHAse Diagrams ICALPHAD",
                product3: "Microstructure of Multi-Phase Materials MID",
                product4: "PreCalc",
                product5: "Crystal Properties Calculation Package CPCP"
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
        footer: {
            text: "© 2025 RR-Tek Technology Co., Ltd. All Rights Reserved. | Address: 806, Building 5, Aux, Yuelu District, Changsha | Email: rrui_info@163.com"
        }
    },
    zh: {
        nav: {
            home: "首页",
            about: "关于我们",
            products: "产品与服务",
            news: "新闻",
            contact: "联系方式",
            switchLang: "切换至英文"
        },
        hero: {
            title: "欢迎来到锐睿科技",
            description: "我们在全球范围内引领创新技术解决方案。",
            learnMore: "了解更多"
        },
        about: {
            title: "关于我们",
            description: "长沙锐睿科技有限公司成立于2021年4月，专业从事科研软件开发和销售、材料热力学和热物性数据库开发和销售、行业培训和学术会议、新材料技术开发和咨询等科技服务业务。公司拥有专业的技术开发人才、优秀的科研软件开发团队，以及国内外知名教授专家组成的顾问团队，构建了以研发、销售和售后服务为一体的高效、精简的运营模式。"
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
                product5: "晶体塑性有限元模拟 CPCP"
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
        footer: {
            text: "© 2025 锐睿科技有限公司 版权所有 | 地址：长沙市岳麓区奥克斯5栋806号 | 邮箱：rrui_info@163.com"
        }
    }
};

// 默认语言设置为中文
let currentLanguage = 'zh'; 

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en'; // 切换语言
    updateContent();
    updateLogo();
    updateFooter();
}

// 更新页面内容
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = languages[currentLanguage];

        keys.forEach(k => translation = translation[k]);

        element.innerText = translation || key;
    });
}

// 更新 logo
function updateLogo() {
    const logo = document.getElementById('company-logo');
    logo.innerText = currentLanguage === 'zh' ? "锐睿科技有限公司" : "RR-Tek";
}

// 更新 footer 内容
function updateFooter() {
    const footerText = document.getElementById('footer-text');
    footerText.innerText = languages[currentLanguage].footer.text;
}

// 页面加载后更新内容
updateContent();
updateLogo();
updateFooter();