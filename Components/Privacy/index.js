import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { 
    Container,
     Header, 
     Content, 
     Icon, 
     Title, 
     Text, 
     Left, 
     Body, 
     Right, 
     Button, 
} from 'native-base';


export default class Privacy extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            transparent
                        >
                            <Icon name='md-arrow-back' type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>隐私政策</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
<Text style={styles.first}>《隐私政策》的版本及生效日期</Text>
<Text style={styles.normal}>  本《隐私政策》于2019年4月2日生效。</Text>

<Text style={styles.first}>欢迎您使用我们的产品和服务!</Text>
<Text style={styles.normal}>  请仔细阅读我们的《隐私政策》。</Text>

<Text style={styles.normal}>  "格物网络"或"我们"是指安阳格物网络科技有限公司，注册地位于中国安阳。我们的服务由我们和我们分布于全球的各分支机构、关联公司或合作伙伴共同为您提供。</Text>

<Text style={styles.normal}>  "您"是指使用我们的产品的注册用户以及收费服务的购买方。</Text>

<Text style={styles.normal}>  "我们的产品"，包括我们所提供的软件产品和这些软件产品的相关服务，我们所提供的软件产品为“「水滴」”。</Text>

<Text style={styles.first}>一、声明</Text>
<Text style={styles.normal}>  根据法律和监管政策变化，我们的《隐私政策》正在不断改进中，随着我们的产品和服务范围的扩大，我们可能随时更新《隐私政策》。请您经常查看以了解最新的《隐私政策》。</Text>

<Text style={styles.first}>二、条款适用的范围</Text>
<Text style={styles.normal}>  感谢您选择使用我们的产品和服务，您可以通过多种不同的方式使用我们的服务。我们希望通过《隐私政策》让您清楚的了解我们对信息的收集、使用方式，以及您可采用什么方式来保护自己的隐私权。当您使用我们的产品或服务时，您同意本政策适用于您。如果您不同意我们的《隐私政策》，请勿使用我们的产品和服务，如果您已经开始使用了我们的产品和服务，请您立即终止使用，您的使用行为即视为您的同意。</Text>

<Text style={styles.normal}>  我们的隐私权政策解释了以下几个方面的问题：</Text>

<Text style={styles.normal}>   （1）我们收集哪些信息，以及收集这些信息的原因；</Text>

<Text style={styles.normal}>   （2）我们对这些信息的使用方式；</Text>

<Text style={styles.normal}>   （3）我们为您提供的选择，包括如何访问、更新和控制信息；</Text>

<Text style={styles.normal}>   （4）您在隐私保护方面所承担的义务；</Text>

<Text style={styles.normal}>   （5）信息的安全性。</Text>

<Text style={styles.first}>三、个人信息收集目的与分类</Text>
<Text style={styles.normal}>  1. 为什么收集信息</Text>

<Text style={styles.normal}>  我们通过网站、软件和其他应用程序向您提供服务。我们收集您的信息的目的是为了实现合同目的（产品设计功能随着各个具体产品而有差异，您应当自行了解熟悉这些差异并根据自己的需求和情况进行隐私设置），改善您在使用我们的产品和服务过程中的体验，帮助您更便捷地使用我们的产品和服务，并更加快捷准确的获取您所需要的信息，在符合法律并尊重隐私的前提下，进行大数据应用的商业探索。</Text>

<Text style={styles.normal}>  2. 信息的分类</Text>

<Text style={styles.normal}>  按是否能辨识的您的个人身份，您使用我们的产品和服务时产生的信息可以分为以下两类：</Text>

<Text style={styles.normal}>   （1）可辨识的个人身份的信息：包括姓名、邮件地址或电话号码等能够用来直接辨认、追查、鉴别、确认您个人真实身份的信息。</Text>

<Text style={styles.normal}>   （2）不可辨识个人身份的信息：可能是您使用我们的产品和服务的使用记录等与您有关但无法直接辨认、追查、鉴别、确认个人真实身份的信息。</Text>

<Text style={styles.first}>四、我们收集哪些信息、如何收集信息</Text>
<Text style={styles.normal}>  1. 您提交的信息</Text>

<Text style={styles.normal}>   （1）您提交的注册信息以及按照行业惯常情况和产品需要收集的信息</Text>

<Text style={styles.normal}>  您注册格物网络旗下产品的「水滴」账户时，为识别用户身份并便于联系您应提供的信息。您了解并同意，在必要的情况下（例如：注销帐户等），我们可根据您的注册信息识别您的身份，以防止别人冒用您的身份进行操作，影响您对我们的产品和服务的正常使用。</Text>

<Text style={styles.normal}>   （2）您上传的数据信息</Text>

<Text style={styles.normal}>  您在使用我们的服务时上传的数据信息属他人个人信息并可能涉及他人隐私，您保证已获得许可拥有必要权利上传这些数据信息，并请您进行适当的设置以防止该信息泄漏损害权利人的利益，未经授权不得擅自公开相关信息。</Text>

<Text style={styles.normal}>  2. 您使用我们的服务时我们获取的信息</Text>

<Text style={styles.normal}>  为了向您提供更优质的服务，我们的产品根据产品本身的需求，为履行产品服务的合同目的而收集信息，例如「水滴」产品收集您的姓名、性别、年龄、身高、体重、技能、出生地、居住地、家庭成员、学习经历、工作经历等信息，以便进行大数据的人脉关系分析和匹配。我们亦按照互联网行业通常惯例记录并分析您对我们的服务的使用及使用方式等相关信息，这类信息包括：硬件型号和ID识别信息、操作系统版本、系统活动等设备信息，IP 地址、帐户登陆或登出、点击广告等日志信息，Web Beacon或Cookie信息，浏览器版本信息等。 您可以通过安全软件进行权限管理，我们的产品设置也尽可能在获得您的许可与用户体验之间寻求平衡，例如首次使用相关功能时提示要求您授权，但之后则不再频繁提示以免影响用户体验。但根据这些产品的功能设置，如果您不开放相应权限则无法使用产品的功能实现您的网络社交目的。收集您安装应用的信息目的在于了解分析我们产品可能与哪些产品一起被用户选用。操作系统等信息也是对您进行安全提示等确保产品安全之所需。</Text>

<Text style={styles.normal}>  您同意我们的上述收集的信息范围将可能随着法律和监管政策、技术和商业发展、用户反馈等因素而适当予以调整。</Text>

<Text style={styles.first}>五、个人信息的访问、查阅和更新</Text>
<Text style={styles.normal}>  您可以查看或修改您的个人信息，为确保安全，您仅在登陆后才能进行上述操作。如您的个人信息发生变更，请您及时登录帐户并进行更新。</Text>

<Text style={styles.first}>六、删除个人帐户</Text>
<Text style={styles.normal}>  您可以联系我们注销您的帐户。您的帐户注销后，我们无义务保留和提供您帐户下的信息。电子数据档案保存遵守相关国家规定。</Text>

<Text style={styles.first}>七、个人信息的设置</Text>
<Text style={styles.normal}>  您了解并同意，您公开的信息可能会被其他使用我们的服务的用户所浏览、转发以及评论。您可以自行通过对隐私设置的调整实现对重要信息的保护。</Text>

<Text style={styles.normal}>  为了预防他人滥用个人信息造成骚扰，我们建议您关注并尽快熟悉产品的功能设置，根据自己的需求进行个人信息、隐私相关的设置调整。默认设置是根据综合考虑行业惯例、大部分用户的通常需求和产品形态等因素进行的设置，可能适用于大部分用户但未必适用于您的个别需求。因此对您的信息完成隐私设置以防范风险是您的责任，否则，将被视为您接受了我们提供的默认设置。您理解并同意：鉴于我们提供的服务包含网络社交服务，为改善用户体验，我们的产品可能会将您的个人信息默认设置为公开，该默认设置可能会导致他人接触或获取您的个人信息；如您不希望展示某些个人信息，请勿填写相关信息。</Text>

<Text style={styles.first}>八、个人信息的使用</Text>
<Text style={styles.normal}>  一旦您使用我们的产品和服务，意味着您同意授权我们收集和处理您的信息，包括设备、软件的用户信息，个人信息，用户上传的内容信息。</Text>

<Text style={styles.normal}>  我们的产品可能包含用户信息的展示功能，为履行合同之目的，我们收集和使用您的信息来运行或改进我们的服务，运用技术帮助用户管理人脉资源，进行网络社交，拓展人脉。对于您公开的信息，您同意我们可以根据该信息进行大数据技术的关联和匹配等应用拓展。例如，为您提供用户信息服务，为您使用我们的产品和服务时能够避免多次重复输入相同信息，为您提供符合您个性的内容等。对您的信息进行使用，该使用结果可能不准确，请您在使用相关服务时谨慎独立判断，您同意我们对于使用结果的准确性不承担任何责任。</Text>

<Text style={styles.normal}>  如果我们要在本政策说明的情况之外使用您的信息，我们会事先征求您的同意。</Text>

<Text style={styles.normal}>  对于「水滴」用户，除已有其他约定外，提请您关注用户个人信息的使用目的、方式和范围，您认可其已完全了解：我们使用用户信息的目的在于：为用户提供家谱网络、同学群、同事群、老乡群、高考报名、相亲交友、创业合伙等各项服务；我们使用用户信息的方式包括但不限于：收集、统计、分析、数据挖掘，匹配，其他惯常商业用途的大数据使用等方式。</Text>

<Text style={styles.normal}>  格物网络使用用户信息的范围包括但不限于：用户个人信息、非用户个人信息、第三方平台记录信息、用户上传的信息等。</Text>

<Text style={styles.first}>九、大数据应用</Text>
<Text style={styles.normal}>  我们的社交产品以及其他服务可能跟随信息社会发展趋势进行大数据应用的商业探索，对于各类数据资源有可能在进行合法合规研究后进行数据挖掘、处理和匹配，我们理解用户关于个人信息保护和隐私保护的担心，也充分关注一旦被认定违规可能的严重法律风险，因此承诺这些尝试都将在合法合规分析后才进行。</Text>

<Text style={styles.first}>十、未经请求的通信或垃圾邮件</Text>
<Text style={styles.normal}>  如果您公开您的相关信息（例如联系信息等），则可能收到其他用户发送的未经请求的信息，例如电子邮件、短信等。</Text>

<Text style={styles.first}>十一、个人信息的共享</Text>
<Text style={styles.normal}>  除非《隐私政策》另有说明，否则未经您同意，我们不会在格物网络或关联公司、合作伙伴或解决方案供应商等相关公司之外共享您的个人信息，尤其不会将您的信息出售、出租或以其他方式分发（如果发现窃取、贩卖、擅自存储我们的公司的信息，请向我们举报并提供尽可能详细的线索以便我们调查处理）。我们的部分服务可能是与上述相关公司合作而为您提供的，因此，您同意我们将您的信息提供给该上述相关公司，从而为您提供相应的服务。该相关公司仅以提供相应的服务为目的使用您的信息，我们通过与上述相关公司签订保密协议或在合同中设置保密条款等方式确保这些信息的安全使用，在您使用相关服务过程中，该相关公司也将承担与我们同等的责任以保护您的信息安全。万一这些机构违反前述合同约定，除我们依照合同追究其违约责任外，您同意授权我们以公司自己的名义代您追究其侵犯您的“个人信息得到保护的权利”的法律责任。</Text>

<Text style={styles.first}>十二、个人身份信息的披露与公开</Text>
<Text style={styles.normal}>  我们尊重并保护您的隐私，承诺不会在本隐私政策说明之外将用户的个人身份信息披露给任何第三方机构或个人，但以下情况除外：</Text>

<Text style={styles.normal}>  1. 您同意公开您的个人信息，包括但不限于产品默认设置或者您自行调整的设置；</Text>

<Text style={styles.normal}>  2. 根据法律规定、政府部门或司法机关依法要求提供用户个人信息；</Text>

<Text style={styles.normal}>  3. 在紧急且必要的情况下，为保护格物网络或其他用户的合法权益，或为保护公共安全和公众利益之目的。</Text>

<Text style={styles.first}>十三、破产/被售/合并后的隐私保护</Text>
<Text style={styles.normal}>  如果我们出售公司资产、与另一经营实体合并或申请破产，我们在服务过程中收集的信息可能作为我们的资产而被转让，新的公司合并后可继续按法律规定和《隐私政策》约定继续使用这些信息。</Text>

<Text style={styles.normal}>  如果发生上述情形后您对于公司的信任发生改变，可以选择按照现有规则删除账户。</Text>

<Text style={styles.first}>十四、信息安全</Text>
<Text style={styles.normal}>  我们采取各种安全技术和手段来保护存储在系统上的信息及数据安全，使其免受未经授权的访问、使用或公开。</Text>

<Text style={styles.normal}>  我们会尽最大努力保护您的信息安全，但由于互联网安全环境的复杂性，我们无法就此事做出任何保证。您可以访问安全保护进一步了解我们的信息安全政策。</Text>

<Text style={styles.normal}>  公司按照《中华人民共和国网络安全法》之规定，履行网络信息安全义务。但也请您理解影响网络安全的因素很多，对于非公司原因造成的网络信息安全风险，公司仍应当及时进行技术补救或者采取防范措施，但不承担违约责任。</Text>

<Text style={styles.normal}>  一旦发生威胁严重程度高的信息安全事件或者风险，依照法律规定需要告知的，我们可能依法通过网站公告或者短信、电子邮件等方式告知您。也可能在报告主管部门的情况下，根据专业人士的建议或者主管部门的意见，确定是否公开告知，以避免由于用户对技术专业问题不了解而引起不必要的恐慌。</Text>

<Text style={styles.first}>十五、泄密行为的救济</Text>
<Text style={styles.normal}>  如果您发现您的个人信息已经或可能遭到泄露，请及时通知我们。我们会尽最大努力采取合理措施提供协助。如果我们发现任何可能的安全风险（例如系统漏洞），我们可能通过注册邮箱联络您，或在网站发布警示信息或公告。</Text>

<Text style={styles.first}>十六、针对未成年人的隐私条款</Text>
<Text style={styles.normal}>  我们十分重视未成年人隐私和数据的安全和保护。在我们未被明确告知的情况下，我们无法识别使用者是否确属未成年人。在我们已知用户是未成年人的情况下，我们不会使用未成年人的个人信息，也不会向任何第三方透露未成年人的可辨识的个人身份的信息，除非为了向未成年人提供必要且紧急的帮助，或者协助政府、司法机构。</Text>

<Text style={styles.first}>十七、针对不同国家用户</Text>
<Text style={styles.normal}>  格物网络依照法律制定《隐私政策》对隐私和个人信息进行保护。中国大陆的用户使用本服务的，适用中华人民共和国法律；中国大陆以外地区以及其他国家的用户使用本服务的，争议解决适用中华人民共和国香港特别行政区法律。</Text>

<Text style={styles.first}>十八、风险与免责</Text>
<Text style={styles.normal}>  若因下列事件导致您的个人信息和隐私泄露，我们将尽最大努力进行补救或为您提供协助，但您同意我们无需承担任何责任：</Text>

<Text style={styles.normal}>  1. 因病毒、木马、黑客攻击而导致的信息泄露；</Text>

<Text style={styles.normal}>  2. 根据法律规定或相关政府的要求提供您的个人信息；</Text>

<Text style={styles.normal}>  3. 由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人信息的泄漏；</Text>

<Text style={styles.normal}>  4. 任何其他非因格物网络的原因导致的个人信息泄漏。</Text>

<Text style={styles.first}>十九、隐私权条款的更改</Text>
<Text style={styles.normal}>  我们可根据业务发展变化和法律、政策变化对信息收集的范围、信息使用等进行适当的调整。</Text>

<Text style={styles.normal}>  如果《隐私政策》出于任何原因发生更改，我们将通知您或在网站发布公告，请您决定是否继续使用我们的产品和服务。如果您不同意更改后的《隐私政策》，请您立即注销帐户以终止使用我们的产品和服务。</Text>

<Text style={styles.first}>二十、个人信息的存储</Text>
<Text style={styles.normal}>  我们收集的信息可能由格物网络或其关联公司或服务提供商的服务器进行存储和处理，由于格物网络的产品在全球都有下载和使用，这些服务器根据服务的需要可能分布在中国或其他国家/地区。</Text>

<Text style={styles.normal}>  在中国大陆收集的个人信息遵守中国网络安全法关于关键信息基础设施个人信息和重要业务数据出境的相关规定。</Text>

<Text style={styles.normal}>  其他国家和地区我们也将努力遵守当地法律和监管要求。</Text>

<Text style={styles.first}>二十一、《隐私政策》的执行</Text>
<Text style={styles.normal}>  我们会定期检查《隐私政策》的执行情况。如果您对我们的《隐私政策》有任何疑问或建议，请联系我们。联系邮箱：kefu@gewu.org.cn，邮件主题：《隐私政策》的问题。</Text>
                   
                </Content>
                
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    first:{
        fontSize:15,
        fontWeight:"bold",
        marginVertical:5,
    },
    normal:{
        marginVertical:5,
    }
})