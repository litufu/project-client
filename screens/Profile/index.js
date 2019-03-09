import React, { Component } from 'react';
import { Query } from 'react-apollo'
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Thumbnail,
    Button,
    Title
} from 'native-base';
import { Divider } from 'react-native-elements'

import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'
import {defaultAvatar} from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query';

export default class ProfileScreen extends Component {

    render() {
        return (
            <Query
             query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        const me = data.me
                        if(!me) this.props.navigation.navigate('Login')
                        return (
                            <Container>
                                <Header style={{marginTop:statusBarHeight}}>
                                <Left />
                                    <Body style={{alignItems:'flex-end',justifyContent:"center",}}>
                                        <Title>设置</Title>
                                    </Body>
                                    <Right/>
                                </Header>
                                <Content>
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('UserProfile', { id: me.id, me })}
                                        thumbnail>
                                        <Left>
                                            <Thumbnail
                                                large
                                                square
                                                style={{marginVertical:10}}
                                                source={{ uri: (me.avatar && me.avatar.url) ? me.avatar.url : defaultAvatar }}
                                            />
                                        </Left>
                                        <Body>
                                            <Text>{me && me.name}</Text>
                                            <Text note numberOfLines={1}>{me.username}</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </ListItem>
                                    <Divider style={{ height: 15 }} />
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('BasicInfo')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#A4C8F0" }}>
                                                <Icon type="FontAwesome" name="info" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>我的信息</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('FamilyRelationship', { me })}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#FEA8A1" }}>
                                                <Icon type="FontAwesome" name="link" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>家庭成员</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('StudyHistroy')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#57DCE7" }}>
                                                <Icon type="FontAwesome" name="book" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>学习经历</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('Work')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#FAD291" }}>
                                                <Icon type="MaterialCommunityIcons" name="worker" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>工作经历</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <Divider style={{ height: 15 }} />
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('Product')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#A4C8F0" }}>
                                                <Icon type="MaterialIcons" name="attach-money" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>购买</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <ListItem
                                        onPress={() => this.props.navigation.navigate('Settings')}
                                        icon>
                                        <Left>
                                            <Button style={{ backgroundColor: "#C47EFF" }}>
                                                <Icon type="Ionicons" name="settings" />
                                            </Button>
                                        </Left>
                                        <Body>
                                            <Text>设置</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                </Content>
                            </Container>
                        )
                    }
                }
            </Query>

        );
    }
}