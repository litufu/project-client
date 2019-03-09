import React from 'react'
import { StyleSheet, View,  TextInput, Alert } from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Input,
    Label,
    Button,
    Left,
    Right,
    Body,
    Icon,
    List,
    ListItem,
    Text,
    Form,
    Item,
    Picker,
    CheckBox,
    Spinner,
    Footer
} from 'native-base';
import { Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import ADD_EXAMBASICINFO from '../../graphql/add_examBasicInfo.mutation'
import UPDATE_EXAMBASICINFO from '../../graphql/update_examBasicInfo.mutation'
import { errorMessage } from '../../utils/tools'
import {sections,noSectionProvinces} from './settings'
import GET_EXAMBASICINFO from '../../graphql/get_exam_basicInfo.query'
import GET_ME from '../../graphql/get_me.query'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor,provinces} from '../../utils/settings'

class ExamBasicInfo extends React.Component {

    state = {
        province: this.props.province || 11,
        section: this.props.section || "arts",
        hasSpecial: this.props.hasSpecial || false,
        score: this.props.score || '0',
        specialScore: this.props.specialScore || '0',
        examineeCardNumber: this.props.examineeCardNumber || '',
        updateInfo: this.props.updateInfo || false,
        editable: this.props.updateInfo ? false : true,
        times:this.props.times || 0
    }

    _checkExamineeCardNumber=(examineeCardNumber)=>{
        /**
         * 　　考生除了在省内有10位准考证号外，还有全国统一的14位考生号，有时在某些高校网站查询录取信息时，要求输入14位考号，其构成是：
            　　1、第·1、2位为年度代码：如2010年填写“10”;
            　　2、第3、4位为省市代码：陕西省代码为“61”;
            　　3、第5、6、7、8位为县、市、区代码：
            　　4、第9位为考试类别代码：普通高考代码为“1”。
            　　5、第·10位为科类代码：文史类—1、外语类—2、艺术类(文)—3、理工类—5、艺术类(理)—7、体育类(理)—8。
            　　6、第·11、12、13、14位为考生顺序号。
         */
        const regex = /^\d{14}$/
        if(!regex.test(examineeCardNumber)){
            console.log('准考证号长度错误')
            return false
        }
        // 检查前2位
        const year = new Date().getFullYear().toString()
        const firstTwo = year.slice(2,4)
        const actualFirstTwo = examineeCardNumber.slice(0,2)
       
        if(firstTwo!==actualFirstTwo){
            console.log('前两位错误')
            return false
        }
        // 检查3-4位

        const secondTwo = this.state.province.toString()
        const actualSecondTwo = examineeCardNumber.slice(2,4)
  
        if(secondTwo!==actualSecondTwo){
            console.log('34位错误')
           return false     
        }
        // 检查5-8位
        const data=this.props.data
        if(data) {
            const highschoolAreaCode = data.me.studies.filter(study=>study.school.kind==="HighSchool").sort((a,b)=>new Date(b.startTime) - new Date(a.startTime))[0].school.location.area.code
            if(actualSecondTwo===highschoolAreaCode.slice(0,2)){
                if(examineeCardNumber.slice(4,8) !== highschoolAreaCode.slice(2,6)){
                    console.log('58位错误')
                    return false
                }
            }
            return true
        }
        

    }

    _checkScore=(score)=>{
        const pattern = /^[0-9]+(.[0-9]{1,2})?$/
        if(pattern.test(score.toString())){
            return true
        }
        return false
    }

    _confirm = (addExamBasicInfo) => {
        const { province, section, score, specialScore, examineeCardNumber } = this.state

        if (~noSectionProvinces.indexOf(province) && section!=="none") {
            Alert.alert('请检查你的文理科是否选择正确')
            return
        }

        if(!this._checkExamineeCardNumber(examineeCardNumber)){
            Alert.alert('请检查你输入的准考证号是否正确')
            return
        }

        if(!this._checkScore(score)){
            Alert.alert('请检查你输入的文化课分数是否正确')
            return
        }

        if(!this._checkScore(specialScore)){
            Alert.alert('请检查你输入的专业课分数是否正确')
            return
        }




        
        addExamBasicInfo({
            variables: { province: province.toString(), section, score, specialScore, examineeCardNumber },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: GET_EXAMBASICINFO,
                    data: { getExamBasicInfo: data.addExamBasicInfo }
                });
            }
        })

        this.setState({updateInfo:true,editable:false})
    }

    _update = (updateExamBasicInfo)=>{
        const { province, section, score, specialScore, examineeCardNumber } = this.state
        // 杭州和上海不分文理科
        if (~noSectionProvinces.indexOf(province) && section!=="none") {
            Alert.alert('请检查你的文理科是否选择正确')
            return
        }

        if(!this._checkExamineeCardNumber(examineeCardNumber)){
            Alert.alert('请检查你输入的准考证号是否正确')
            return
        }

        if(!this._checkScore(score)){
            Alert.alert('请检查你输入的文化课分数是否正确')
            return
        }

        if(!this._checkScore(specialScore)){
            Alert.alert('请检查你输入的专业课分数是否正确')
            return
        }

        updateExamBasicInfo({
            variables: { province: province.toString(), section, score, specialScore, examineeCardNumber },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: GET_EXAMBASICINFO,
                    data: { getExamBasicInfo: data.updateExamBasicInfo }
                });
            }
        })

        this.setState({editable:false})
    }


    render() {
        const { province, section, score, specialScore, examineeCardNumber, hasSpecial, updateInfo, editable,times } = this.state
        return (
            <Container >
                <Header style={{marginTop:statusBarHeight}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>高考基本信息</Title>
                    </Body>
                    <Right />
                </Header>
                <Content >
                    <Form>
                        <Item
                            style={styles.item}
                        >
                            <Left>
                                <Text style={styles.bigText}>参加高考的省份:</Text>
                            </Left>
                            <Right>
                                {
                                    editable
                                        ? (
                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: 200 }}
                                                selectedValue={province}
                                                onValueChange={(value) => this.setState({ province: value })}
                                            >
                                                {provinces.map(province => <Picker.Item key={province.id} label={province.name} value={province.id} />)}
                                            </Picker>
                                        )
                                        : (
                                            <Text style={styles.bigText}>{provinces.filter(pro => pro.id === province)[0].name}</Text>
                                        )

                                }

                            </Right>
                        </Item>

                        <Item
                            style={styles.item}
                        >
                            <Left><Text style={styles.bigText}>准考证号</Text></Left>
                            <Right>
                                {
                                    editable
                                        ? (
                                            <TextInput
                                                style={styles.input}
                                                keyboardType='numeric'
                                                placeholder="请输入14位考生号"
                                                onChangeText={(value) => this.setState({ examineeCardNumber: value })}
                                                value={examineeCardNumber}
                                            />
                                        )
                                        : (
                                            <Text style={styles.bigText}>{examineeCardNumber}</Text>
                                        )
                                }

                            </Right>
                        </Item>
                        
                        <Item
                            style={styles.item}
                        >
                            <Left>
                                <Text style={styles.bigText}>文理科:</Text>
                            </Left>
                            <Right>
                                {
                                    editable
                                        ? (
                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: 150 }}
                                                selectedValue={section}
                                                onValueChange={(value) => this.setState({ section: value })}
                                            >
                                            {sections.map(section => <Picker.Item key={section.key} label={section.value} value={section.key} />)}
                                            </Picker>
                                        )
                                        : (
                                            <Text style={styles.bigText}>{sections.filter(sec => sec.key === section)[0].value}</Text>
                                        )
                                }

                            </Right>
                        </Item>
                        


                        <Item
                            style={styles.item}
                        >
                            <Left><Text style={styles.bigText}>文化课分数</Text></Left>
                            <Right>
                                {
                                    editable
                                        ? (
                                            <TextInput
                                                style={styles.input}
                                                keyboardType='numeric'
                                                placeholder="请输入文化课总成绩"
                                                onChangeText={(value) => { this.setState({ score: value }) }}
                                                value={score}
                                            />
                                        )
                                        : (
                                            <Text style={styles.bigText}>{score}</Text>
                                        )
                                }

                            </Right>
                        </Item>
                        {
                            editable && (
                                <Item
                                    style={styles.item}
                                >
                                    <CheckBox
                                        checked={this.state.hasSpecial}
                                        onPress={() => this.setState({ hasSpecial: !hasSpecial })}
                                    />
                                    <Body>
                                        <Text style={styles.bigText}>参加美术、体育等专业课考试</Text>
                                    </Body>
                                </Item>
                            )
                        }

                        {
                            hasSpecial && (
                                <Item
                                    style={styles.item}
                                >
                                    <Left><Text style={styles.bigText}>专业课分数</Text></Left>
                                    <Right>
                                        {
                                            editable
                                                ? (
                                                    <TextInput
                                                        style={styles.input}
                                                        keyboardType='numeric'
                                                        placeholder="请输入专业课总成绩"
                                                        onChangeText={(value) => { this.setState({ specialScore: value }) }}
                                                        value={specialScore}
                                                    />
                                                )
                                                : (
                                                    <Text style={styles.bigText}>{specialScore}</Text>
                                                )
                                        }

                                    </Right>
                                </Item>
                            )
                        }
                        {
                            updateInfo
                                ? (
                                    times<3 && (<View style={styles.btnContainer}>

                                       {!editable && <Button
                                            block
                                            style={{flex:1}}
                                            onPress={()=>this.setState({editable:true})}
                                        >
                                        <Text style={styles.bigText}>修改</Text>
                                        </Button>}

                                        {editable && <Mutation 
                                        mutation={UPDATE_EXAMBASICINFO}
                                        onError={()=>Alert.alert(errorMessage(error))}
                                        onCompleted={()=>Alert.alert('修改完成')}
                                        >
                                            {(updateExamBasicInfo, { data, loading, error }) => (
                                                <Button
                                                style={{flex:1}}
                                                    onPress={() => { this._update(updateExamBasicInfo) }}
                                                    block
                                                >
                                                    <Text style={styles.bigText}>确定</Text>
                                                    {loading && <Spinner />}
                                                </Button>
                                            )}
                                        </Mutation>}
                                    </View>)
                                )
                                : (
                                    <Mutation 
                                    mutation={ADD_EXAMBASICINFO}
                                    onCompleted={()=>Alert.alert('保存完成')}
                                    onError={()=>Alert.alert(errorMessage(error))}
                                    >
                                        {(addExamBasicInfo, { data, loading, error }) => (
                                            <View style={{flex:1,marginHorizontal:30,padding:10}}>
                                            <Button
                                                onPress={() => { this._confirm(addExamBasicInfo) }}
                                                block
                                            >
                                                <Text style={styles.bigText}>确定</Text>
                                                {loading && <Spinner />}
                                            </Button>
                                            </View>
                                        )}
                                    </Mutation>
                                )
                        }
                    </Form>
                </Content>
                <Footer style={{alignItems:"flex-start",backgroundColor:"white"}}>
                    <Text style={styles.bigText}>提示:高考基本信息仅有二次修改机会</Text>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'blue'

    },
    item: {
        height: 50,
        padding: 10,
    },
    input: {
        textAlign: 'right',
        fontSize:17
    },
    btnContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        paddingHorizontal:30,

    },
    bigText:{
        fontSize:17
    }

})

export default withNavigation(ExamBasicInfo)