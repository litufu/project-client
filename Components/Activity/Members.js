import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { defaultAvatar } from '../../utils/settings';

export default class Members extends Component {

    render() {
        const activity = this.props.navigation.getParam('activity');
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
                        <Title>{activity.title}</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <Content>
                    <List>
                    <ListItem
                        thumbnail
                        onPress={() => this.props.navigation.navigate('UserProfile', { id: activity.creater.id })}
                    >
                        <Left>
                            <TouchableWithoutFeedback
                            >
                                <Thumbnail source={{ uri: activity.creater.avatar ? activity.creater.avatar.url : defaultAvatar }} />
                            </TouchableWithoutFeedback>

                        </Left>
                        <Body>
                            <Text>{`组织者:${activity.creater.name}`}</Text>
                            <Text note numberOfLines={1}>{activity.creater.username}</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                        {
                            activity.users.map(user => {
                                return (
                                    <ListItem
                                        thumbnail
                                        key={user.id}
                                        onPress={() => this.props.navigation.navigate('UserProfile', { id: user.id })}
                                    >
                                        <Left>
                                            <TouchableWithoutFeedback
                                            >
                                                <Thumbnail source={{ uri: user.avatar ? user.avatar.url : defaultAvatar }} />
                                            </TouchableWithoutFeedback>

                                        </Left>
                                        <Body>
                                            <Text>{user.name}</Text>
                                            <Text note numberOfLines={1}>{user.username}</Text>
                                        </Body>
                                        <Right>
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
            </Container>

        )
    }
}


