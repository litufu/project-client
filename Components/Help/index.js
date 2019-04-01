import React, { Component } from 'react';
import {Alert} from 'react-native'
import  {Query} from 'react-apollo'
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
     ListItem, 
     List,
     Spinner,
} from 'native-base';

import {errorMessage} from '../../utils/tools'
import GET_ME from '../../graphql/get_me.query'
import GET_KEFU from '../../graphql/get_kefu.query'

export default class Help extends Component {
    render(){
        return(
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
                    <Title>帮助与反馈</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <List>
                    <ListItem>
                        <Left>
                            <Text>客服邮箱:</Text>
                        </Left>
                        <Text>kefu@gewu.org.cn</Text>
                    </ListItem>
                    <Query query={GET_ME}>
                    {
                        ({loading,error,data})=>{
                            if(loading) return <Spinner/>
                            if(error) return <Text>{errorMessage(error)}</Text>
                            const me = data.me
                            return(
                                <Query query={GET_KEFU}>
                                {
                                    ({loading,error,data})=>{
                                        if(loading) return <Spinner/>
                                        if(error) return <Text>{errorMessage(error)}</Text>
                                        const kefu = data.kefu
                                        return(
                                            <ListItem
                                                onPress={()=>{
                                                    if(kefu){
                                                        this.props.navigation.navigate('Chat',{user:kefu,me})
                                                    }else{
                                                        Alert.alert('客服不在线')
                                                    }
                                                }}
                                            >
                                                <Text>在线客服</Text>
                                            </ListItem>
                                        )
                                    }
                                }
                                    </Query>
                            )
                        }
                    }
                    </Query>
                </List>
                </Content>
                </Container>
        )
    }
}