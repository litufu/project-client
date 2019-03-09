import React from 'react'
import { StyleSheet, View ,Alert} from 'react-native'
import { Container, Header, Title, Content, Footer, Spinner, Button, Left, Right, Body, Icon, Text, List, ListItem,Item } from 'native-base';
import {Query} from 'react-apollo'
import { errorMessage } from '../../utils/tools';
import GET_EXAMBASICINFO from '../../graphql/get_exam_basicInfo.query'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'


export default class CollegeEntranceExam extends React.Component {

    _handleBasicInfo=()=>{
        const data=this.props.navigation.getParam('data', '')
        this.props.navigation.navigate('QueryExamBasicInfo',{data})
    }

    _handleUniversityAndMajor=(data,loading)=>{
        if(loading) return
        if(data && data.getExamBasicInfo){
            this.props.navigation.navigate('UniversityAndMajor',{data})
        }else{
            Alert.alert('需要先填写高考基本信息')
            return
        }
    }

    _handleApplicationResult=()=>{
        const data=this.props.navigation.getParam('data', '')
        this.props.navigation.navigate('QueryResult')
    }

    render() {
        return (
            <Container style={{flex:1}}>
                <Header style={{marginTop:statusBarHeight}}>
                    <Left>
                        <Button 
                        transparent
                        onPress={()=>this.props.navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >高考报名</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{flex:0.5}}>
                    <List>
                     
                        <ListItem
                            onPress={this._handleBasicInfo}>
                            <Left>
                                <Text >高考基本信息</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                        <Query 
                        onError={(error)=>Alert.alert(errorMessage(error))}
                        query={GET_EXAMBASICINFO}
                        >
                            {
                                ({loading,data})=>{
                                    return (
                                        <ListItem
                                        onPress={()=>this._handleUniversityAndMajor(data,loading)}
                                            >
                                            <Left>
                                                <Text >选择学校和专业</Text>
                                            </Left>
                                            <Right>
                                                <Icon type="FontAwesome" name={loading ? "spinner":"arrow-right"} />
                                            </Right>
                                        </ListItem>
                                    )
                                }
                            }
                        </Query>
                        
                        <ListItem 
                            onPress={this._handleApplicationResult}
                        >
                            <Left>
                                <Text>报名结果</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                    </List>
                    
                </Content>
             </Container>
        )
    }
}

const styles=StyleSheet.create({
    text:{
        color:'blue'
    }
})

