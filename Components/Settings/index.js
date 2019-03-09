import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon ,Button,Body,Title} from 'native-base';
import { SecureStore } from 'expo'
import { withApollo } from 'react-apollo';
import {wsClient} from '../../apollo'

class Settings extends Component {

    _logout=()=>{
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
                        <Title>设置</Title>
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
                        <ListItem>
                            <Left>
                                <Text>帮助与反馈</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                        onPress={()=>this._logout()}
                        >
                            <Left>
                                <Text>退出账号</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}


export default withApollo(Settings)

