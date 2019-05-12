import React from 'react'
import { StyleSheet, View ,Alert} from 'react-native'
import { Container, Header, Title, Content, Footer, Spinner, Button, Left, Right, Body, Icon, Text, List, ListItem,Item } from 'native-base';
import { errorMessage } from '../../utils/tools';

import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'


export default class Guide extends React.Component {

   
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
                        <Title >高考志愿填报指引</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{flex:0.5}}>
                    <List>
                        <ListItem
                            onPress={()=>this.props.navigation.navigate('FillForm')}>
                            <Left>
                                <Text >如何填报高考志愿</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                     
                        <ListItem
                            onPress={()=>this.props.navigation.navigate('MajorTest')}>
                            <Left>
                                <Text >霍兰德职业兴趣测试</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                       
                        <ListItem 
                            onPress={()=>this.props.navigation.navigate('MajorPay')}
                        >
                            <Left>
                                <Text>专业报酬排名</Text>
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

