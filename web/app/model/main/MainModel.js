Ext.define('iFlat.model.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {

        /* 全局 main */
        yesNo: ['是', '否'],
        title: {
            iconPath: 'resources/images/sencha-icon.png',
            name: ' 中船澄西信息化平台'
        },
        user: {
            account: '',
            userName: '',
            title: '',
            roleId: '',
            roleName: '',
            orgId: '',
            orgCode: '',
            orgName: '',
            porgId: '',
            porgCode: '',
            porgName: '',
            sequence: '',
            loginTime: null,
        },
        month: ['2015-10','2015-11','2015-12',
            '2016-01','2016-02','2016-03','2016-04','2016-05','2016-06',
            '2016-07','2016-08','2016-09','2016-10','2016-11','2016-12',
            '2017-01','2017-02','2017-03','2017-04','2017-05','2017-06',
            '2017-07','2017-08','2017-09','2017-10','2017-11','2017-12',
            '2018-01','2018-02','2018-03','2018-04','2018-05','2018-06',
            '2018-07','2018-08','2018-09','2018-10','2018-11','2018-12',
            '2019-01','2019-02','2019-03','2019-04','2019-05','2019-06',
            '2019-07','2019-08','2019-09','2019-10','2019-11','2019-12',
        ],

        /* 成本综合分析 business intelligence */
        projectCostType: ['报价','目标','实际'],
        costCtrlType: ['劳务工费','职工薪酬','制造费','动力费','外协费','设备工装费','专项协作费','试航费','保修费','码头使用费','船台使用费','设备成本','材料成本','采购附加费','销售费','设计费','检验费','销售附加费','设备加帐','材料加帐','人工加帐','器材加帐'],
        projectInProcess: ['用钢量','工装费','焊材用量','钢管用量','外协分段吨位','油漆用量','船台费','电缆用量','码头费','浮吊费','拖轮费'],
        projectInProcessStage: ['分段阶段','船台阶段','水下阶段'],
        deptCtrlType: ['工业性消耗','工具','机物料消耗','修理费','办公用具','低值设备','生产用具'],

        /* 生产管理 work in process */
        woType: ['结构', '舾装制作', '舾装安装', '工程', '修改', '杂项', '自测样管', '通用件'],

        /* 问题 question */
        system: ['工时系统','物资系统','成本系统','质量系统','设计数据系统','报表中心','其他'],
        solver: [
            {'account': 'A200900012', 'userName': '周晨煜'},
            {'account': 'A200500218', 'userName': '梅晓晶'},
            {'account': 'A200900012', 'userName': '何春梅'},
            {'account': 'A200900012', 'userName': '赵丽'},
            {'account': 'A200900012', 'userName': '窦培华'},
        ],
        reason: ['业务不熟','系统不熟','新增需求','系统bug','系统优化'],

        /* 工程结算 settlement management */
        smDept: ['造船加工车间','造船船体车间','造船安装车间','修船冷作车间','修船坞修车间','修船舾装车间','修船机电修理车间','钢结构事业部'],
        smDeptScFirst: ['钢结构事业部','造船加工车间','造船船体车间','造船安装车间','修船冷作车间','修船坞修车间','修船舾装车间','修船机电修理车间'],
        smDeptSrFirst: ['修船冷作车间','修船坞修车间','修船舾装车间','修船机电修理车间','造船加工车间','造船船体车间','造船安装车间','钢结构事业部'],
        smSbDept: ['造船加工车间','造船船体车间','造船安装车间'],
        smSrDept: ['修船冷作车间','修船坞修车间','修船舾装车间','修船机电修理车间'],
        smScDept: ['钢结构事业部'],
        smOutsourcingType: ['29 代理制餐补','20 代理制工费','201 返聘工资','13 工伤补贴','23 绩效工资','19 工会经费','202 沐浴费','18 其他工费','39 福利费','25 保险费'],
        smSrWorkType: ['冷作', '钳工', '涂装', '搭架', '电工', '铜工'],
        smSrWorkTypeLZ: ['冷作', '钳工'],
        smSrWorkTypeJD: ['电工', '钳工', '铜工'],
        smSrWorkTypeWithOutJD: ['冷作', '钳工', '涂装', '搭架'],
        smSrWorkTypeWX: ['涂装'],
        smSrWorkTypeXZ: ['搭架'],
        smFineType: ['计划执行','设备能源','其他'],
        smCategory: ['分段制作', '船台搭载', '码头舾装','电', '气', '水', '奖惩条例','设备','焊材','工具','工装','培训类', '工时填报', '晚间值班', '班前会组织','精细化派工'],
        smCategoryPlan: ['分段制作', '船台搭载', '码头舾装'],
        smCategoryEnergy: ['电', '气', '水', '奖惩条例','设备','焊材','工具','工装'],
        smCategoryOther: ['培训类', '工时填报', '晚间值班', '班前会组织','精细化派工'],

        /* 质量管理 quality managerment */
        qualityFineCategory: ['质量指标','工艺纪律','交验考核'],
        qualityFineProfession: ['船体','轮机','电气','内装','油漆'],

        /* 安环保卫 safety & security */
        safetyFinePaid: ['未付','已付'],
        safetyFineType: ['安全隐患','行为规范','5S','事故'],
        safetyFineMgrDept: ['造船事业部','修船事业部','钢结构事业部'],
        safetyFineDeadline: ['立即整改','通知整改'],
        safetyFineInspectType: ['日常检查','节前检查'],
        safetyFineDangerType: ['设备设施','明火作业','个人行为'],
        safetyFineDamageType: ['火灾','物体打击','触电','高处坠落','燃爆','其他伤害'],
        safetyFineRiskLevel: ['轻微','严重'],
        fsAreaType: ['内场', '外场', '修船', '分段制作', '船台区域', '水下区域'],
        ssFsCodeType: ['整理', '整顿', '清扫', '清洁', '素养', ],
        ssFiveSFuncDept: ['纪委办公室', '党群工作部', '企业文化部', '工会', '总经理办公室', '企划部', '法律顾问室', '监察审计部', '生产管理部', '人力资源部', '财务部', '研发部', '设计部', '综合技术部', '造船事业部', '造船经营部', '修船经营部', '钢结构经营部', '修船事业部', '质量部', '生产保障部', '安环保卫部', '物资部', '劳务中心', '钢结构事业部', '华尔新特涂公司', '华澄公司'],
        ssPhRiskLvl: ['重大','较大','严重','轻微'],
        ssPhDeadline: ['立即整改','限期整改'],
        ssPhFeedback: [' ','已整改'],
        ssVrFeedback: [' ','已整改','拒绝整改'],
        ssVrTraining: [' ','是'],
        ssAccLvl: ['一类事故','二类事故','三类事故','四类事故','五类事故','微伤事故','险肇事故（一般）','险肇事故（重大）',],
        ssAccType: ['物体打击','车辆伤害','机械伤害','起重伤害','触电','淹溺','灼烫','火灾','高处坠落','挤压','滑跌','燃爆','坍塌','中毒','窒息','其他'],
        ssAccInjuryLvl: ['险肇','微伤','轻伤','重伤','死亡'],
        ssAccPartyType: ['肇事人','受害人','肇事人+受害人',],

        /* 计划管理 plan managerment */
        pmProjectType: ['软件研发','软件运维'],
        pmProjectStatus: [' ','进行中','完成'],
        pmProjectManager: ['周晨煜','梅晓晶'],

        /* 人事管理 human resource */
        hrDept: ['扬州分公司搭载部','扬州分公司涂装部','扬州分公司制造部','扬州分公司总装部','扬州分公司综合管理部','扬州分公司人力资源部','扬州分公司财务部','扬州分公司生产运行部','扬州分公司技术质量部','扬州分公司生产保障部','扬州分公司安保部','扬州分公司物资部'],
        hrCreditType: ['成本','安全','质量','工艺','精度','纪律','设备能源','后勤管理','培训出勤','其他'],

        /* 党群 Party And Mass */
        pamNewsSummaryType: ['党支部', '作者', '部门'],
        pamNewsType: ['消息', '通讯', '图片新闻', '副刊', '广播/报纸/班组学习'],
        pamNewsAmount: [0,5,8,10,15,20,25,30,50],
    },
});