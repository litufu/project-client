import React from 'react'
import { StyleSheet, View, TextInput, Alert } from 'react-native'
import { Container, Header, Title, Content, List, ListItem, Button, Left, Right, Body, Icon, Text, Form, Item, CheckBox,Spinner } from 'native-base';
import { Query, Mutation,ApolloConsumer } from 'react-apollo'

import GET_SEARCHNEWMAJOR from '../../graphql/get_searchNewMajor.query'
import GET_ME from '../../graphql/get_me.query'
import GET_SEARCHNEWUNIVERSITY from '../../graphql/get_searchNewUniversity.query'
import GET_REGSTATUSAPPLICANTS from '../../graphql/get_regStatusApplicants.query'
import ADD_REGSTATUS from '../../graphql/add_regStatus.mutation'
import ApplicationCard from  './ApplicationCard'
import {subjects} from './settings'
import { errorMessage } from '../../utils/tools';
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'

export default class UniversityAndMajor extends React.Component {

    state = {
        checkUndergraduate: true,
        displayApplicationCard:false,
        majorName:"",
        universityName:"",
        lowwestScore:"0",
        proLowwestScore:"0",
        personNum:'0',
        loading:false,
    }

    _selectUniversity=()=>{
        const education = this.state.checkUndergraduate ? "Undergraduate" : "JuniorCollege"
        this.props.navigation.navigate('SelectUniversity', { education })
    }

    _selectMajor = () => {
        const education = this.state.checkUndergraduate ? "Undergraduate" : "JuniorCollege"
        this.props.navigation.navigate('SearchMajor', { education })
    }

    _renderMajor = () => (
        <Query
            query={GET_SEARCHNEWMAJOR}
        >
            {({ data }) => {
                if ( data.searchNewMajor.id === "") {
                    return (
                        <Text style={styles.bigText}>请选择</Text>
                    )

                }
                return (
                    <Text style={styles.bigText}>{data.searchNewMajor.name}</Text>
                )
            }}
        </Query>
    )

    _renderUniversity = () => (
        <Query
            query={GET_SEARCHNEWUNIVERSITY}
        >
            {({ data }) => {
                if ( data.searchNewUniversity.id === "") {
                    return (
                        <Text style={styles.bigText}>请选择</Text>
                    )

                }
                return (
                    <Text style={styles.bigText}>{data.searchNewUniversity.name}</Text>
                )
            }}
        </Query>
    )

    _onRegStatusApplicantsFetched=(applicants,majorName,universityName)=>{
        const personNum = applicants.length
        let lowwestScore
        let proLowwestScore
        if(personNum===0){
            lowwestScore = 0
            proLowwestScore = 0
        }else{
            lowwestScore = applicants.sort((a,b)=>a.exam.culscore-b.exam.culscore)[0].exam.culscore
            proLowwestScore = applicants.sort((a,b)=>a.exam.proscore-b.exam.proscore)[0].exam.proscore
        }
        

        this.setState({
            displayApplicationCard:true,
            majorName,
            universityName,
            lowwestScore,
            proLowwestScore,
            personNum
        })


        
    }

    _renderSearch=()=>{
        return <ApolloConsumer>
            {client => (
                <Button
                block
                onPress={
                    async () => {
                        this.setState({loading:true})
                        const education = this.state.checkUndergraduate ? "Undergraduate" :"JuniorCollege"
                        try{
                            const result1 = await client.query({query:GET_SEARCHNEWMAJOR})
                            const major = result1.data.searchNewMajor
                            if(!major.id){
                                Alert.alert('没有选择专业')
                                return
                            }

                            const result2 = await client.query({query:GET_SEARCHNEWUNIVERSITY})
                            const university = result2.data.searchNewUniversity
                            if(!university.id){
                                Alert.alert('没有选择学校')
                                return
                            }
                            const { data } = await client.query({
                            query: GET_REGSTATUSAPPLICANTS,
                            variables: { education,universityId:university.id,majorId:major.id },
                            fetchPolicy:'network-only',
                            });
                            this._onRegStatusApplicantsFetched(data.getRegStatusApplicants,major.name,university.name);
                        }catch(error){
                            Alert.alert(errorMessage(error))
                        }
                        this.setState({loading:false})
                    }
                }
            >
                <Text style={styles.bigText}>搜索</Text>
                {this.state.loading && <Spinner />}
            </Button>
            )}
      </ApolloConsumer>
    }

    _hanleReg = async (addRegStatus,education,client)=>{
        const {data:{me}} = await client.query({query:GET_ME})
        if(me.regStatus && me.regStatus.id){
            Alert.alert('只能进行一次报名，如需重新报名，请先退出当前报名')
            return 
        }
        const result1 = await client.query({query:GET_SEARCHNEWMAJOR})
        const major = result1.data.searchNewMajor
        const result2 = await client.query({query:GET_SEARCHNEWUNIVERSITY})
        const university = result2.data.searchNewUniversity
        
        await addRegStatus({
            variables:{education,majorId:major.id,universityId:university.id},
            update: (cache, { data }) => {
                const data1 = cache.readQuery({ query: GET_ME });
                cache.writeQuery({
                    query: GET_ME,
                    data: {me:{...data1.me,regStatus:data.addRegStatus}}
                });
            }
        })
        this.props.navigation.navigate('QueryResult')
    }

    render() {
        const { checkUndergraduate,personNum,proLowwestScore,lowwestScore,universityName,majorName,displayApplicationCard } = this.state
        const education = checkUndergraduate ? "本科" :"专科"
        const educationEn = checkUndergraduate ? "Undergraduate" : "JuniorCollege"
        const data=this.props.navigation.getParam('data', '')
        const subjectName = subjects[data.getExamBasicInfo.subject]
        const provinceName = data.getExamBasicInfo.province.name
        return (
            <Container>
                <Header style={{marginTop:statusBarHeight}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name='arrow-back'  />
                        </Button>
                    </Left>
                    <Body>
                        <Title >选择学校和专业</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Form>
                        <Item style={styles.item}>
                            <CheckBox
                                onPress={() => { this.setState({ checkUndergraduate: true }) }}
                                checked={checkUndergraduate}
                            />
                            <Body>
                                <Text style={styles.bigText}>本科</Text>
                            </Body>
                            <CheckBox
                                onPress={() => { this.setState({ checkUndergraduate: false }) }}
                                checked={!checkUndergraduate}
                            />
                            <Body>
                                <Text style={styles.bigText}>专科</Text>
                            </Body>
                        </Item>
                        <List>
                            <ListItem 
                                onPress={this._selectUniversity}
                            >
                                <Left style={styles.left}>
                                    <Text style={styles.bigText}>学校</Text>
                                </Left>
                                <Right style={styles.right}>
                                    {this._renderUniversity()}
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem
                                onPress={() => this._selectMajor()}
                            >
                                <Left style={styles.left}>
                                    <Text style={styles.bigText}>专业</Text>
                                </Left>
                                <Right style={styles.right}>
                                    {this._renderMajor()}
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>

                        <View style={styles.btnContainer}>
                            {this._renderSearch()}
                        </View>
                    </Form>
                
                { 
                    displayApplicationCard &&  
                    (
                    <Mutation mutation={ADD_REGSTATUS}>
                        {
                            (addRegStatus,{loading,error,data,client})=>{
                                if(loading) return <Spinner />
                                if(error) return <Text>{errorMessage(error)}</Text>
                                return (
                                    <ApplicationCard 
                                        education={education}
                                        subjectName={subjectName}
                                        universityName={universityName}
                                        majorName={majorName}
                                        provinceName={provinceName}
                                        personNum={personNum}
                                        lowwestScore={lowwestScore}
                                        proLowwestScore={proLowwestScore}
                                        handlePress={()=>this._hanleReg(addRegStatus,educationEn,client)}
                                    />
                                )
                            }
                        }
                    </Mutation>
                     )
                }
                </Content>
            </Container>
        )
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
        fontSize: 17
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        padding: 10,
        paddingHorizontal: 30,

    },
    left: {
        flex: 0.4
    },
    right: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    bigText: {
        fontSize: 17
    }

})