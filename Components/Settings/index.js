import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon ,Button,Body,Title} from 'native-base';
import { SecureStore } from 'expo'
import { withApollo,Mutation } from 'react-apollo';

import {wsClient} from '../../apollo'
import LOGOUT from '../../graphql/logout.mutation'
import {errorMessage} from '../../utils/tools'

class Settings extends Component {

    _logout=async (logout)=>{
        await logout()
        this.props.navigation.navigate('Login')
        wsClient.unsubscribeAll(); // unsubscribe from all subscriptions
        SecureStore.deleteItemAsync('token')
        this.props.client.resetStore()
        // 此处应添加持久化数据
        wsClient.close()
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button 
                        onPress={()=>this.props.navigation.goBack()}
                        transparent
                        >
                            <Icon name='md-arrow-back' type='Ionicons' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>其他设置</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem 
                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                        >
                            <Left>
                                <Text>修改密码</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                         onPress={() => this.props.navigation.navigate('FindPassword')}
                        >
                            <Left>
                                <Text>找回密码</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                        onPress={() => this.props.navigation.navigate('Help')}
                        >
                            <Left>
                                <Text>帮助与反馈</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <Mutation mutation={LOGOUT}>
                        {
                            (logout,{loading,error})=>{
                                if(loading) return (
                                    <ListItem>
                                        <Text>正在退出</Text>
                                    </ListItem>
                                )
                                return(
                                    <ListItem
                                    onPress={async ()=> await this._logout(logout)}
                                    >
                                        <Left>
                                            <Text>退出账号</Text>
                                        </Left>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                        {error && Alert.alert(errorMessage(error))}
                                    </ListItem>
                                )
                            }
                        }
                        </Mutation>
                       
                    </List>
                </Content>
            </Container>
        );
    }
}


export default withApollo(Settings)

