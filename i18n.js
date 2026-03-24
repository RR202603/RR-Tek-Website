const languages = {
    en: {
        nav: {
            about: "About Us",
            products: "Products & Services",
            news: "News",
            contact: "Contact Us"
        },
        hero: {
            title: "Welcome to RR-Tek Technology",
            description: "Leading the way in innovative technology solutions for industries worldwide.",
            learnMore: "Learn More"
        },
        about: {
            title: "About Us",
            description: "RR-Tek Technology is a high-tech enterprise focused on R&D and innovative solutions for industries like materials science, intelligent design, and industrial automation."
        },
        products: {
            title: "Our Products & Services",
            description: "Explore our cutting-edge solutions and products that help transform industries.",
            product1: "Industrial Software Solutions",
            product1desc: "Innovative software tools designed to optimize manufacturing processes."
        },
        news: {
            title: "News & Announcements",
            description: "Stay updated with the latest developments at RR-Tek Technology."
        },
        contact: {
            title: "Contact Us",
            description: "We would love to hear from you! Get in touch with us for more information.",
            form: {
                name: "Your Name",
                email: "Your Email",
                message: "Your Message",
                submit: "Submit"
            }
        }
    },
    zh: {
        nav: {
            about: "关于我们",
            products: "产品与服务",
            news: "新闻资讯",
            contact: "联系我们"
        },
        hero: {
            title: "欢迎来到锐睿科技",
            description: "我们在全球范围内引领创新技术解决方案。",
            learnMore: "了解更多"
        },
        about: {
            title: "关于我们",
            description: "锐睿科技是一家专注于材料科学、智能设计和工业自动化领域的创新技术解决方案公司。"
        },
        products: {
            title: "我们的产品与服务",
            description: "探索我们帮助转型行业的创新产品与解决方案。",
            product1: "工业软件解决方案",
            product1desc: "创新的软件工具，旨在优化制造过程。"
        },
        news: {
            title: "新闻资讯",
            description: "了解锐睿科技的最新动态。"
        },
        contact: {
            title: "联系我们",
            description: "我们很乐意听取您的意见！请联系我们获取更多信息。",
            form: {
                name: "您的姓名",
                email: "您的电子邮件",
                message: "您的留言",
                submit: "提交"
            }
        }
    }
};

let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    updateContent();
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = languages[currentLanguage];

        keys.forEach(k => translation = translation[k]);

        element.innerText = translation || key;
    });
}

updateContent();