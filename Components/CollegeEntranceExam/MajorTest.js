import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native'
import { Container, Header, Title, Content, Footer, Spinner, Button, Left, Right, Body, Icon, Text, List, ListItem, Item } from 'native-base';
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

let questions = require('./question.json');
questions.sort(function () {
    return (0.5 - Math.random());
})

const tabFormateRs = [
    {
        cateKey: 'R',
        cateName: '实际型',
        score: 0,
        type: '实际型',
        info: '愿意使用工具从事操作性工作，动手能力强，做事手脚灵活，动作协调。偏好于具体任务，不善言辞，做事保守，较为谦虚。缺乏社交能力，通常喜欢独立做事。 　　典型职业：喜欢使用工具、机器，需要基本操作技能的工作。对要求具备机械方面才能、体力或从事与物件、机器、工具、运动器材、植物、动物相关的职业有兴趣，并具备相应能力。如：技术性职业（计算机硬件人员、摄影师、制图员、机械装配工），技能性职业（木匠、厨师、技工、修理工、农民、一般劳动）'
    },
    {
        cateKey: 'C',
        cateName: '常规型',
        score: 0,
        type: '常规型',
        info: '尊重权威和规章制度，喜欢按计划办事，细心、有条理，习惯接受他人的指挥和领导，自己不谋求领导职务。喜欢关注实际和细节情况，通常较为谨慎和保守，缺乏创造性，不喜欢冒险和竞争，富有自我牺牲精神。 　　典型职业：喜欢要求注意细节、精确度、有系统有条理，具有记录、归档、据特定要求或程序组织数据和文字信息的职业，并具备相应能力。如：秘书、办公室人员、记事员、会计、行政助理、图书馆管理员、出纳员、打字员、投资分析员。'
    },
    {
        cateKey: 'E',
        cateName: '企业型',
        score: 0,
        type: '企业型',
        info: '追求权力、权威和物质财富，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，习惯以利益得失，权利、地位、金钱等来衡量做事的价值，做事有较强的目的性。 　　典型职业：喜欢要求具备经营、管理、劝服、监督和领导才能，以实现机构、政治、社会及经济目标的工作，并具备相应的能力。如项目经理、销售人员，营销管理人员、政府官员、企业领导、法官、律师。'
    },
    {
        cateKey: 'S',
        cateName: '社会型',
        score: 0,
        type: '社会型',
        info: '喜欢与人交往、不断结交新的朋友、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用。寻求广泛的人际关系，比较看重社会义务和社会道德 　　典型职业：喜欢要求与人打交道的工作，能够不断结交新的朋友，从事提供信息、启迪、帮助、培训、开发或治疗等事务，并具备相应能力。如: 教育工作者（教师、教育行政人员），社会工作者（咨询人员、公关人员）。'
    },
    {
        cateKey: 'A',
        cateName: '艺术型',
        score: 0,
        type: '艺术型',
        info: '有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值。做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达、怀旧、心态较为复杂。 　　典型职业：喜欢的工作要求具备艺术修养、创造力、表达能力和直觉，并将其用于语言、行为、声音、颜色和形式的审美、思索和感受，具备相应的能力。不善于事务性工作。如艺术方面（演员、导演、艺术设计师、雕刻家、建筑师、摄影家、广告制作人），音乐方面（歌唱家、作曲家、乐队指挥），文学方面（小说家、诗人、剧作家）。'
    },
    {
        cateKey: 'I',
        cateName: '研究型',
        score: 0,
        type: '研究型',
        info: '思想家而非实干家,抽象思维能力强，求知欲强，肯动脑，善思考，不愿动手。喜欢独立的和富有创造性的工作。知识渊博，有学识才能，不善于领导他人。考虑问题理性，做事喜欢精确，喜欢逻辑分析和推理，不断探讨未知的领域。 　　典型职业：喜欢智力的、抽象的、分析的、独立的定向任务，要求具备智力或分析才能，并将其用于观察、估测、衡量、形成理论、最终解决问题的工作，并具备相应的能力。如科学研究人员、教师、工程师、电脑编程人员、医生、系统分析员。'
    }
];


const majors = {
    "RIA":"牙科技术员、陶工、建筑设计员、模型工、细木工、制作链条人员。",
    "RIS":"厨师、林务员、跳水员、潜水员、染色员、电器修理、眼镜制作、电工、纺织机器装配工、服务员、装玻璃工人、发电厂工人、焊接工。",
    "RIE":"建筑和桥梁工程、环境工程、航空工程、公路工程、电力工程、信号工程、电话工程、一般机械工程、自动工程、矿业工程、海洋工程、交通工程技术人 员、制图员、家政经济人员、计量员、农民、农场工人、农业机械操作、清洁工、无线电修理、汽车修理、手表修理、管工、线路装配工、工具仓库管理员。",
    "RIC":"船上工作人员、接待员、杂志保管员、牙医助手、制帽工、磨坊工、石匠、机器制造、机车(火车头)制造、农业机器装配、汽车装配工、缝纫机装配工、 钟表装配和检验、电动器具装配、鞋匠、锁匠、货物检验员、电梯机修工、托儿所所长、钢琴调音员、装配工、印刷工、建筑钢铁工作、卡车司机。",
    "RAI":"手工雕刻、玻璃雕刻、制作模型人员、家具木工、制作皮革品、手工绣花、手工钩针纺织、排字工作、印刷工作、图画雕刻、装订工。",
    "RSE":"消防员、交通巡警、警察、门卫、理发师、房间清洁工、屠夫、锻工、开凿工人、管道安装工、出租汽车驾驶员、货物搬运工、送报员、勘探员、娱乐场所的服务员、起卸机操作工、灭害虫者、电梯操作工、厨房助手。",
    "RSI":"纺织工、编织工、农业学校教师、某些职业课程教师（诸如艺术、商业、技术、工艺课程）、雨衣上胶工。",
    "REC":"抄水表员、保姆、实验室动物饲养员、动物管理员。",
    "REI":"轮船船长、航海领航员、大副、试管实验员。",
    "RES":"旅馆服务员、家畜饲养员、渔民、渔网修补工、水手长、收割机操作工、搬运行李工人、公园服务员、救 生员、登山导游、火车工程技术员、建筑工作、铺轨工人。",
    "RCI":"测量员、勘测员、仪表操作者、农业工程技术、化学工程技师、民用工程技师、石油工程技师、资料室管理员、探矿工、煅烧工、烧窖工、矿工、保养工、 磨床工、取样工、样品检验员、纺纱工、炮手、漂洗工、电焊工、锯木工、刨床工、制帽工、手工缝纫工、油漆工、染色工、按摩工、木匠、农民建筑工作、电影放 映员、勘测员助手。",
    "RCS":"公共汽车驾驶员、一等水手、游泳池服务员、裁缝、建筑工作、石匠、烟囱修建工、混凝土工、电话修理工、爆炸手、邮递员、矿工、裱糊工人、纺纱工。",
    "RCE":"打井工、吊车驾驶员、农场工人、邮件分类员、铲车司机、拖拉机司机。",
    "IAS":"普通经济学家、农场经济学家、财政经济学家、国际贸易经济学家、实验心理学家、工程心理学家、心理学家、哲学家、内科医生、数学家。",
    "IAR":"人类学家、天文学家、化学家、物理学家、医学病理、动物标本剥制者、化石修复者、艺术品管理者。",
    "ISE":"营养学家、饮食顾问、火灾检查员、邮政服务检查员。",
    "ISC":"侦察员、电视播音室修理员、电视修理服务员、验尸室人员、编目录者、医学实验定技师、调查研究者。",
    "ISR":"水生生物学者，昆虫学者、微生物学家、配镜师、矫正视力者、细菌学家、牙科医生、骨科医生。",
    "ISA":"实验心理学家、普通心理学家、发展心理学家、教育心理学家、社会心理学家、临床心理学家、目标学家、皮肤病学家、精神病学家、妇产科医师、眼科医生、五官科医生、医学实验室技术专家、民航医务人员、护士。",    
    "IES":"细菌学家、生理学家、化学专家、地质专家、地理物理学专家、纺织技术专家、医院药剂师、工业药剂师、药房营业员。",
    "IEC":"档案保管员、保险统计员。",
    "ICR":"质量检验技术员、地质学技师、工程师、法官、图书馆技术辅导员、计算机操作员、医院听诊员、家禽检查员。",
    "IRA":"地理学家、地质学家、声学物理学家、矿物学家、古生物学家、石油学家、地震学家、声学物理学家、原子和分子物理学家、电学和磁学物理学家、气象学家、设计审核员、人口统计学家、数学统计学家、外科医生、城市规划家、气象员。",
    "IRS":"流体物理学家、物理海洋学家、等离子体物理学家、农业科学家、动物学家、食品科学家、园艺学家、植物学家、细菌学家、解剖学家、动物病理学家、作 物病理学家、药物学家、生物化学家、生物物理学家、细胞生物学家、临床化学家、遗传学家、分子生物学家、质量控制工程师、地理学家、兽医、放射性治疗技师。",
    "IRE":"化验员、化学工程师、纺织工程师、食品技师、渔业技术专家、材料和测试工程师、电气工程师、土木工程师、航空工程师、行政官员、冶金专家、原子核工程师、陶瓷工程师、地质工程师、电力工程量、口腔科医生、牙科医生。",
    "IRC":"飞机领航员、飞行员、物理实验室技师、文献检查员、农业技术专家、动植物技术专家、生物技师、油管检查员、工商业规划者、矿藏安全检查员、纺织品检验员、照相机修理者、工程技术员、编计算程序者、工具设计者、仪器维修工。",
    "CRI":"簿记员、会计、记时员、铸造机操作工、打字员、按键操作工、复印机操作工。",
    "CRS":"仓库保管员、档案管理员、缝纫工、讲述员、收款人。",
    "CRE":"标价员、实验室工作者、广告管理员、自动打字机操作员、电动机装配工、缝纫机操作工。",
    "CIS":"记账员、顾客服务员、报刊发行员、土地测量员、保险公司职员、会计师、估价员、邮政检查员、外贸检查员。",
    "CIE":"打字员、统计员、支票记录员、订货员、校对员、办公室工作人员。",
    "CIR":"校对员、工程职员、海底电报员、检修计划员、发扳员。",
    "CSE":"接待员、通讯员、电话接线员、卖票员、旅馆服务员、私人职员、商学教师、旅游办事员。",
    "CSR":"运货代理商、铁路职员、交通检查员、办公室通信员、薄记员、出纳员、银行财务职员。",
    "CSA":"秘书、图书管理员、办公室办事员。",
    "CER":"邮递员、数据处理员、办公室办事员。",
    "CEI":"推销员、经济分析家。",
    "CES":"银行会计、记账员、法人秘书、速记员、法院报告人。",
    "ECI":"银行行长、审计员、信用管理员、地产管理员、商业管理员。",
    "ECS":"信用办事员、保险人员、各类进货员、海关服务经理、售货员，购买员、会计。",
    "ERI":"建筑物管理员、工业工程师、农场管理员、护士长、农业经营管理人员。",
    "ERS":"仓库管理员、房屋管理员、货栈监督管理员。",
    "ERC":"邮政局长、渔船船长、机械操作领班、木工领班、瓦工领班、驾驶员领班。",
    "EIR":"科学、技术和有关周期出版物的管理员。",
    "EIC":"专利代理人、鉴定人、运输服务检查员、安全检查员、废品收购人员。",
    "EIS":"警官、侦察员、交通检验员、安全咨询员、合同管理者、商人。",
    "EAS":"法官、律师、公证人。",
    "EAR":"展览室管理员、舞台管理员、播音员、训兽员。",
    "ESC":"理发师、裁判员、政府行政管理员、财政管理员、I程管理员、职业病防治、售货员、商业经理、办公室主任、人事负责人、调度员。",
    "ESR":"家具售货员、书店售货员、公共汽车的驾驶员、日用品售货员、护士长、自然科学和工程的行政领导。",
    "ESI":"博物馆管理员、图书馆管理员、古迹管理员、饮食业经理、地区安全服务管理员、技术服务咨询者、超级市场管理员、零售商品店店员、批发商、出租汽车服务站调度。",
    "ESA":"博物馆馆长、报刊管理员、音乐器材售货员、广告商售画营业员、导游、（轮船或班机上的）事务长、飞机上的服务员、船员、法官、律师。",
    "ASE":"戏剧导演、舞蹈教师、广告撰稿人，报刊、专栏作者、记者、演员、英语翻译。",
    "ASI":"音乐教师、乐器教师、美术教师、管弦乐指挥，合唱队指挥、歌星、演奏家、哲学家、作家、广告经理、时装模特。",
    "AER":"新闻摄影师、电视摄影师、艺术指导、录音指导、丑角演员、魔术师、木偶戏演员、骑士、跳水员。",
    "AEI":"音乐指挥、舞台指导、电影导演。",
    "AES":"流行歌手、舞蹈演员、电影导演、广播节目主持人、舞蹈教师、口技表演者、喜剧演员、模特。",
    "AIS":"画家、剧作家、编辑、评论家、时装艺术大师、新闻摄影师、男演员、文学作者。",
    "AIE":"花匠、皮衣设计师、工业产品设计师、剪影艺术家、复制雕刻品大师。",
    "AIR":"建筑师、画家、摄影师、绘图员、环境美化工、雕刻家、包装设计师、陶器设计师、绣花工、漫画工。",
    "SEC":"社会活动家、退伍军人服务官员、工商会事务代表、教育咨询者、宿舍管理员、旅馆经理、饮食服务管理员。",
    "SER":"体育教练、游泳指导。",
    "SEI":"大学校长、学院院长、医院行政管理员、历史学家、家政经济学家、职业学校教师、资料员。",
    "SEA":"娱乐活动管理员、国外服务办事员、社会服务助理、一般咨询者、宗教教育工作者。",
    "SCE":"部长助理、福利机构职员、生产协调人、环境卫生管理人员、戏院经理、餐馆经理、售票员。",
    "SRI":"外科医师助手、医院服务员。",
    "SRE":"体育教师、职业病治疗者、体育教练、专业运动员、房管员、儿童家庭教师、警察、引座员、传达员、保姆。",
    "SRC":"护理员、护理助理、医院勤杂工、理发师、学校儿童服务人员。",
    "SIA":"社会学家、心理咨询者、学校心理学家、政治科学家、大学或学院的系主任、大学或学院的教育学教师、大学农业教师、大学工程和建筑课程的教师、大学法律教师、大学数学、医学、物理、社会科学和生命科学的教师、研究生助教、成人教育教师。",
    "SIE":"营养学家、饮食学家、海关检查员、安全检查员、税务稽查员、校长。",
    "SIC":"描图员、兽医助手、诊所助理、体检检查员、监督缓刑犯的工作者、娱乐指导者、咨询人员、社会科学教师。",
    "SIR":"理疗员、救护队工作人员、手足病医生、职业病治疗助手。",
}
    




// 介绍
const Introduce = () => (<Text
    style={{margin:10}}
>
        霍兰德职业适应性测验(The Self-Directed Search，简称SDS)由美国著名职业指导专家 Ｊ.霍兰德（ＨＯＬＬＡＮＤ）编制。在几十年间经过一百多次大规模的实验研究，形成了人格类型与职业类型的学说和测验。 该测验能帮助被试者发现和确定自己的职业兴趣和能力专长, 从而科学地做出求职择业。霍兰德认为，个人职业兴趣特性与职业之间应有一种内在的对应关系。根据兴趣的不同，人格可分为研究型（I）、艺术型（A）、社会型（S）、企业型（E）、传统型（C）、现实型（R）六个维度，每个人的性格都是这六个维度的不同程度组合。
    </Text>)


// 测试题目
class Question extends Component {
    constructor() {
        super();
        this.state = {
            questions: questions,
            no: 1,
            nums: questions.length,
            myResults: {}
        }
    }

    handleAnswer=(answer)=> {
        let no = this.state.no,
            question = this.state.questions[this.state.no - 1],
            myResults = this.state.myResults;
        if (no >= this.state.nums) {
            // 问题回答结束
            this.props.finishQuestion(myResults);
            this.setState({
                no: 1
            })
        } else {
            if (!myResults[question.cateKey]) {
                myResults[question.cateKey] = 0
            }
            myResults[question.cateKey] += answer === question.score ? 1 : 0
            this.setState({
                no: ++no,
                myResults: myResults
            })
        }
    }

    render() {
        return (
            <Container style={{margin:10}}>
                <Text style={{margin:10,fontSize:15 ,fontWeight:"bold"}}>{this.state.no} / {this.state.nums}</Text>
                <Text style={{margin:10 ,fontSize:15}}>{this.state.questions[this.state.no - 1].title}</Text>
                <Item style={{alignItems:'center',justifyContent:"center"}}>
                    <Button
                        style={{margin:10}}
                        onPress={this.handleAnswer.bind(this, 1)}
                    ><Text>是的</Text></Button>
                    <Button
                        style={{margin:10}}
                        onPress={this.handleAnswer.bind(this, 0)}
                    ><Text>不是</Text></Button>
                </Item>
            </Container>
        )
    }
}

// 测试结果
class Result extends Component {
    constructor() {
        super()
        this.state = {
            rs: '待测试',
            type: '还没有分析',
            info: ''
        }
    }

    componentWillReceiveProps(props) {
        // 画图
        if (props.results) {
            this.resultAnalysis(props.results)
        }
    }
    // 测试结果分析
    resultAnalysis=(results)=>{
        let tempTypes = tabFormateRs.map(single => {
            single.score = results[single.cateKey] || single.score
            return single
        });
        let rsData = tempTypes.concat();
        // 查询前三的结果
        rsData.sort((x, y) => {
            if (x.score > y.score) {
                return -1
            } else if (x.score < y.score) {
                return 1;
            } else {
                return 0;
            }
        })
        rs = rsData[0].cateKey + rsData[1].cateKey + rsData[2].cateKey
        type = rsData[0].type
        info = rsData[0].info

        return {rs,type,info}

    }

    permute=(input)=> {
        const permArr = [],
        usedChars = [];
        function main(input){
          for (let i = 0; i < input.length; i++) {
            let ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
              permArr.push(usedChars.slice());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
          }
          return permArr
        }
        return main(input);
      };

     

    render() {
        let newrs
        if(this.props.results){
           let obj = this.resultAnalysis(this.props.results)
           const arr = obj.rs.split('')
           for (let res of this.permute(arr)) {
            if(majors.hasOwnProperty(res.join(''))){
                newrs = res.join('')
                break
            }
           }

           const rs = obj.rs
           const type = obj.type
           const info = obj.info
        }else{
            const rs = "待测试"
            const type = "还没有分析"
            const info = ""
        }

        
        return (
            <Container>
                <Text style={{textAlign:"center",margin:10}}>结果解读</Text>
                <Text style={{margin:10}}>你的主要职业类型：<Text style={{fontWeight:"bold"}}>{type}</Text></Text>
                <Text style={{margin:10}}>主要职业类型解析：{info}</Text>
                {newrs && <Text  style={{margin:10}}>您的霍兰德类型是:<Text style={{fontWeight:"bold"}}>{rs}</Text></Text>}
                {newrs && <Text  style={{margin:10}}>相关职业：</Text>}
                {newrs && <Text  style={{margin:10}}>{majors[newrs]}</Text>}
            </Container>
        )
    }
}

export default class MkTest extends Component {
    constructor() {
        super()
        this.state = {
            isStarted: false,
            isFinished: false
        }
    }

    startTest=()=> {
        this.setState({
            isStarted: true
        });
    }

    finishQuestion=(results)=> {
        this.setState({
            isFinished: true,
            results: results
        });
    }

    render() {
        return (
            <Container >
                <Header style={{ marginTop: statusBarHeight }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >霍兰德职业兴趣测试</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    {!this.state.isStarted && <Introduce />}
                    {!this.state.isStarted &&
                        
                        <Button
                            full
                            style={styles.button}
                            onPress={this.startTest}
                        >
                            <Text>开始测试</Text>
                        </Button>}
                    {(this.state.isStarted && !this.state.isFinished) &&
                        <Question finishQuestion={this.finishQuestion} />
                    }
                    {this.state.isFinished && <Result results={this.state.results} />}
                </View>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
    },
    button:{
        margin:15,
    }
})
