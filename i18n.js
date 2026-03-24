const languages = {
    en: {
        products: {
            software: {
                title: "Software",
                product1: "Thermal Property Calculation Software CALTPP",
                product2: "Phase Diagram Thermodynamic Calculation Software ICALPHAD",
                product3: "Phase Field Software MID-NANO",
                product4: "Phase Field Software MID-MESO",
                product5: "Precipitation Simulation Software PreCalc",
                product6: "Finite Element Simulation Software CPCP"
            },
            database: {
                title: "Thermodynamic Databases",
                database1: "Copper Alloy Database",
                database2: "Aluminum Alloy Database",
                database3: "Hard Alloy Database",
                database4: "Iron-based Alloy Database",
                database5: "Rare Earth Database"
            },
            service: {
                title: "Services",
                service1: "Materials Calculation Service",
                service2: "Project Application Guidance Service",
                service3: "Material Characterization Testing Service",
                service4: "Conference Services"
            }
        }
    },
    zh: {
        products: {
            software: {
                title: "软件",
                product1: "热物性计算软件 CALTPP",
                product2: "相图热力学计算软件 ICALPHAD",
                product3: "相场软件 MID-NANO",
                product4: "相场软件 MID-MESO",
                product5: "析出模拟软件 PreCalc",
                product6: "有限元计算模拟软件 CPCP"
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
                service4: "会议服务"
            }
        }
    }
};

// This function will update the content in the HTML based on the selected language
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = languages[currentLanguage];

        keys.forEach(k => translation = translation[k]);

        element.innerText = translation || key;
    });
}