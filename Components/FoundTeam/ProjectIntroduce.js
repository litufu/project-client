import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native'
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    ListItem,
    Content,
    Text,
    Container,
    Icon,
    Title,
    Thumbnail,
} from 'native-base';
import { defaultAvatar } from '../../utils/settings';


export default class ProjectIntroduce extends Component {

    render() {
        const mypartnerCondition = this.props.navigation.getParam('mypartnerCondition')
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
                        <Title>{mypartnerCondition.project.name}</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <Content>
                    <ListItem>
                        <Left>
                            <Text>项目名称:</Text>
                        </Left>
                        <Text>{mypartnerCondition.project.name}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>项目发起者：</Text>
                    </ListItem>
                    <ListItem
                        onPress={() => this.props.navigation.navigate('UserProfile', { id: mypartnerCondition.project.starter.id })}
                        thumbnail >
                        <Left>
                            <Thumbnail source={{ uri: mypartnerCondition.project.starter.avatar ? mypartnerCondition.project.starter.avatar.url : defaultAvatar }} />
                        </Left>
                        <Body>
                            <Text>{`${mypartnerCondition.project.starter.name}`}</Text>
                        </Body>
                        <Right>
                            <Text style={{ color: 'blue' }}>查看</Text>
                        </Right>
                    </ListItem>
                   
                    <ListItem>
                        <Text>项目简介：</Text>
                    </ListItem>
                    <ListItem>
                        <Text>{mypartnerCondition.project.content}</Text>
                    </ListItem>
                </Content>
            </Container>
        )
    }

}

